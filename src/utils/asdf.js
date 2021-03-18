/* eslint-disable max-classes-per-file */
class Node {
  #name = '';

  #parent = null;

  #fav = false;

  constructor(name, fav) {
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

class File extends Node {
  #ext = '';

  constructor(name, fav, ext) {
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

  json(_) {
    return {
      title: this.name,
      key: this.path,
      fav: this.fav,
      isLeaf: true,
      ext: this.ext,
    };
  }

  get copy() {
    return new File(`${this.name} copy`);
  }
}

class Dir extends Node {
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

  json(sortFn = null) {
    return {
      title: this.name,
      key: this.path,
      fav: this.fav,
      children: sortFn
        ? sortFn(this.content).map((item) => item.json(sortFn))
        : this.content.map((item) => item.json(sortFn)),
    };
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

class FileSystem {
  #root = new Dir('root', false);


}

function loadJson(json) {
  const dir = new Dir(json.name, json.fav);
  json.children.forEach((child) => {
    if (child.ext) {
      const file = new File(child.name, child.fav, child.ext);
      dir.insertItem(file);
    }
    if (child.children) {
      dir.insertItem(loadJson(child));
    }
  });
  return dir;
}

export { loadJson, File, Dir };
