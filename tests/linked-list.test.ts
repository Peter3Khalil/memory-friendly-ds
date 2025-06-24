import { LinkedList } from '../src/ADTs';

describe('LinkedList', () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList<number>();
  });

  const assertList = (expected: number[]) => {
    expect(list.toArray()).toEqual(expected);
    expect(list.getSize()).toBe(expected.length);
    expect(list.isEmpty()).toBe(expected.length === 0);
    expect(list.getHead()?.value).toBe(expected.at(0));
    expect(list.getTail()?.value).toBe(expected.at(-1));
  };

  describe('initial state', () => {
    it('should be empty', () => {
      assertList([]);
    });
  });

  describe('insertAtFirst()', () => {
    it('should insert a single item at the beginning', () => {
      list.insertAtFirst(1);
      assertList([1]);
    });

    it('should insert multiple items in reverse order', () => {
      list.insertAtFirst(1);
      list.insertAtFirst(2);
      list.insertAtFirst(3);
      assertList([3, 2, 1]);
    });
  });

  describe('insertAtEnd()', () => {
    it('should insert a single item at the end', () => {
      list.insertAtEnd(5);
      assertList([5]);
    });

    it('should append multiple items in order', () => {
      list.insertAtEnd(1);
      list.insertAtEnd(2);
      list.insertAtEnd(3);
      assertList([1, 2, 3]);
    });
  });

  describe('insert(index)', () => {
    it('should insert in the middle of the list', () => {
      list.insertAtEnd(1);
      list.insertAtEnd(3);
      list.insert(2, 1); // insert 2 at index 1
      assertList([1, 2, 3]);
    });

    it('should insert at index 0 (same as insertAtFirst)', () => {
      list.insert(9, 0);
      assertList([9]);
    });

    it('should default to end when index is not provided', () => {
      list.insert(1);
      list.insert(2);
      list.insert(3);
      assertList([1, 2, 3]);
    });

    it('should throw error when index is less than 0 or greater than size', () => {
      expect(() => list.insert(2, -1)).toThrow('Index is out of range');
      expect(() => list.insert(2, 1)).toThrow('Index is out of range'); // size is 0
    });

    it('should insert at end if index === size', () => {
      list.insert(1, 0);
      list.insert(2, 1);
      list.insert(3, 2);
      assertList([1, 2, 3]);
    });
  });

  describe('removeFromEnd()', () => {
    it('should return false if the list is empty', () => {
      expect(list.removeFromEnd()).toBe(false);
      expect(list.getSize()).toBe(0);
      expect(list.toArray()).toEqual([]);
    });

    it('should remove the only node in a one-element list', () => {
      list.insertAtEnd(42);
      expect(list.removeFromEnd()).toBe(true);
      expect(list.getSize()).toBe(0);
      expect(list.getHead()).toBeNull();
      expect(list.getTail()).toBeNull();
      expect(list.toArray()).toEqual([]);
    });

    it('should remove the last node in a multi-node list', () => {
      list.insertAtEnd(1);
      list.insertAtEnd(2);
      list.insertAtEnd(3);
      expect(list.removeFromEnd()).toBe(true);
      expect(list.getSize()).toBe(2);
      expect(list.getTail()?.value).toBe(2);
      expect(list.toArray()).toEqual([1, 2]);
    });

    it('should remove nodes repeatedly until list is empty', () => {
      list.insertAtEnd(10);
      list.insertAtEnd(20);
      list.insertAtEnd(30);
      expect(list.removeFromEnd()).toBe(true); // [10, 20]
      expect(list.removeFromEnd()).toBe(true); // [10]
      expect(list.removeFromEnd()).toBe(true); // []
      expect(list.removeFromEnd()).toBe(false); // already empty
      expect(list.isEmpty()).toBe(true);
    });
  });

  describe('removeFromFirst()', () => {
    it('should return false if the list is empty', () => {
      expect(list.removeFromFirst()).toBe(false);
      expect(list.getSize()).toBe(0);
      expect(list.toArray()).toEqual([]);
    });

    it('should remove the only node in a one-element list', () => {
      list.insertAtFirst(100);
      expect(list.removeFromFirst()).toBe(true);
      expect(list.getSize()).toBe(0);
      expect(list.getHead()).toBeNull();
      expect(list.getTail()).toBeNull();
      expect(list.toArray()).toEqual([]);
    });

    it('should remove the first node in a multi-node list', () => {
      list.insertAtEnd(1);
      list.insertAtEnd(2);
      list.insertAtEnd(3);
      expect(list.removeFromFirst()).toBe(true);
      expect(list.getSize()).toBe(2);
      expect(list.getHead()?.value).toBe(2);
      expect(list.toArray()).toEqual([2, 3]);
    });

    it('should remove repeatedly until list is empty', () => {
      list.insertAtEnd(5);
      list.insertAtEnd(6);
      list.insertAtEnd(7);
      expect(list.removeFromFirst()).toBe(true); // [6, 7]
      expect(list.removeFromFirst()).toBe(true); // [7]
      expect(list.removeFromFirst()).toBe(true); // []
      expect(list.removeFromFirst()).toBe(false); // already empty
      expect(list.isEmpty()).toBe(true);
    });
  });

  describe('remove(index?: number)', () => {
    it('should return false for invalid negative or too-large index', () => {
      expect(list.remove(-1)).toBe(false);
      expect(list.remove(0)).toBe(false); // empty list
      list.insertAtEnd(1);
      expect(list.remove(1)).toBe(false); // index out of bounds
    });

    it('should remove from the end when index is undefined', () => {
      list.insertAtEnd(1);
      list.insertAtEnd(2);
      list.insertAtEnd(3);
      expect(list.remove()).toBe(true); // remove last (3)
      expect(list.toArray()).toEqual([1, 2]);
    });

    it('should remove from the start when index is 0', () => {
      list.insertAtEnd(10);
      list.insertAtEnd(20);
      expect(list.remove(0)).toBe(true); // remove first (10)
      expect(list.getHead()?.value).toBe(20);
      expect(list.getTail()?.value).toBe(20);
      expect(list.toArray()).toEqual([20]);
    });

    it('should remove from the middle', () => {
      list.insertAtEnd(1);
      list.insertAtEnd(2);
      list.insertAtEnd(3);
      list.insertAtEnd(4);
      expect(list.remove(2)).toBe(true); // remove 3
      expect(list.getSize()).toBe(3);
      expect(list.toArray()).toEqual([1, 2, 4]);
    });

    it('should update head and tail correctly after removals', () => {
      list.insertAtEnd(1);
      list.insertAtEnd(2);
      list.insertAtEnd(3);
      list.remove(0); // remove head
      list.remove(); // remove tail
      expect(list.getHead()?.value).toBe(2);
      expect(list.getTail()?.value).toBe(2);
      expect(list.toArray()).toEqual([2]);
    });

    it('should clean up to empty', () => {
      list.insert(5);
      expect(list.remove(0)).toBe(true);
      expect(list.getSize()).toBe(0);
      expect(list.isEmpty()).toBe(true);
      expect(list.getHead()).toBeNull();
      expect(list.getTail()).toBeNull();
    });
  });

  describe('Iterator functionality', () => {
    it('should be iterable with for...of loop', () => {
      list.insertAtEnd(1);
      list.insertAtEnd(2);
      list.insertAtEnd(3);

      const result: number[] = [];
      for (const value of list) {
        result.push(value);
      }

      expect(result).toEqual([1, 2, 3]);
    });

    it('should work with spread operator', () => {
      list.insertAtEnd(10);
      list.insertAtEnd(20);
      list.insertAtEnd(30);

      const array = [...list];
      expect(array).toEqual([10, 20, 30]);
    });

    it('should work with array destructuring', () => {
      list.insertAtEnd(5);
      list.insertAtEnd(6);
      list.insertAtEnd(7);

      const [first, second, third] = list;
      expect(first).toBe(5);
      expect(second).toBe(6);
      expect(third).toBe(7);
    });

    it('should work with empty lists', () => {
      // Empty list test
      const emptyArray = [...list];
      expect(emptyArray).toEqual([]);
    });

    it('should work with array methods', () => {
      list.insertAtEnd(1);
      list.insertAtEnd(2);
      list.insertAtEnd(3);

      // Map
      const doubled = [...list].map((x) => x * 2);
      expect(doubled).toEqual([2, 4, 6]);

      // Filter
      const filtered = [...list].filter((x) => x > 1);
      expect(filtered).toEqual([2, 3]);

      // Reduce
      const sum = [...list].reduce((acc, val) => acc + val, 0);
      expect(sum).toBe(6);
    });
  });

  describe('Search', () => {
    it('should return -1 when searching in empty list', () => {
      const list = new LinkedList();
      expect(list.search(5)).toBe(-1);
    });

    it('should return 0 when item is at head position', () => {
      const list = new LinkedList<number>();
      list.insertAtFirst(5);
      expect(list.search(5)).toBe(0);
    });

    it('should return correct position for item in the middle', () => {
      const list = new LinkedList<number>();
      list.insertAtEnd(10);
      list.insertAtEnd(20);
      list.insertAtEnd(30);
      expect(list.search(20)).toBe(1);
    });

    it('should return last index when item is at tail position', () => {
      const list = new LinkedList<number>();
      list.insertAtEnd(10);
      list.insertAtEnd(20);
      list.insertAtEnd(30);
      expect(list.search(30)).toBe(2);
    });

    it('should return -1 when item not found', () => {
      const list = new LinkedList<number>();
      list.insertAtEnd(10);
      list.insertAtEnd(20);
      expect(list.search(30)).toBe(-1);
    });

    it('should find first occurrence when duplicates exist', () => {
      const list = new LinkedList<number>();
      list.insertAtEnd(10);
      list.insertAtEnd(20);
      list.insertAtEnd(10);
      expect(list.search(10)).toBe(0);
    });

    it('should work with string values', () => {
      const list = new LinkedList<string>();
      list.insertAtEnd('apple');
      list.insertAtEnd('banana');
      list.insertAtEnd('orange');
      expect(list.search('banana')).toBe(1);
    });

    it('should work with object values when searching for reference', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const list = new LinkedList<object>();
      list.insertAtEnd(obj1);
      list.insertAtEnd(obj2);
      expect(list.search(obj1)).toBe(0);
      expect(list.search({ id: 1 })).toBe(-1); // Different reference
    });
  });
});
