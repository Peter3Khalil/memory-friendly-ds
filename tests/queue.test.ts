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
