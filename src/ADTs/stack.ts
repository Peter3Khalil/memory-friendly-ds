import LinkedList from './linked-list';

export default class Stack<T = unknown> {
  #list: LinkedList<T>;
  constructor() {
    this.#list = new LinkedList<T>();
  }

  push(item: T): void {
    this.#list.insertAtFirst(item);
  }

  pop(): T | null {
    const removedNode = this.#list.getHead();
    this.#list.removeFromFirst();
    return removedNode;
  }

  getTop(): T | null {
    return this.#list.getHead();
  }

  getSize(): number {
    return this.#list.getSize();
  }

  isEmpty(): boolean {
    return this.#list.isEmpty();
  }

  clear(): void {
    this.#list = new LinkedList<T>();
  }

  toArray(): Array<T> {
    return this.#list.toArray();
  }
}
