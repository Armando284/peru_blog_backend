function Tree() {
  this.root = null; // referencia al nodo raiz
}

function Nodo(value) {
  this.value = value; // valor del nodo
  this.children = []; // lista de referencias a los nodos hijos
}

Tree.prototype.findBFS = function (value) {
  const queue = [this.root];
  while (queue.length) {
    const nodo = queue.shift();
    if (nodo.value === value) return nodo;
    for (let i = 0; i < nodo.children.length; i++) {
      queue.push(nodo.children[i]);
    }
  }
  return null;
};

Tree.prototype.add = function (value, toNodoValue) {
  const nodo = new Nodo(value);
  const parent = toNodoValue ? this.findBFS(toNodoValue) : null;
  if (parent) {
    parent.children.push(nodo);
  } else if (!this.root) {
    this.root = nodo;
  } else {
    throw new Error('Root node is already assigned');
  }
};

Tree.prototype.remove = function (value) {
  if (this.root.value === value) {
    this.root = null;
  }

  const queue = [this.root];
  while (queue.length) {
    const nodo = queue.shift();
    for (let i = 0; i < nodo.children.length; i++) {
      if (nodo.children[i].value === value) {
        nodo.children.splice(i, 1);
      } else {
        queue.push(nodo.children[i]);
      }
    }
  }
};

Tree.prototype.traverseBFS = function (fn) {
  const queue = [this.root];
  while (queue.length) {
    const nodo = queue.shift();
    fn && fn(nodo);
    for (let i = 0; i < nodo.children.length; i++) {
      queue.push(nodo.children[i]);
    }
  }
};

// method puede ser preOrder o postOrder
Tree.prototype.traverseDFS = function (fn, method) {
  const current = this.root;
  if (method) {
    this['_' + method](current, fn);
  } else {
    this._preOrder(current, fn);
  }
};

//preOrder
Tree.prototype._preOrder = function (nodo, fn) {
  if (!nodo) return;
  fn && fn(nodo);
  for (let i = 0; i < nodo.children.length; i++) {
    this._preOrder(nodo.children[i], fn);
  }
};

//postOrder
Tree.prototype._postOrder = function (nodo, fn) {
  if (!nodo) return;
  for (let i = 0; i < nodo.children.length; i++) {
    this._postOrder(nodo.children[i], fn);
  }
  fn && fn(nodo);
};
