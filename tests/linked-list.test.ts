import { LinkedList } from '../src/ADTs';

describe('LinkedList', () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList<number>();
  });

  test('initially should be empty', () => {
    expect(list.isEmpty()).toBe(true);
    expect(list.getSize()).toBe(0);
    expect(list.getHead()).toBeNull();
    expect(list.getTail()).toBeNull();
    expect(list.toArray()).toEqual([]);
  });

  test('insertAtFirst should insert one item at the beginning', () => {
    list.insertAtFirst(1);
    expect(list.getSize()).toBe(1);
    expect(list.isEmpty()).toBe(false);
    expect(list.getHead()?.value).toBe(1);
    expect(list.getTail()?.value).toBe(1);
    expect(list.toArray()).toEqual([1]);
  });

  test('insertAtEnd should insert one item at the end', () => {
    list.insertAtEnd(5);
    expect(list.getSize()).toBe(1);
    expect(list.getHead()?.value).toBe(5);
    expect(list.getTail()?.value).toBe(5);
    expect(list.toArray()).toEqual([5]);
  });

  test('insertAtEnd should append multiple items in order', () => {
    list.insertAtEnd(1);
    list.insertAtEnd(2);
    list.insertAtEnd(3);
    expect(list.getSize()).toBe(3);
    expect(list.getHead()?.value).toBe(1);
    expect(list.getTail()?.value).toBe(3);
    expect(list.toArray()).toEqual([1, 2, 3]);
  });

  test('insertAtFirst should prepend multiple items in reverse order', () => {
    list.insertAtFirst(1);
    list.insertAtFirst(2);
    list.insertAtFirst(3);
    expect(list.getHead()?.value).toBe(3);
    expect(list.getTail()?.value).toBe(1);
    expect(list.getSize()).toBe(3);
    expect(list.toArray()).toEqual([3, 2, 1]);
  });

  test('insert at specific index', () => {
    list.insertAtEnd(1);
    list.insertAtEnd(3);
    list.insert(2, 1); // insert 2 at index 1
    expect(list.getSize()).toBe(3);
    expect(list.toArray()).toEqual([1, 2, 3]);
  });

  test('insert at index 0 is same as insertAtFirst', () => {
    list.insert(9, 0);
    expect(list.toArray()).toEqual([9]);
  });

  test('insert without index should default to end', () => {
    list.insert(1);
    list.insert(2);
    list.insert(3);
    expect(list.toArray()).toEqual([1, 2, 3]);
  });
});
