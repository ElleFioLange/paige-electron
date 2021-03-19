/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
class Item {
  #name = '';

  #parent = null;

  #fav;

  constructor(name, fav = false) {
    this.name = name;
    this.fav = fav;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    if (this.parent && this.parent.hasItem(newName)) {
      throw new Error(
        `Item with name ${newName} already exists in this directory`
      );
    }

    if (!newName || typeof newName !== 'string' || !newName.trim().length) {
      throw new Error('Item name must be a non empty string');
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

  get path() {
    if (this.parent) {
      return `${this.parent.path}/${this.name}`;
    }

    return this.name;
  }
}

const VALID_EXT = ['pdf', 'jpg', 'doc', 'docx', 'ppt', 'pptx', 'txt'];

class File extends Item {
  #ext;

  constructor(name, ext, fav = false) {
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
    return new File(`${this.name} copy`);
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

  hasItem(itemName) {
    return this.#children.has(itemName);
  }

  insertItem(item) {
    if (this.hasItem(item.name)) return true;

    if (item === this) throw new Error('Directory cannot contain itself');

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

  getItem(itemName) {
    return this.#children.get(itemName);
  }

  removeItem(itemName) {
    const item = this.getItem(itemName);

    if (item) {
      this.#children.delete(itemName);
      item.parent = null;
    }
  }
}

export default class FileSystem {
  #self = new Dir('home');

  #sortFn = (a) => a;

  set sortFn(fn) {
    this.#sortFn = fn;
  }

  get root() {
    return this.#self;
  }

  get json() {
    return [this.#readJsonD(this.root)];
  }

  getItem(path) {
    const p = path.split('/').splice(1);

    let item = this.root;

    p.forEach((name) => {
      item = item.getItem(name);
    });

    return item;
  }

  insertItem = (item, parentPath) => {
    const dir = this.getItem(parentPath);
    dir.insertItem(item);
  };

  removeItem(path) {
    const item = this.getItem(path);
    item.parent.removeItem(item.name);
  }

  moveItem(path, newParPath) {
    const item = this.getItem(path);
    const parent = this.getItem(newParPath);

    item.parent.removeItem(item.name);
    parent.insertItem(item);
  }

  renameItem(path, newName) {
    const item = this.getItem(path);
    const { parent } = item;

    parent.removeItem(item.name);
    item.name = newName;
    parent.insertItem(item);
  }

  createFile(name, ext, parentPath) {
    const file = new File(name, ext);

    this.insertItem(file, parentPath);
  }

  createDir(name, parentPath) {
    const dir = new Dir(name);

    this.insertItem(dir, parentPath);
  }

  #loadJsonF = (json) => {
    return new File(json.name, json.ext, json.fav);
  };

  #loadJsonD = (json) => {
    const dir = new Dir(json.name, json.fav);
    json.children.forEach((child) => {
      if (child.ext) {
        const f = this.#loadJsonF(child);
        dir.insertItem(f);
      } else {
        const d = this.#loadJsonD(child);
        dir.insertItem(d);
      }
    });
    return dir;
  };

  loadJson(array) {
    array.forEach((item) => {
      if (item.ext) {
        const f = this.#loadJsonF(item);
        this.root.insertItem(f);
      } else {
        const d = this.#loadJsonD(item);
        this.root.insertItem(d);
      }
    });
  }

  #readJsonF = (file) => {
    return { title: file.name, key: file.path, ext: file.ext, fav: file.fav };
  };

  #readJsonD = (dir) => {
    return {
      title: dir.name,
      key: dir.path,
      fav: dir.fav,
      children: this.#sortFn(dir.content).map((item) => {
        if (item.ext) {
          return this.#readJsonF(item);
        }
        return this.#readJsonD(item);
      }),
    };
  };
}

const fs = new FileSystem();

fs.createFile('foo', 'pdf', 'root');
console.log(fs.root.content);
fs.createDir('bar', 'root');
fs.moveItem('root/foo', 'root/bar');
console.log(fs.root.content);
console.log(fs.root.content[0].content[0].name);
