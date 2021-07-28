export class Nodo {
  value: string; // valor del nodo
  children: Nodo[]; // lista de referencias a los nodos hijos

  constructor(value: string) {
    this.value = value;
    this.children = [];
  }
}

export class Tree {
  root: Nodo; // referencia al nodo raiz

  constructor() {
    this.root = null;
  }

  findBFS(value: string) {
    const queue: Nodo[] = [this.root];
    while (queue.length) {
      const nodo: Nodo = queue.shift();
      if (nodo.value === value) return nodo;
      for (let i = 0; i < nodo.children.length; i++) {
        queue.push(nodo.children[i]);
      }
    }
    return null;
  }

  add(value: string, toNodoValue: string) {
    const nodo: Nodo = new Nodo(value);
    const parent: Nodo = toNodoValue ? this.findBFS(toNodoValue) : null;
    if (parent) {
      parent.children.push(nodo);
    } else if (!this.root) {
      this.root = nodo;
    } else {
      throw new Error('Root node is already assigned');
    }
  }

  remove(value: string) {
    if (this.root.value === value) {
      this.root = null;
    }

    const queue: Nodo[] = [this.root];
    while (queue.length) {
      const nodo: Nodo = queue.shift();
      for (let i = 0; i < nodo.children.length; i++) {
        nodo.children[i].value === value
          ? nodo.children.splice(i, 1)
          : queue.push(nodo.children[i]);
      }
    }
  }

  traverseBFS(fn) {
    const queue: Nodo[] = [this.root];
    while (queue.length) {
      const nodo: Nodo = queue.shift();
      fn && fn(nodo);
      for (let i = 0; i < nodo.children.length; i++) {
        queue.push(nodo.children[i]);
      }
    }
  }

  // method puede ser preOrder o postOrder
  traverseDFS(fn, method: string) {
    const current: Nodo = this.root;
    if (method) {
      this['_' + method](current, fn);
    } else {
      this._preOrder(current, fn);
    }
  }

  //preOrder
  _preOrder(nodo: Nodo, fn) {
    if (!nodo) return;
    fn && fn(nodo);
    for (let i = 0; i < nodo.children.length; i++) {
      this._preOrder(nodo.children[i], fn);
    }
  }

  //postOrder
  _postOrder(nodo: Nodo, fn) {
    if (!nodo) return;
    for (let i = 0; i < nodo.children.length; i++) {
      this._postOrder(nodo.children[i], fn);
    }
    fn && fn(nodo);
  }
}
