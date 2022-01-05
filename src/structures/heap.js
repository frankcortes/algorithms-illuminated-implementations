class Heap {
  constructor() {
    // In this case, nodes are objects with the key
    // attribute, which is used for balancing/sorting
    // the nodes in the Heap.
    this.nodes = [];
  }

  get length() {
    return this.nodes.length;
  }

  // Adds a new node in the Heap.
  insert(node) {
    this.nodes.push(node);
    const lastIndex = this.nodes.length - 1;

    this.bubbleUp(lastIndex);
  }

  findMin() {
    return this.nodes[0];
  }

  // Returns the node with the min key and removes it from the Heap.
  extractMin() {
    const min = this.nodes.shift();

    // Basic case: only one node, we don't have to do anything else.
    if (!this.nodes.length) return min;

    // Mark the latest leaf as the new root element.
    const lastLeaf = this.nodes.pop();
    this.nodes.unshift(lastLeaf);

    // Now, it's sure that the binary tree breaks the invariant.
    // We have to balance the binary tree again
    this.bubbleDown(0);

    // Return the deleted node.
    return min;
  }

  // Deletes a node in the Heap.
  delete(node) {
    // With this method signature, this has cost O(n log n) since
    // we have to calculate the index by iterating the array O(n).
    // and the cost of deleting by using an index is O(log n).
    const index = this.nodes.findIndex((n) => n === node);
    const parentIndex = Math.floor(index / 2);

    // Basic case: no nodes, we don't have to do anything else.
    if (!this.nodes.length) return;

    // Basic case: the node does not exist in the Heap.
    if (index === -1) return;

    // Basic case: exists and we have only one node, just delete it.
    if (this.nodes.length === 1) {
      this.nodes.pop();
      return;
    }

    // Mark the latest leaf as the new element of that position.
    let lastLeaf = this.nodes.pop();

    // Corner case: we want to delete the last leaf. In this case,
    // mark the previous leaf.
    if (lastLeaf === node) {
      lastLeaf = this.nodes.pop();
    }

    this.nodes.splice(index, 1, lastLeaf);

    // Now, it's sure that the binary tree breaks the invariant.
    // We have to balance the binary tree again.
    // Check what is the key of the new node, and see if we need to
    // modify the top level or the down level.
    if (lastLeaf.key < this.nodes[parentIndex].key) {
      this.bubbleUp(index);
    } else {
      this.bubbleDown(index);
    }
  }

  // Sugar syntax method to delete node instances using
  // attributes. The cost of this delete increases until
  // O(n log n) - even if the initial delete were O(log n), which
  // is not the current case - since O(n) is the cost to filter the
  // node list.
  deleteBy(fn) {
    const node = this.nodes.find(fn);

    this.delete(node);
  }

  // Method to balance the Heap when we are inserting a new node
  bubbleUp(index) {
    // Basic case: no need to swap since this index does not exist.
    if (index < 0) return;

    const parentIndex = Math.floor(index / 2);

    // Only is true if the binary tree breaks the invariant: the
    // children should be bigger than the parent
    if (this.nodes[index].key < this.nodes[parentIndex].key) {
      const tmp = this.nodes[index];

      this.nodes[index] = this.nodes[parentIndex];
      this.nodes[parentIndex] = tmp;

      // Check if this continues happening in the next top-level
      this.bubbleUp(parentIndex);
    }
  }

  // Method to balance the Heap when we are deleting the root node
  bubbleDown(index) {
    // Basic case: is a leaf, we don't have to do anything else.
    // Every "level" of nodes contains a power of 2, so we can
    // calculate the last one by using log2.
    const lastLevel = Math.floor(Math.log2(this.nodes.length));
    const currentLevel = Math.floor(Math.log2(index));

    if (currentLevel === lastLevel) return;

    const childLeftIndex = 2 * index;
    const childRightIndex = childLeftIndex + 1;

    // Check for every child (first the left one and then the right
    // one) if the invariant is not broken (a parent node should be
    // smaller than their children ones)
    [childLeftIndex, childRightIndex].forEach((childIndex) => {
      // Basic case: this node does not have children to check,
      // so we don't have to do anything else.
      if (childIndex > this.nodes.length - 1) return;

      // Only true if the binary tree breaks the invariant: the
      // parent should be smaller than the left children (and the right
      // one)
      if (this.nodes[index].key > this.nodes[childIndex].key) {
        const tmp = this.nodes[index];

        this.nodes[index] = this.nodes[childIndex];
        this.nodes[childIndex] = tmp;

        // Check if this continues happening in the next down level
        this.bubbleDown(childIndex);
      }
    });
  }
}

module.exports = Heap;
