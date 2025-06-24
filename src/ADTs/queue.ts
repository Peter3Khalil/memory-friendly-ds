class ListNode<T = unknown> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

export default class Queue<T = unknown> {
  #front: ListNode<T> | null;
  #rear: ListNode<T> | null;
  #size: number;
  constructor() {
    this.#front = null;
    this.#rear = null;
    this.#size = 0;
  }

  enQueue(item: T): void {
    if (this.isEmpty()) {
      this.#front = new ListNode(item);
      this.#rear = this.#front;
    } else {
      this.#rear!.next = new ListNode(item);
      this.#rear = this.#rear!.next;
    }
    this.#size++;
  }
  deQueue(): boolean {
    throw new Error('Method not implemented.');
  }
  isEmpty(): boolean {
    return this.#size === 0;
  }
  getFront(): ListNode<T> | null {
    return this.#front;
  }
  getRear(): ListNode<T> | null {
    return this.#rear;
  }
  getSize(): number {
    return this.#size;
  }
  toArray(): T[] {
    let arr = [];
    let currentNode = this.#front;
    while (currentNode) {
      arr.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return arr;
  }
  clear(): void {
    throw new Error('Method not implemented.');
  }
}
