import { Queue } from '../src';

describe('Queue - enQueue method', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  it('should add an item to an empty queue', () => {
    queue.enQueue(5);

    expect(queue.getSize()).toBe(1);
    expect(queue.getFront()?.value).toBe(5);
    expect(queue.getRear()?.value).toBe(5);
  });

  it('should add multiple items to the queue', () => {
    queue.enQueue(1);
    queue.enQueue(2);
    queue.enQueue(3);

    expect(queue.getSize()).toBe(3);
    expect(queue.getFront()?.value).toBe(1);
    expect(queue.getRear()?.value).toBe(3);
  });

  it('should add items successfully without errors', () => {
    expect(() => {
      queue.enQueue(10);
      queue.enQueue(20);
    }).not.toThrow();

    expect(queue.getSize()).toBe(2);
  });

  it('should correctly update the queue when items are added', () => {
    queue.enQueue(100);
    expect(queue.toArray()).toEqual([100]);

    queue.enQueue(200);
    expect(queue.toArray()).toEqual([100, 200]);

    queue.enQueue(300);
    expect(queue.toArray()).toEqual([100, 200, 300]);
  });
});

describe('Queue - deQueue method', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  it('should return null when dequeuing from an empty queue', () => {
    expect(queue.deQueue()).toBeNull();
  });

  it('should remove and return the front item from the queue', () => {
    queue.enQueue(5);
    const dequeued = queue.deQueue();

    expect(dequeued?.value).toBe(5);
    expect(queue.isEmpty()).toBe(true);
  });

  it('should correctly update the queue when items are dequeued', () => {
    queue.enQueue(1);
    queue.enQueue(2);
    queue.enQueue(3);

    const first = queue.deQueue();
    expect(first?.value).toBe(1);
    expect(queue.getSize()).toBe(2);
    expect(queue.getFront()?.value).toBe(2);

    const second = queue.deQueue();
    expect(second?.value).toBe(2);
    expect(queue.getSize()).toBe(1);
    expect(queue.getFront()?.value).toBe(3);
    expect(queue.getRear()?.value).toBe(3);
  });

  it('should dequeue all items correctly', () => {
    queue.enQueue(10);
    queue.enQueue(20);
    queue.enQueue(30);

    expect(queue.deQueue()?.value).toBe(10);
    expect(queue.deQueue()?.value).toBe(20);
    expect(queue.deQueue()?.value).toBe(30);
    expect(queue.deQueue()).toBeNull();
    expect(queue.isEmpty()).toBe(true);
  });
});

describe('Queue - isEmpty method', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  it('should return true for a newly created queue', () => {
    expect(queue.isEmpty()).toBe(true);
  });

  it('should return false after an item is added', () => {
    queue.enQueue(5);
    expect(queue.isEmpty()).toBe(false);
  });

  it('should return true after all items are removed', () => {
    queue.enQueue(5);
    queue.deQueue();
    expect(queue.isEmpty()).toBe(true);
  });
});

describe('Queue - getFront method', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  it('should return null for an empty queue', () => {
    expect(queue.getFront()).toBeNull();
  });

  it('should return the first item added to the queue', () => {
    queue.enQueue(10);
    queue.enQueue(20);
    expect(queue.getFront()?.value).toBe(10);
  });

  it('should not remove the item from the queue', () => {
    queue.enQueue(5);
    queue.getFront();
    expect(queue.getSize()).toBe(1);
  });
});

describe('Queue - getRear method', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  it('should return null for an empty queue', () => {
    expect(queue.getRear()).toBeNull();
  });

  it('should return the last item added to the queue', () => {
    queue.enQueue(10);
    queue.enQueue(20);
    expect(queue.getRear()?.value).toBe(20);
  });

  it('should update when new items are added', () => {
    queue.enQueue(5);
    expect(queue.getRear()?.value).toBe(5);
    queue.enQueue(10);
    expect(queue.getRear()?.value).toBe(10);
  });
});

describe('Queue - getSize method', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  it('should return 0 for a newly created queue', () => {
    expect(queue.getSize()).toBe(0);
  });

  it('should increase when items are added', () => {
    queue.enQueue(5);
    expect(queue.getSize()).toBe(1);
    queue.enQueue(10);
    expect(queue.getSize()).toBe(2);
  });

  it('should decrease when items are removed', () => {
    queue.enQueue(5);
    queue.enQueue(10);
    queue.deQueue();
    expect(queue.getSize()).toBe(1);
    queue.deQueue();
    expect(queue.getSize()).toBe(0);
  });
});

describe('Queue - toArray method', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  it('should return an empty array for an empty queue', () => {
    expect(queue.toArray()).toEqual([]);
  });

  it('should return an array with all queue items in FIFO order', () => {
    queue.enQueue(1);
    queue.enQueue(2);
    queue.enQueue(3);
    expect(queue.toArray()).toEqual([1, 2, 3]);
  });

  it('should not modify the queue', () => {
    queue.enQueue(10);
    queue.enQueue(20);
    queue.toArray();
    expect(queue.getSize()).toBe(2);
    expect(queue.getFront()?.value).toBe(10);
  });
});

describe('Queue - clear method', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  it('should remove all items from the queue', () => {
    queue.enQueue(1);
    queue.enQueue(2);
    queue.enQueue(3);
    queue.clear();
    expect(queue.isEmpty()).toBe(true);
    expect(queue.getSize()).toBe(0);
    expect(queue.getFront()).toBeNull();
    expect(queue.getRear()).toBeNull();
  });
});

describe('Queue - integration tests', () => {
  let queue: Queue<string>;

  beforeEach(() => {
    queue = new Queue<string>();
  });

  it('should handle a mix of operations in sequence', () => {
    expect(queue.isEmpty()).toBe(true);

    queue.enQueue('first');
    queue.enQueue('second');
    expect(queue.getSize()).toBe(2);
    expect(queue.toArray()).toEqual(['first', 'second']);

    expect(queue.deQueue()?.value).toBe('first');
    expect(queue.getSize()).toBe(1);

    queue.enQueue('third');
    expect(queue.getFront()?.value).toBe('second');
    expect(queue.getRear()?.value).toBe('third');

    queue.clear();
    expect(queue.isEmpty()).toBe(true);
    expect(queue.toArray()).toEqual([]);
  });
});
