export const queueArticle = {
  introduction: [
    "A Queue is a linear data structure that follows the First-In, First-Out (FIFO) principle. Elements are added at the rear (enqueue) and removed from the front (dequeue).",
    "Common real-world applications include printer spooling, process scheduling in operating systems, and Breadth-First Search (BFS)."
  ],
  complexity: {
    best: { time: "O(1)", space: "O(n)" },
    average: { time: "O(1)", space: "O(n)" },
    worst: { time: "O(1)", space: "O(n)" },
  },
  stepByStep: [
    "Enqueue: Add an element to the rear of the queue",
    "Dequeue: Remove the element from the front of the queue",
    "Front/Peek: Inspect the front element without removing it",
  ],
  workedExample: {
    headers: ["Step", "Operation", "Front", "Rear", "Queue Elements"],
    rows: [
      ["1", "enqueue(23)", "23", "23", "[23]"],
      ["2", "enqueue(49)", "23", "49", "[23, 49]"],
      ["3", "enqueue(60)", "23", "60", "[23, 49, 60]"],
      ["4", "dequeue() -> 23", "49", "60", "[49, 60]"],
    ]
  },
  tradeoffs: {
    use: ["Level-order traversal (BFS)", "Buffer management and streaming", "Task scheduling"],
    avoid: ["LIFO requirements (use Stack)", "Frequent insertions in middle (use Linked List)"]
  },
  code: {
    python: `from collections import deque
queue = deque()
def enqueue(value):
    queue.append(value)
def dequeue():
    return queue.popleft()`,
    javascript: `class Queue {
  constructor() { this.items = []; }
  enqueue(val) { this.items.push(val); }
  dequeue() { return this.items.shift(); }
}`,
    java: `Queue<Integer> q = new LinkedList<>();
q.offer(value);
q.poll();`,
    cpp: `std::queue<int> q;
q.push(value);
q.pop();`,
    c: `int queue[100]; int front = 0, rear = 0;
void enqueue(int x) { queue[rear++] = x; }
int dequeue() { return queue[front++]; }`
  },
  faqs: [
    { question: "Why use deque in Python instead of list for queues?", answer: "deque offers O(1) pops from the left, while list.pop(0) is O(n)." }
  ]
};

