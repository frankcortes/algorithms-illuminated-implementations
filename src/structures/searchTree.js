// Auxiliar functions to remove, replace and swap nodes inside of trees

function removeNodeFromTree(node) {
  const { parent } = node;

  if (parent !== null) {
    node.parent = null;

    if (parent.left === node) {
      parent.left = null;
    } else {
      parent.right = null;
    }
  } else {
    node.key = null;
  }
}

function replaceNode(original, replacement) {
  // If has a parent, replace pointers to the parent
  if (replacement.parent) {
    replacement.parent = original.parent;
    if (original.parent.left === original) {
      original.parent.left = replacement;
    } else {
      original.parent.right = replacement;
    }
  } else {
    // If is a root node, replace the values of the current original value
    original.key = replacement.key;
    original.left = replacement.left;
    original.right = replacement.right;
    replacement.parent = null;
  }
}

function swapNode(first, second) {
  const { key } = first;

  first.key = second.key;
  second.key = key;
}

// Note: we are not going to allow duplicated keys to make things simpler.
// Note: this is not a balanced tree, so the cost of insert, delete, min, max
// and select can be O(n-1) as worse case instead of O(log(n)).
class SearchTree {
  constructor(key, parent) {
    this.parent = parent || null;
    this.key = key || null;
    this.left = null;
    this.right = null;
  }

  // Size is a meta attribute to achieve the number of subtree nodes
  // counting this node itself
  get size() {
    // Note: this way to calculate the size is always O(n) instead
    // of O(1) since is dynamically calculated traversing all the
    // nodes instead of saving the value.
    const leftSize = this.left ? this.left.size : 0;
    const rightSize = this.right ? this.right.size : 0;
    return leftSize + rightSize + 1;
  }

  insert(key) {
    let node = this;

    while (node && node.key !== null) {
      // we don't want to insert duplicated keys for this search
      // tree implementation.
      if (key === node.key) return null;

      if (key < node.key) {
        if (node.left === null) {
          // create a new subtree
          node.left = new SearchTree(key, node);
          return node.left;
        }
        // Otherwise, continue traversing the left child
        node = node.left;
      } else {
        if (node.right === null) {
          // create a new value
          node.right = new SearchTree(key, node);
          return node.right;
        }
        // Otherwise, continue traversing the right child
        node = node.right;
      }
    }

    // Basic case: we don't have any node.
    this.key = key;
    return this;
  }

  search(key) {
    let node = this;

    while (node && node.key !== null) {
      // found!
      if (key === node.key) return node;

      if (key < node.key) {
        node = node.left;
      } else {
        node = node.right;
      }
    }

    return null;
  }

  // internal method to traverse until the last right/left node leaf
  closest(direction) {
    let node = this;

    while (node[direction] !== null) {
      node = node[direction];
    }

    return node;
  }

  min() {
    return this.closest('left').key;
  }

  max() {
    return this.closest('right').key;
  }

  predecessor() {
    if (this.left !== null) {
      return this.left.closest('right');
    }

    let node = this.parent;

    while (node !== null && this.key < node.key) {
      node = node.parent;
    }

    return node;
  }

  successor() {
    if (this.right !== null) {
      return this.right.closest('left');
    }

    let node = this.parent;

    while (node !== null && this.key > node.key) {
      node = node.parent;
    }

    return node;
  }

  outputSorted() {
    const arr = [];

    if (this.left) arr.push(...this.left.outputSorted());
    if (this.key) arr.push(this.key);
    if (this.right) arr.push(...this.right.outputSorted());

    return arr;
  }

  deleteByNode(node) {
    // Basic case: do nothing, since is not there.
    if (node === null) return;

    if (node.left === null) {
      if (node.right === null) {
        // Case 1: Node does not have children, just remove the node.
        removeNodeFromTree(node);
      } else {
        // Case 2: Only one child (right), replace child by current node.
        replaceNode(node, node.right);
      }
    } else if (node.right === null) {
      // case 2: Only one child (left), replace child by current node.
      replaceNode(node, node.left);
    } else {
      // Case 3: Two children. Swap predecessor and current node.
      const nodeToSwap = node.predecessor();
      swapNode(node, nodeToSwap);

      // Remove then swapped node in the new subTree again.
      this.deleteByNode(nodeToSwap);
    }
  }

  delete(key) {
    const node = this.search(key);

    this.deleteByNode(node);
  }

  select(position) {
    // Basic case, position is not defined in range {1, size}
    if (position > this.size || position <= 0) {
      return null;
    }

    const leftSize = this.left ? this.left.size : 0;

    // Basic case, position is the root
    if (position === leftSize + 1) {
      return this.key;
    }

    if (position < leftSize + 1) {
      return this.left.select(position);
    }

    // Here right child must exist because of size definition
    // The right subtree ignores the left tree and the root, so
    // we subtract these indexes
    return this.right.select(position - leftSize - 1);
  }

  // Auxiliar method to plot trees.
  print() {
    console.log(`\t\t\t ${this.key}
    size(${this.size})
    ↙\t\t\t\t↘\n
    ${this.left && this.left.key}\t\t\t\t${this.right && this.right.key}
    `);
  }
}

module.exports = SearchTree;
