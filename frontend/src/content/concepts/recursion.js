export const recursionArticle = {
  introduction: [
    "Recursion is a foundational programming and mathematical concept where a function solves a problem by calling itself with smaller or simplified instances of the same problem. Every recursive algorithm relies on two essential parts: a base case that halts recursion and a recursive step that reduces the problem.",
    "When a function calls itself, a new execution stack frame is placed on the program's runtime call stack, storing local variables, arguments, and the return address. When the base case is satisfied, the stack unwinds in reverse order, returning accumulated results back up the call chain.",
  ],
  complexity: {
    best: { time: "O(1)", space: "O(1)" },
    average: { time: "O(n)", space: "O(n)" },
    worst: { time: "O(n)", space: "O(n)" },
  },
  stepByStep: [
    "Invoke the recursive function with initial argument n",
    "Evaluate the base case condition (e.g., if n <= 0)",
    "If base case is met, return the terminal constant (0) without further function calls",
    "If base case is false, push current frame onto the call stack and invoke function with modified argument (n - 1)",
    "Repeat until deepest invocation triggers base case",
    "Unwind the call stack, computing return values and popping activation frames until the original caller finishes",
  ],
  workedExample: {
    headers: ["Call Depth", "Function Call", "Base Case Met?", "Action", "Return Value"],
    rows: [
      ["1", "sum(4)", "No (4 > 0)", "Push frame, await 4 + sum(3)", "Pending... (10)"],
      ["2", "sum(3)", "No (3 > 0)", "Push frame, await 3 + sum(2)", "Pending... (6)"],
      ["3", "sum(2)", "No (2 > 0)", "Push frame, await 2 + sum(1)", "Pending... (3)"],
      ["4", "sum(1)", "No (1 > 0)", "Push frame, await 1 + sum(0)", "Pending... (1)"],
      ["5", "sum(0)", "Yes (0 <= 0)", "Base case reached, start unwinding", "0"],
      ["4", "sum(1)", "Unwinding", "Compute 1 + 0", "1"],
      ["3", "sum(2)", "Unwinding", "Compute 2 + 1", "3"],
      ["2", "sum(3)", "Unwinding", "Compute 3 + 3", "6"],
      ["1", "sum(4)", "Unwinding", "Compute 4 + 6", "10"],
    ],
  },
  tradeoffs: {
    use: [
      "Problems with self-similar recursive substructures (tree traversals, divide-and-conquer, backtracking)",
      "Graph traversals like DFS and Topological Sort where stack mechanics mirror call frames",
      "Expressing mathematical definitions (permutations, combinations, tree paths) with clean, declarative logic",
    ],
    avoid: [
      "Deep recursion with potential stack depth exceeding stack frame memory (risking stack overflow)",
      "Performance-critical loops where iterative approaches avoid stack frame allocation overhead",
      "Overlapping subproblems without memoization (e.g., naive Fibonacci running in O(2^n))",
    ],
  },
  code: {
    python: `def sum_to_n(n):
    if n <= 0:
        return 0
    return n + sum_to_n(n - 1)`,
    javascript: `export function sumToN(n) {
  if (n <= 0) {
    return 0;
  }
  return n + sumToN(n - 1);
}`,
    java: `public class Recursion {
    public static long sumToN(int n) {
        if (n <= 0) {
            return 0;
        }
        return n + sumToN(n - 1);
    }
}`,
    cpp: `long long sumToN(int n) {
    if (n <= 0) {
        return 0;
    }
    return n + sumToN(n - 1);
}`,
    c: `long long sumToN(int n) {
    if (n <= 0) {
        return 0;
    }
    return n + sumToN(n - 1);
}`,
  },
  faq: [
    {
      q: "What is a Stack Overflow error?",
      a: "A stack overflow occurs when recursive calls continue without hitting a base case (infinite recursion) or when the recursion depth exceeds the maximum call stack memory allocated by the runtime.",
    },
    {
      q: "What is tail recursion?",
      a: "Tail recursion is a form of recursion where the recursive call is the final operation in the function. Compilers supporting Tail Call Optimization (TCO) reuse the current stack frame, eliminating stack overflow risk.",
    },
    {
      q: "Can every recursive function be written iteratively?",
      a: "Yes. Any recursive algorithm can be converted into an iterative loop, either directly or by explicitly maintaining an in-memory stack data structure.",
    },
  ],
};
