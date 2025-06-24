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
});
