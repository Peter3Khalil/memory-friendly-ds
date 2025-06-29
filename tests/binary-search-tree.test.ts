import { BinarySearchTree } from '../src';

describe('BinarySearchTree', () => {
  let bst: BinarySearchTree<number>;

  beforeEach(() => {
    bst = new BinarySearchTree<number>();
  });

  describe('insert()', () => {
    it('inserts values in correct order', () => {
      [10, 5, 15, 0].forEach((v) => bst.insert(v));
      expect(bst.inOrder()).toEqual([0, 5, 10, 15]);
    });

    it('ignores duplicate values', () => {
      [10, 5, 15, 5, 10].forEach((v) => bst.insert(v));
      expect(bst.inOrder()).toEqual([5, 10, 15]);
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
    describe('traversal with populated tree', () => {
      beforeEach(() => {
        [10, 5, 15, 3, 7, 12, 20].forEach((v) => bst.insert(v));
      });

      it('returns correct in-order traversal', () => {
        expect(bst.inOrder()).toEqual([3, 5, 7, 10, 12, 15, 20]);
      });

      it('returns correct post-order traversal', () => {
        expect(bst.postOrder()).toEqual([3, 7, 5, 12, 20, 15, 10]);
      });

      it('returns correct pre-order traversal', () => {
        expect(bst.preOrder()).toEqual([10, 5, 3, 7, 15, 12, 20]);
      });
    });

    describe('in-order traversal', () => {
      beforeEach(() => {
        bst = new BinarySearchTree<number>();
      });

      it('returns empty array for empty tree', () => {
        expect(bst.inOrder()).toEqual([]);
      });

      it('returns single value for single node tree', () => {
        bst.insert(42);
        expect(bst.inOrder()).toEqual([42]);
      });

      it('handles right-skewed tree correctly', () => {
        [1, 2, 3, 4, 5].forEach((v) => bst.insert(v));
        expect(bst.inOrder()).toEqual([1, 2, 3, 4, 5]);
      });

      it('handles left-skewed tree correctly', () => {
        [5, 4, 3, 2, 1].forEach((v) => bst.insert(v));
        expect(bst.inOrder()).toEqual([1, 2, 3, 4, 5]);
      });
    });

    describe('pre-order traversal', () => {
      beforeEach(() => {
        bst = new BinarySearchTree<number>();
      });

      it('returns empty array for empty tree', () => {
        expect(bst.preOrder()).toEqual([]);
      });

      it('returns single value for single node tree', () => {
        bst.insert(42);
        expect(bst.preOrder()).toEqual([42]);
      });

      it('handles right-skewed tree correctly', () => {
        [1, 2, 3].forEach((v) => bst.insert(v));
        expect(bst.preOrder()).toEqual([1, 2, 3]);
      });

      it('handles left-skewed tree correctly', () => {
        [3, 2, 1].forEach((v) => bst.insert(v));
        expect(bst.preOrder()).toEqual([3, 2, 1]);
      });

      it('handles complex tree structure', () => {
        [8, 3, 10, 1, 6, 14, 4, 7, 13].forEach((v) => bst.insert(v));
        expect(bst.preOrder()).toEqual([8, 3, 1, 6, 4, 7, 10, 14, 13]);
      });
    });

    describe('post-order traversal', () => {
      beforeEach(() => {
        bst = new BinarySearchTree<number>();
      });

      it('returns empty array for empty tree', () => {
        expect(bst.postOrder()).toEqual([]);
      });

      it('returns single value for single node tree', () => {
        bst.insert(42);
        expect(bst.postOrder()).toEqual([42]);
      });

      it('handles right-skewed tree correctly', () => {
        [1, 2, 3].forEach((v) => bst.insert(v));
        expect(bst.postOrder()).toEqual([3, 2, 1]);
      });

      it('handles left-skewed tree correctly', () => {
        [3, 2, 1].forEach((v) => bst.insert(v));
        expect(bst.postOrder()).toEqual([1, 2, 3]);
      });

      it('handles complex tree structure', () => {
        [8, 3, 10, 1, 6, 14, 4, 7, 13].forEach((v) => bst.insert(v));
        expect(bst.postOrder()).toEqual([1, 4, 7, 6, 3, 13, 14, 10, 8]);
      });
    });
  });

  describe('remove()', () => {
    const buildTree = () => {
      [10, 5, 15, 3, 7, 20].forEach((v) => bst.insert(v));
    };

    const inOrder = () => bst.inOrder();

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
      expect(bst.inOrder()).toEqual([]);
    });
  });

  describe('height()', () => {
    it('returns -1 for empty tree', () => {
      expect(bst.height()).toBe(-1);
    });

    it('returns 0 for tree with only root', () => {
      bst.insert(10);
      expect(bst.height()).toBe(0);
    });

    it('returns correct height for balanced tree', () => {
      [10, 5, 15, 3, 7, 12, 20].forEach((v) => bst.insert(v));
      expect(bst.height()).toBe(2);
    });

    it('returns correct height for unbalanced tree', () => {
      [1, 2, 3, 4, 5].forEach((v) => bst.insert(v));
      expect(bst.height()).toBe(4);
    });

    it('returns correct height for deeply unbalanced tree with many nodes', () => {
      const length = 10000;
      Array.from({ length }, (_, i) => i).forEach((v) => bst.insert(v));
      expect(bst.height()).toBe(length - 1);
    });

    it('updates height after removals', () => {
      [10, 5, 15, 3, 7, 12, 20].forEach((v) => bst.insert(v));
      bst.remove(5);
      bst.remove(15);
      expect(bst.height()).toBe(2);
    });
  });
});
