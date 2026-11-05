export const stackArticle = {
  introduction: [
    "A Stack is a linear data structure that follows the Last-In, First-Out (LIFO) principle. Elements can only be added or removed from the top of the stack.",
    "Common real-world uses include function call stacks, undo/redo mechanisms in text editors, and syntax parsing/expression evaluation."
  ],
  complexity: {
    best: { time: "O(1)", space: "O(n)" },
    average: { time: "O(1)", space: "O(n)" },
    worst: { time: "O(1)", space: "O(n)" },
  },
  stepByStep: [
    "Push: Place a new element onto the top of the stack",
    "Pop: Remove the topmost element from the stack",
    "Peek: Inspect the top element without removing it",
  ],
  workedExample: {
    headers: ["Step", "Operation", "Top", "Stack Elements"],
    rows: [
      ["1", "push(78)", "78", "[78]"],
      ["2", "push(50)", "50", "[78, 50]"],
      ["3", "push(34)", "34", "[78, 50, 34]"],
      ["4", "pop() -> 34", "50", "[78, 50]"],
    ]
  },
  tradeoffs: {
    use: ["Backtracking problems (DFS)", "Undo/redo history tracking", "Call stack emulation"],
    avoid: ["When random access by index is needed (use Arrays)", "FIFO scenarios (use Queues)"]
  },
  code: {
    python: `stack = []
def push(value):
    stack.append(value)
def pop():
    return stack.pop()`,
    javascript: `const stack = [];
function push(value) { stack.push(value); }
function pop() { return stack.pop(); }`,
    java: `Stack<Integer> stack = new Stack<>();
stack.push(value);
stack.pop();`,
    cpp: `std::stack<int> s;
s.push(value);
s.pop();`,
    c: `int stack[100]; int top = -1;
void push(int x) { stack[++top] = x; }
int pop() { return stack[top--]; }`
  },
  faqs: [
    { question: "What is stack overflow?", answer: "When more elements are pushed than the stack memory capacity allows." }
  ]
};

