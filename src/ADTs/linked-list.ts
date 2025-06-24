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

  insertAtFirst(item: T): void {
    if (this.isEmpty()) {
      this.#head = new ListNode(item);
      this.#tail = this.#head;
    } else {
      let node = new ListNode(item);
      node.next = this.#head;
      this.#head = node;
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
    if (typeof index === 'undefined' || index === this.#size)
      return this.insertAtEnd(item);
    else if (index === 0) return this.insertAtFirst(item);
    else if (index > 0 && index < this.#size) {
      let curr = this.#head;
      let prev: ListNode<T> | null = null;
      let i = 0;
      while (i < index && curr) {
        prev = curr;
        curr = curr.next;
        i++;
      }
      let node = new ListNode(item);
      prev!.next = node;
      node.next = curr;
      this.#size++;
    } else {
      throw new Error('Index is out of range');
    }
  }

  removeFromEnd(): boolean {
    if (this.isEmpty()) return false;
    let prev: ListNode<T> | null = null,
      curr = this.#head;
    while (curr && curr.next) {
      prev = curr;
      curr = curr.next;
    }
    if (prev) {
      prev.next = null;
      this.#tail = prev;
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
      let temp: ListNode<T> | null = this.#head!;
      this.#head = this.#head?.next ?? null;
      temp.next = null;
    }
    this.#size--;
    return true;
  }

  remove(index?: number): boolean {
    if (this.isEmpty()) return false;
    else if (typeof index === 'undefined') return this.removeFromEnd();
    else if (index < 0 || index > this.#size - 1) return false;
    else if (index === 0) return this.removeFromFirst();
    else {
      let prev = this.#head!;
      let curr = this.#head!.next!;
      let i = 1;
      while (i < index && curr) {
        prev = curr;
        curr = curr.next!;
        i++;
      }
      prev.next = curr.next;
      curr.next = null;
      this.#size--;
      return true;
    }
  }

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
