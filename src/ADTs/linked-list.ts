export class ListNode<T = unknown> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

export default class LinkedList<T = unknown> {
  #head: ListNode<T> | null;
  #tail: ListNode<T> | null;
  #size: number;

  constructor() {
    this.#head = null;
    this.#tail = null;
    this.#size = 0;
  }

  insertAtFirst(item: T): void {
    if (this.isEmpty()) {
      this.#head = new ListNode(item);
      this.#tail = this.#head;
    } else {
      const newNode = new ListNode(item);
      newNode.next = this.#head;
      this.#head = newNode;
    }
    this.#size++;
  }

  insertAtEnd(item: T): void {
    if (this.isEmpty()) {
      this.#head = new ListNode(item);
      this.#tail = this.#head;
    } else {
      this.#tail!.next = new ListNode(item);
      this.#tail = this.#tail!.next;
    }
    this.#size++;
  }

  insert(item: T, index?: number): void {
    if (typeof index === 'undefined' || index === this.#size) {
      return this.insertAtEnd(item);
    }

    if (index === 0) {
      return this.insertAtFirst(item);
    }

    if (index < 0 || index > this.#size) {
      throw new Error('Index is out of range');
    }

    let currentNode = this.#head;
    let previousNode: ListNode<T> | null = null;
    let position = 0;

    while (position < index && currentNode) {
      previousNode = currentNode;
      currentNode = currentNode.next;
      position++;
    }

    const newNode = new ListNode(item);
    previousNode!.next = newNode;
    newNode.next = currentNode;
    this.#size++;
  }

  removeFromEnd(): boolean {
    if (this.isEmpty()) {
      return false;
    }

    let previousNode: ListNode<T> | null = null;
    let currentNode = this.#head;

    while (currentNode && currentNode.next) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }

    if (previousNode) {
      previousNode.next = null;
      this.#tail = previousNode;
    } else {
      this.#head = null;
      this.#tail = null;
    }
    this.#size--;
    return true;
  }

  removeFromFirst(): boolean {
    if (this.isEmpty()) return false;
    if (this.#size === 1) {
      this.#head = null;
      this.#tail = null;
    } else {
      const removedNode: ListNode<T> | null = this.#head!;
      this.#head = this.#head?.next ?? null;
      removedNode.next = null; // Remove reference to be Garbage Collected
    }
    this.#size--;
    return true;
  }

  remove(index?: number): boolean {
    if (this.isEmpty()) {
      return false;
    }

    if (typeof index === 'undefined') {
      return this.removeFromEnd();
    }

    if (index < 0 || index > this.#size - 1) {
      return false;
    }

    if (index === 0) {
      return this.removeFromFirst();
    }

    let previousNode = this.#head!;
    let nodeToRemove = this.#head!.next!;
    let position = 1;

    while (position < index && nodeToRemove) {
      previousNode = nodeToRemove;
      nodeToRemove = nodeToRemove.next!;
      position++;
    }

    previousNode.next = nodeToRemove.next;
    nodeToRemove.next = null;
    this.#size--;
    return true;
  }

  isEmpty(): boolean {
    return this.#size === 0;
  }

  toArray(): Array<T> {
    let currentNode = this.#head;
    const resultArray = [];
    while (currentNode) {
      resultArray.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return resultArray;
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

  search(item: T): number {
    let currentNode = this.#head;
    let position = 0;
    while (currentNode) {
      if (currentNode.value === item) return position;
      currentNode = currentNode.next;
      position++;
    }
    return -1;
  }

  *[Symbol.iterator](): Iterator<T> {
    let currentNode = this.#head;
    while (currentNode) {
      yield currentNode.value;
      currentNode = currentNode.next;
    }
  }
}
