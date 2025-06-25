# Memory-Friendly Data Structures

A TypeScript library that provides memory-efficient implementations of common data structures.

[![npm version](https://img.shields.io/npm/v/memory-friendly-ds.svg)](https://www.npmjs.com/package/memory-friendly-ds)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Overview

`memory-friendly-ds` is a collection of memory-optimized data structures implemented in TypeScript. The library provides type-safe, efficient implementations of fundamental Abstract Data Types (ADTs) that minimize memory overhead while maintaining optimal performance.

## Installation

```bash
npm install memory-friendly-ds
```

or

```bash
yarn add memory-friendly-ds
```

## Features

- **Type Safety**: Full TypeScript support with generic types
- **Memory Efficient**: Optimized implementations to reduce memory footprint
- **Thoroughly Tested**: Comprehensive test suite for reliability
- **Simple API**: Clean, intuitive interfaces for easy integration

## Available Data Structures

### LinkedList

A singly linked list implementation with methods for insertion, deletion, and traversal.

```typescript
import { LinkedList } from 'memory-friendly-ds';

// Create a new linked list
const list = new LinkedList<number>();

// Add elements
list.insertAtEnd(1);
list.insertAtEnd(2);
list.insertAtEnd(3);

// Insert at specific positions
list.insertAtFirst(0);
list.insert(1.5, 2);

// Remove elements
list.removeFromFirst();
list.removeFromEnd();
list.removeAt(1);

// Access elements
const head = list.getHead();
const tail = list.getTail();
const size = list.getSize();

// Convert to array
const array = list.toArray();
```

### Queue

A FIFO (First-In-First-Out) queue implementation based on the LinkedList.

```typescript
import { Queue } from 'memory-friendly-ds';

// Create a new queue
const queue = new Queue<string>();

// Add elements
queue.enQueue('first');
queue.enQueue('second');
queue.enQueue('third');

// Remove elements
const item = queue.deQueue();

// Access elements
const front = queue.getFront();
const rear = queue.getRear();
const size = queue.getSize();

// Check if empty
if (!queue.isEmpty()) {
  // Process queue
}

// Convert to array
const array = queue.toArray();

// Clear the queue
queue.clear();
```

## Development

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/Peter3Khalil/memory-friendly-ds.git
cd memory-friendly-ds

# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build
```

### Scripts

- `npm run clean` - Remove the dist directory
- `npm run build` - Build the project
- `npm run start` - Build and run the project
- `npm run test` - Run tests
- `npm run report` - Open test coverage report
- `npm run format` - Format all TypeScript files

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
