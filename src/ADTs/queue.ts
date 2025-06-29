import LinkedList from './linked-list';

export default class Queue<T = unknown> {
  #list: LinkedList<T>;
  constructor() {
    this.#list = new LinkedList<T>();
  }

  enQueue(item: T): void {
    this.#list.insertAtEnd(item);
  }
  deQueue(): T | null {
    const item = this.getFront();
    this.#list.removeFromFirst();
    return item;
  }
  isEmpty(): boolean {
    return this.#list.isEmpty();
  }
  getFront(): T | null {
    return this.#list.getHead();
  }
  getRear(): T | null {
    return this.#list.getTail();
  }
  getSize(): number {
    return this.#list.getSize();
  }
  toArray(): T[] {
    return this.#list.toArray();
  }
  clear(): void {
    this.#list = new LinkedList<T>();
  }
}
