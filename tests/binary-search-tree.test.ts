import { BinarySearchTree } from '../src';

describe('BinarySearchTree', () => {
  let bst: BinarySearchTree<number>;

  beforeEach(() => {
    bst = new BinarySearchTree<number>();
  });

  describe('insert()', () => {
    it('inserts values in correct order', () => {
      [10, 5, 15, 0].forEach((v) => bst.insert(v));
      expect(bst.inOrderTraversal()).toEqual([0, 5, 10, 15]);
    });

    it('ignores duplicate values', () => {
      [10, 5, 15, 5, 10].forEach((v) => bst.insert(v));
      expect(bst.inOrderTraversal()).toEqual([5, 10, 15]);
    });
  });

  describe('contains()', () => {
    it('returns true for existing values and false for others', () => {
      [10, 5, 15].forEach((v) => bst.insert(v));
      expect(bst.contains(10)).toBe(true);
      expect(bst.contains(5)).toBe(true);
      expect(bst.contains(15)).toBe(true);
      expect(bst.contains(99)).toBe(false);
    });

    it('returns false for empty tree', () => {
      expect(bst.contains(42)).toBe(false);
    });
  });

  describe('findMin() and findMax()', () => {
    it('returns null for empty tree', () => {
      expect(bst.findMin()).toBeNull();
      expect(bst.findMax()).toBeNull();
    });

    it('returns the only element if tree has one node', () => {
      bst.insert(10);
      expect(bst.findMin()).toBe(10);
      expect(bst.findMax()).toBe(10);
    });

    it('returns correct min and max for multiple elements', () => {
      [10, -1, 500, 30, 5].forEach((v) => bst.insert(v));
      expect(bst.findMin()).toBe(-1);
      expect(bst.findMax()).toBe(500);
    });
  });

  describe('traversals', () => {
    beforeEach(() => {
      [10, 5, 15, 3, 7, 12, 20].forEach((v) => bst.insert(v));
    });

    it('returns correct in-order traversal', () => {
      expect(bst.inOrderTraversal()).toEqual([3, 5, 7, 10, 12, 15, 20]);
    });

    it('returns correct post-order traversal', () => {
      expect(bst.postOrderTraversal()).toEqual([3, 7, 5, 12, 20, 15, 10]);
    });
  });

  describe('remove()', () => {
    const buildTree = () => {
      [10, 5, 15, 3, 7, 20].forEach((v) => bst.insert(v));
    };

    const inOrder = () => bst.inOrderTraversal();

    it('removes a leaf node', () => {
      buildTree();
      bst.remove(7);
      expect(inOrder()).toEqual([3, 5, 10, 15, 20]);
    });

    it('removes a node with one right child', () => {
      buildTree();
      bst.remove(15);
      expect(inOrder()).toEqual([3, 5, 7, 10, 20]);
    });

    it('removes a node with one left child', () => {
      buildTree();
      bst.remove(7);
      bst.remove(5);
      expect(inOrder()).toEqual([3, 10, 15, 20]);
    });

    it('removes a node with two children', () => {
      buildTree();
      bst.remove(5);
      expect(inOrder()).toEqual([3, 7, 10, 15, 20]);
    });

    it('removes the root node with two children', () => {
      buildTree();
      bst.remove(10);
      expect(inOrder()).toEqual([3, 5, 7, 15, 20]);
    });

    it('removes the root node with one child', () => {
      bst.insert(10);
      bst.insert(5);
      bst.remove(10);
      expect(inOrder()).toEqual([5]);
    });

    it('removes the root node when it is a leaf', () => {
      bst.insert(10);
      bst.remove(10);
      expect(inOrder()).toEqual([]);
    });

    it('does nothing when value does not exist', () => {
      buildTree();
      bst.remove(999);
      expect(inOrder()).toEqual([3, 5, 7, 10, 15, 20]);
    });

    it('removes all nodes one by one', () => {
      buildTree();
      [3, 5, 7, 10, 15, 20].forEach((v) => bst.remove(v));
      expect(inOrder()).toEqual([]);
    });

    it('handles repeated remove and insert', () => {
      buildTree();
      bst.remove(15);
      bst.insert(15);
      bst.remove(15);
      expect(inOrder()).toEqual([3, 5, 7, 10, 20]);
    });
  });

  describe('edge cases', () => {
    it('handles deeply nested inserts without error', () => {
      for (let i = 0; i < 10000; i++) bst.insert(i);
      expect(bst.contains(9999)).toBe(true);
    });

    it('handles removing all nodes from large tree', () => {
      const values = Array.from({ length: 10000 }, (_, i) => i);
      values.forEach((v) => bst.insert(v));
      values.forEach((v) => bst.remove(v));
      expect(bst.inOrderTraversal()).toEqual([]);
    });
  });
});
