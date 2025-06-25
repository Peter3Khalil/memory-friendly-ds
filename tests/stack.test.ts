import { Stack } from '../src';

describe('Stack', () => {
  describe('push method', () => {
    let stack: Stack<number>;

    beforeEach(() => {
      stack = new Stack<number>();
    });

    it('should add an element to an empty stack', () => {
      stack.push(10);
      expect(stack.getSize()).toBe(1);
      expect(stack.getTop()?.value).toBe(10);
    });

    it('should add multiple elements to the stack', () => {
      stack.push(10);
      stack.push(20);
      stack.push(30);

      expect(stack.getSize()).toBe(3);
      expect(stack.getTop()?.value).toBe(30);
    });

    it('should maintain LIFO order when pushing', () => {
      stack.push(10);
      stack.push(20);

      const removedValue = stack.pop()?.value;
      expect(removedValue).toBe(20);
      expect(stack.getTop()?.value).toBe(10);
    });

    it('should work with different data types', () => {
      const stringStack = new Stack<string>();
      stringStack.push('hello');
      stringStack.push('world');

      expect(stringStack.getSize()).toBe(2);
      expect(stringStack.getTop()?.value).toBe('world');
    });

    it('should allow pushing after popping', () => {
      stack.push(10);
      stack.push(20);
      stack.pop();
      stack.push(30);

      expect(stack.getSize()).toBe(2);
      expect(stack.getTop()?.value).toBe(30);
    });
  });

  describe('pop method', () => {
    let stack: Stack<number>;

    beforeEach(() => {
      stack = new Stack<number>();
    });

    it('should return null when popping from empty stack', () => {
      expect(stack.pop()).toBeNull();
    });

    it('should remove and return the top element', () => {
      stack.push(10);
      stack.push(20);

      const poppedNode = stack.pop();
      expect(poppedNode?.value).toBe(20);
      expect(stack.getSize()).toBe(1);
    });

    it('should update the top element after popping', () => {
      stack.push(10);
      stack.push(20);
      stack.push(30);

      stack.pop();
      expect(stack.getTop()?.value).toBe(20);
    });

    it('should handle popping all elements', () => {
      stack.push(10);
      stack.push(20);

      stack.pop();
      stack.pop();

      expect(stack.getSize()).toBe(0);
      expect(stack.isEmpty()).toBe(true);
      expect(stack.getTop()).toBeNull();
    });
  });

  describe('getTop method', () => {
    let stack: Stack<number>;

    beforeEach(() => {
      stack = new Stack<number>();
    });

    it('should return null for empty stack', () => {
      expect(stack.getTop()).toBeNull();
    });

    it('should return the most recently added element without removing it', () => {
      stack.push(10);
      stack.push(20);

      expect(stack.getTop()?.value).toBe(20);
      expect(stack.getSize()).toBe(2); // Size unchanged
    });

    it('should return the same element on multiple calls', () => {
      stack.push(10);

      const firstCall = stack.getTop();
      const secondCall = stack.getTop();

      expect(firstCall?.value).toBe(10);
      expect(secondCall?.value).toBe(10);
      expect(stack.getSize()).toBe(1);
    });
  });

  describe('getSize method', () => {
    let stack: Stack<number>;

    beforeEach(() => {
      stack = new Stack<number>();
    });

    it('should return 0 for empty stack', () => {
      expect(stack.getSize()).toBe(0);
    });

    it('should return correct size after pushing elements', () => {
      stack.push(10);
      stack.push(20);
      stack.push(30);

      expect(stack.getSize()).toBe(3);
    });

    it('should return correct size after popping elements', () => {
      stack.push(10);
      stack.push(20);
      stack.push(30);

      stack.pop();
      expect(stack.getSize()).toBe(2);

      stack.pop();
      expect(stack.getSize()).toBe(1);
    });
  });

  describe('isEmpty method', () => {
    let stack: Stack<number>;

    beforeEach(() => {
      stack = new Stack<number>();
    });

    it('should return true for new stack', () => {
      expect(stack.isEmpty()).toBe(true);
    });

    it('should return false after pushing elements', () => {
      stack.push(10);

      expect(stack.isEmpty()).toBe(false);
    });

    it('should return true after popping all elements', () => {
      stack.push(10);
      stack.pop();

      expect(stack.isEmpty()).toBe(true);
    });
  });

  describe('clear method', () => {
    let stack: Stack<number>;

    beforeEach(() => {
      stack = new Stack<number>();
    });

    it('should remove all elements from the stack', () => {
      stack.push(10);
      stack.push(20);
      stack.push(30);

      stack.clear();

      expect(stack.getSize()).toBe(0);
      expect(stack.isEmpty()).toBe(true);
      expect(stack.getTop()).toBeNull();
    });

    it('should work on empty stack', () => {
      stack.clear();

      expect(stack.getSize()).toBe(0);
      expect(stack.isEmpty()).toBe(true);
    });

    it('should allow adding elements after clearing', () => {
      stack.push(10);
      stack.push(20);

      stack.clear();
      stack.push(30);

      expect(stack.getSize()).toBe(1);
      expect(stack.getTop()?.value).toBe(30);
    });
  });

  describe('toArray method', () => {
    let stack: Stack<number>;

    beforeEach(() => {
      stack = new Stack<number>();
    });

    it('should return empty array for empty stack', () => {
      expect(stack.toArray()).toEqual([]);
    });

    it('should return array with all stack elements in LIFO order', () => {
      stack.push(10);
      stack.push(20);
      stack.push(30);

      expect(stack.toArray()).toEqual([30, 20, 10]);
    });

    it('should not modify the stack', () => {
      stack.push(10);
      stack.push(20);
      stack.toArray();

      expect(stack.getSize()).toBe(2);
      expect(stack.getTop()?.value).toBe(20);
    });
  });
});
