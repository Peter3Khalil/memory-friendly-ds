import LinkedList from './linked-list';

class ListNode<T = unknown> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

export default class Queue<T = unknown> {
  #list: LinkedList<T>;
  constructor() {
    this.#list = new LinkedList<T>();
  }

  enQueue(item: T): void {
    this.#list.insertAtEnd(item);
  }
  deQueue(): ListNode<T> | null {
    let item = this.getFront();
    this.#list.removeFromFirst();
    return item;
  }
  isEmpty(): boolean {
    return this.#list.isEmpty();
  }
  getFront(): ListNode<T> | null {
    return this.#list.getHead();
  }
  getRear(): ListNode<T> | null {
    return this.#list.getTail();
  }
  getSize(): number {
    return this.#list.getSize();
  }
  toArray(): T[] {
    return this.#list.toArray();
  }
  clear(): void {
    throw new Error('Method not implemented.');
  }
}
