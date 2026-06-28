# binary-tree-visualizer

Insert, delete, and search nodes in a Binary Search Tree. Traversal animations show the order of visited nodes.

## Traversals

- **In-order** (left → root → right) — produces sorted output for a BST
- **Pre-order** (root → left → right) — useful for copying the tree
- **Post-order** (left → right → root) — useful for deletion
- **BFS** — level by level, left to right

## Features

- Insert nodes by typing a value and pressing Enter
- Delete any node (handles all three cases: leaf, one child, two children)
- Animated traversal with highlighted path
- Tree auto-balances layout after each operation
- Reset button

## Run

```bash
npm install
npm run dev
```

## Notes

This is a plain BST, not a self-balancing one. If you insert values in sorted order (1, 2, 3, 4...) it degenerates into a linked list. That is actually a useful thing to visualize.