/* eslint-disable max-classes-per-file */

const VALID_EXT = [
  'pdf',
  'jpg',
  'doc',
  'docx',
  'ppt',
  'pptx',
  'pptm',
  'txt',
  'rtf',
  'xls',
  'xlt',
  'xltm',
  'xltx',
  'xlw',
  'xlsx',
  'xlsm',
  'xlsb',
  'xlst',
];

class Item {
  #name = '';

  #parent: Dir | null = null;

  #fav = false;

  constructor(name: string, fav = false) {
    this.name = name;
    this.fav = fav;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    if (this.parent && this.parent.hasItem(newName)) {
      throw new Error(
        `Item with name ${newName} already exists in this folder`
      );
    }

    if (!newName || typeof newName !== 'string' || !newName.trim().length) {
      throw new Error('Item name cannot be empty');
    }

    this.#name = newName.trim();
  }

  get parent() {
    return this.#parent;
  }

  set parent(newParent) {
    if (newParent !== this.#parent) {
      const prevParent = this.#parent;
      this.#parent = newParent;

      if (prevParent) {
        prevParent.removeItem(this.name);
      }

      if (newParent) {
        newParent.insertItem(this);
      }
    }
  }

  get fav() {
    return this.#fav;
  }

  set fav(newFav) {
    this.#fav = newFav;
  }

  get path(): string {
    if (this.parent) {
      return `${this.parent.path}/${this.name}`;
    }

    return this.name;
  }
}

class File extends Item {
  #ext = 'txt';

  constructor(name: string, ext: string, fav = false) {
    super(name, fav);
    this.ext = ext;
  }

  get ext() {
    return this.#ext;
  }

  set ext(newExt) {
    if (!VALID_EXT.includes(newExt)) {
      throw new Error(` ${newExt} is not a valid filetype`);
    }

    this.#ext = newExt;
  }

  get copy() {
    return new File(`${this.name} copy`, this.ext);
  }
}

class Dir extends Item {
  #children = new Map();

  get content() {
    return Array.from(this.#children.values());
  }

  get copy() {
    const dirCopy = new Dir(`${this.name} copy`);

    this.content.forEach((item) => {
      const itemCopy = item.copy;
      itemCopy.name = item.name;
      dirCopy.insertItem(itemCopy);
    });

    return dirCopy;
  }

  hasItem(itemName: string) {
    return this.#children.has(itemName);
  }

  insertItem(item: Item) {
    if (this.hasItem(item.name)) return true;

    if (item === this) throw new Error('Folder cannot contain itself');

    let { parent } = this;
    while (parent !== null) {
      if (parent === item) {
        throw new Error('Directory cannot contain one of its ancestors');
      }
      parent = parent.parent;
    }

    this.#children.set(item.name, item);
    item.parent = this;

    return this.hasItem(item.name);
  }

  getItem(itemName: string) {
    return this.#children.get(itemName);
  }

  removeItem(itemName: string) {
    const item = this.getItem(itemName);

    if (item) {
      this.#children.delete(itemName);
      item.parent = null;
    }
  }
}

type ItemInit = {
  name: string;
  fav: boolean;
  children?: ItemInit[];
  ext?: string;
};

type ItemData = {
  title: string;
  key: string;
  fav: boolean;
  ext?: string;
  children?: ItemData[];
};

type SortFn = (list: Item[]) => Item[];

export default class FileSystem {
  #self = new Dir('Home');

  #sortFn = (a: Item[]) => a;

  set sortFn(fn: (a: Item[]) => Item[]) {
    this.#sortFn = fn;
  }

  get root() {
    return this.#self;
  }

  get data() {
    return [this.#readDir(this.root)];
  }

  getItem(path: string): File | Dir {
    const p = path.split('/').splice(1);

    let item = this.root;

    p.forEach((name) => {
      item = item.getItem(name);
    });

    return item;
  }

  insertItem = (item: Item, parentPath: string) => {
    const dir = this.getItem(parentPath);
    if (dir instanceof Dir) {
      dir.insertItem(item);
    }
  };

  removeItem(path: string) {
    const item = this.getItem(path);
    if (item.parent) {
      item.parent.removeItem(item.name);
    }
  }

  moveItem(path: string, newParPath: string) {
    const item = this.getItem(path);
    const parent = this.getItem(newParPath);

    if (item.parent) {
      item.parent.removeItem(item.name);
      if (parent instanceof Dir) parent.insertItem(item);
    }
  }

  renameItem(path: string, newName: string) {
    const item = this.getItem(path);
    const { parent } = item;

    if (parent) {
      parent.removeItem(item.name);
      item.name = newName;
      parent.insertItem(item);
    }
  }

  createFile(name: string, ext: string, parentPath: string) {
    const file = new File(name, ext);

    this.insertItem(file, parentPath);
  }

  createDir(name: string, parentPath: string) {
    const dir = new Dir(name);

    this.insertItem(dir, parentPath);
  }

  #loadFile = (data: ItemInit) => {
    if (data.ext) return new File(data.name, data.ext, data.fav);
    throw new Error('File init data must include name, ext, and fav');
  };

  #loadDir = (data: ItemInit) => {
    const dir = new Dir(data.name, data.fav);
    if (data.children) {
      data.children.forEach((child) => {
        if (child.ext) {
          const f = this.#loadFile(child);
          if (f) dir.insertItem(f);
        } else {
          const d = this.#loadDir(child);
          dir.insertItem(d);
        }
      });
    }
    return dir;
  };

  load(init: ItemInit[]) {
    init.forEach((item) => {
      if (item.ext) {
        const f = this.#loadFile(item);
        if (f) this.root.insertItem(f);
      } else {
        const d = this.#loadDir(item);
        this.root.insertItem(d);
      }
    });
  }

  #readFile = (file: File): ItemData => {
    return { title: file.name, key: file.path, ext: file.ext, fav: file.fav };
  };

  #readDir = (dir: Dir): ItemData => {
    return {
      title: dir.name,
      key: dir.path,
      fav: dir.fav,
      children: this.#sortFn(dir.content).map((item) => {
        if (item instanceof File) return this.#readFile(item);
        if (item instanceof Dir) return this.#readDir(item);
        throw new Error('Children must only be File data or Dir data');
      }),
    };
  };
}

export { Item, ItemInit, ItemData, File, Dir, SortFn };
