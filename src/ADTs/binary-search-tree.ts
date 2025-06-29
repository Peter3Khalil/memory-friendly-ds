import Stack from './stack';

class BinaryNode<T = unknown> {
  value: T;
  left: BinaryNode<T> | null;
  right: BinaryNode<T> | null;
  constructor(
    value: T,
    left: BinaryNode<T> | null = null,
    right: BinaryNode<T> | null = null,
  ) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

export default class BinarySearchTree<T = unknown> {
  #root: BinaryNode<T> | null;
  constructor() {
    this.#root = null;
  }

  insert(value: T): void {
    const newNode = new BinaryNode(value);

    if (!this.#root) {
      this.#root = newNode;
      return;
    }

    let curr = this.#root;

    while (true) {
      if (value < curr.value) {
        if (!curr.left) {
          curr.left = newNode;
          return;
        }
        curr = curr.left;
      } else if (value > curr.value) {
        if (!curr.right) {
          curr.right = newNode;
          return;
        }
        curr = curr.right;
      } else return; // No duplicates
    }
  }

  contains(value: T): boolean {
    let current = this.#root;

    while (current !== null) {
      if (current.value === value) {
        return true;
      }

      current = value > current.value ? current.right : current.left;
    }

    return false;
  }

  remove(value: T): void {
    let curr = this.#root;
    let prev: BinaryNode<T> | null = null;

    while (curr) {
      if (curr.value === value) {
        // Case 1: Node with two children
        if (curr.left && curr.right) {
          let successor = curr.right;
          let successorParent: BinaryNode<T> | null = null;

          while (successor.left) {
            successorParent = successor;
            successor = successor.left;
          }

          curr.value = successor.value;

          if (successorParent) {
            successorParent.left = successor.right;
          } else {
            curr.right = successor.right;
          }

          return;
        }

        // Case 2: Node with one child or no child
        const child = curr.left ?? curr.right;

        if (!prev) {
          this.#root = child;
        } else if (prev.left === curr) {
          prev.left = child;
        } else {
          prev.right = child;
        }

        return;
      }

      prev = curr;
      curr = value < curr.value ? curr.left : curr.right;
    }
  }

  findMin(): T | null {
    let currentNode = this.#root;
    while (currentNode && currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode?.value ?? null;
  }

  findMax(): T | null {
    let currentNode = this.#root;
    while (currentNode && currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode?.value ?? null;
  }

  inOrder(): T[] {
    const stack = new Stack<BinaryNode<T>>();
    let curr = this.#root;
    const res: T[] = [];
    while (stack.getSize() > 0 || curr) {
      while (curr) {
        stack.push(curr);
        curr = curr.left;
      }
      curr = stack.pop();
      res.push(curr.value);
      curr = curr.right;
    }

    return res;
  }

  postOrder(): T[] {
    const res: T[] = [];
    const stack: Stack<BinaryNode<T>> = new Stack();
    let curr = this.#root;
    let lastVisited: BinaryNode<T> | null = null;

    while (stack.getSize() > 0 || curr) {
      if (curr) {
        stack.push(curr);
        curr = curr.left;
      } else {
        const peekNode = stack.getTop();

        if (peekNode.right && lastVisited !== peekNode.right) {
          curr = peekNode.right;
        } else {
          res.push(peekNode.value);
          lastVisited = stack.pop();
        }
      }
    }

    return res;
  }
}
