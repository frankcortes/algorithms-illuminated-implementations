const SearchTree = require('../../src/structures/searchTree');

describe('searchTree structure', () => {
  describe('search', () => {
    it('returns null if this does not exist', () => {
      const tree = new SearchTree();
      tree.insert(3);
      expect(tree.search(2)).toBeNull();
    });

    it('can search a value', () => {
      const tree = new SearchTree();
      tree.insert(2);
      expect(tree.search(2).key).toEqual(2);
    });

    it('can search a value inside of a child', () => {
      const tree = new SearchTree();
      tree.insert(2);
      tree.insert(3);
      tree.insert(1);
      expect(tree.search(3).key).toEqual(3);
    });

    it('can search a value from a leaf', () => {
      const tree = new SearchTree();
      tree.insert(2);
      tree.insert(3);
      tree.insert(1);
      // new leaf from 3
      tree.insert(4);
      expect(tree.search(4).key).toEqual(4);
    });
  });

  describe('min', () => {
    it('returns null if it does not have nodes', () => {
      const tree = new SearchTree();
      expect(tree.min()).toEqual(null);
    });

    it('returns the min value', () => {
      const tree = new SearchTree();
      tree.insert(2);
      tree.insert(3);
      tree.insert(1);
      tree.insert(4);
      expect(tree.min()).toEqual(1);
    });
  });

  describe('max', () => {
    it('returns null if it does not have nodes', () => {
      const tree = new SearchTree();
      expect(tree.max()).toEqual(null);
    });

    it('returns the max value', () => {
      const tree = new SearchTree();
      tree.insert(2);
      tree.insert(3);
      tree.insert(1);
      tree.insert(4);
      expect(tree.max()).toEqual(4);
    });
  });

  describe('precessor', () => {
    it('returns null if is there are no nodes', () => {
      const tree = new SearchTree();
      expect(tree.predecessor()).toEqual(null);
    });

    it('returns null if is there are no parent nodes', () => {
      const tree = new SearchTree(1);
      expect(tree.predecessor()).toEqual(null);
    });

    it('returns null if is there is the minimum value', () => {
      const parentTree = new SearchTree(2);
      const tree = new SearchTree(1, parentTree);
      expect(tree.predecessor()).toEqual(null);
    });

    it('returns the expected preprocessor from the parents', () => {
      const parentTree = new SearchTree(1);
      parentTree.insert(3);
      const tree = parentTree.insert(2); // returns the "2" subtree
      expect(tree.predecessor().key).toEqual(1);
    });

    it('returns the expected preprocessor from the left subtree', () => {
      const parentTree = new SearchTree(1);
      const tree = parentTree.insert(4); // returns the "4" subtree
      parentTree.insert(2);
      parentTree.insert(3);
      expect(tree.predecessor().key).toEqual(3);
    });
  });

  describe('successor', () => {
    it('returns null if is there are no nodes', () => {
      const tree = new SearchTree();
      expect(tree.successor()).toEqual(null);
    });

    it('returns null if is there are no parent nodes', () => {
      const tree = new SearchTree(1);
      expect(tree.successor()).toEqual(null);
    });

    it('returns null if is there is the maximum value', () => {
      const parentTree = new SearchTree(2);
      const tree = new SearchTree(3, parentTree);
      expect(tree.successor()).toEqual(null);
    });

    it('returns the expected preprocessor from the parents', () => {
      const parentTree = new SearchTree(3);
      parentTree.insert(1);
      const tree = parentTree.insert(2); // returns the "2" subtree
      expect(tree.successor().key).toEqual(3);
    });

    it('returns the expected preprocessor from the left subtree', () => {
      const parentTree = new SearchTree(1);
      parentTree.insert(4);
      parentTree.insert(2);
      parentTree.insert(5);
      expect(parentTree.successor().key).toEqual(2);
    });
  });

  describe('outputSorted', () => {
    it('returns an empty array if there are no nodes', () => {
      const parentTree = new SearchTree();
      expect(parentTree.outputSorted()).toEqual([]);
    });

    it('returns the expected sorted array', () => {
      const parentTree = new SearchTree(3);
      parentTree.insert(4);
      parentTree.insert(2);
      parentTree.insert(1);
      expect(parentTree.outputSorted()).toEqual([1, 2, 3, 4]);
    });
  });

  describe('delete', () => {
    it('does remove nothing if does not exist', () => {
      const parentTree = new SearchTree(3);

      parentTree.insert(4);
      parentTree.insert(3);
      parentTree.insert(2);
      parentTree.insert(1);

      parentTree.delete(5);
      expect(parentTree.outputSorted()).toEqual([1, 2, 3, 4]);
    });

    it('removes the expected node if exist and has no children', () => {
      const parentTree = new SearchTree();

      parentTree.insert(4);
      parentTree.insert(3);
      parentTree.insert(2);
      parentTree.insert(1);

      parentTree.delete(1);
      expect(parentTree.outputSorted()).toEqual([2, 3, 4]);
    });

    it('removes the expected node if exist and has one children', () => {
      const parentTree = new SearchTree();

      parentTree.insert(4);
      parentTree.insert(3);
      parentTree.insert(2);
      parentTree.insert(1);

      parentTree.delete(2);
      expect(parentTree.outputSorted()).toEqual([1, 3, 4]);
    });

    it('removes the expected node if exist and has two children', () => {
      const parentTree = new SearchTree();

      parentTree.insert(3);
      parentTree.insert(2);
      parentTree.insert(4);
      parentTree.insert(1);

      parentTree.delete(4);
      expect(parentTree.outputSorted()).toEqual([1, 2, 3]);
    });

    it('removes every node but 2', () => {
      const parentTree = new SearchTree();

      parentTree.insert(3);
      parentTree.insert(2);
      parentTree.insert(4);
      parentTree.insert(1);

      parentTree.delete(3);
      parentTree.delete(4);
      parentTree.delete(1);

      expect(parentTree.outputSorted()).toEqual([2]);
    });
  });

  describe('select', () => {
    it('give null if the position is outside of the range', () => {
      const parentTree = new SearchTree();

      parentTree.insert(4);
      parentTree.insert(3);
      parentTree.insert(5);
      parentTree.insert(2);

      expect(parentTree.select(10)).toEqual(null);
    });

    it('give null if the position is a negative number', () => {
      const parentTree = new SearchTree();

      parentTree.insert(4);
      parentTree.insert(3);
      parentTree.insert(5);
      parentTree.insert(2);

      expect(parentTree.select(-1)).toEqual(null);
    });

    it('give the expected number in a left child', () => {
      const parentTree = new SearchTree();

      parentTree.insert(4);
      parentTree.insert(3);
      parentTree.insert(5);
      parentTree.insert(2);

      expect(parentTree.select(2)).toEqual(3);
    });

    it('give the expected number in a right child', () => {
      const parentTree = new SearchTree();

      parentTree.insert(4);
      parentTree.insert(3);
      parentTree.insert(7);
      parentTree.insert(5);
      parentTree.insert(6);
      parentTree.insert(2);

      expect(parentTree.select(5)).toEqual(6);
    });

    it('give the expected number in root node', () => {
      const parentTree = new SearchTree();

      parentTree.insert(4);
      parentTree.insert(3);
      parentTree.insert(7);
      parentTree.insert(5);
      parentTree.insert(6);
      parentTree.insert(2);

      expect(parentTree.select(3)).toEqual(4);
    });
  });
});
