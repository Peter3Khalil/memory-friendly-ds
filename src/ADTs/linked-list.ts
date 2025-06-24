class ListNode<T = any> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

export default class LinkedList<T = any> {
  #head: ListNode<T> | null;
  #tail: ListNode<T> | null;
  #size: number;

  constructor() {
    this.#head = null;
    this.#tail = null;
    this.#size = 0;
  }

  insertAtFirst(item: T): void {}

  insertAtEnd(item: T): void {}

  insert(item: T, index?: number): void {}

  isEmpty(): boolean {
    return this.#size === 0;
  }

  toArray(): Array<T> {
    let curr = this.#head;
    const arr = [];
    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }
    return arr;
  }

  getHead(): ListNode<T> | null {
    return this.#head;
  }

  getTail(): ListNode<T> | null {
    return this.#tail;
  }

  getSize(): number {
    return this.#size;
  }
}
