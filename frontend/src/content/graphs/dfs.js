export const dfsArticle = {
  introduction: [
    "Depth-First Search (DFS) follows a single path to its terminal leaf or cycle before backtracking to explore alternate branches. It processes vertices using Last-In, First-Out (LIFO) semantics, either via runtime call-stack recursion or an explicit stack.",
    "DFS identifies connected components, determines reachability, detects cycles, and generates topological sortings for directed acyclic graphs in O(V + E) time.",
  ],
  complexity: {
    best: { time: "O(V + E)", space: "O(V)" },
    average: { time: "O(V + E)", space: "O(V)" },
    worst: { time: "O(V + E)", space: "O(V)" },
  },
  stepByStep: [
    "Initialize an empty visited set and push the start vertex onto the stack",
    "Pop the top vertex from the stack",
    "If the vertex has not been visited, mark it as visited and process it",
    "Iterate through all adjacent neighbors of the current vertex",
    "For each unvisited neighbor, push it onto the stack and record the parent edge",
    "Repeat until the stack is completely empty",
  ],
  workedExample: {
    headers: ["Step", "Current Vertex", "Stack", "Visited Set", "Action"],
    rows: [
      ["1", "-", "[0]", "{}", "Push start vertex 0 onto stack"],
      ["2", "0", "[2, 1]", "{0}", "Pop 0, mark visited, push neighbors 1 and 2"],
      ["3", "1", "[2, 4, 3]", "{0, 1}", "Pop 1, mark visited, push neighbors 3 and 4"],
      ["4", "3", "[2, 4]", "{0, 1, 3}", "Pop 3, mark visited, no unvisited neighbors"],
      ["5", "4", "[2]", "{0, 1, 3, 4}", "Pop 4, mark visited, no unvisited neighbors"],
      ["6", "2", "[5]", "{0, 1, 2, 3, 4}", "Pop 2, mark visited, push neighbor 5"],
      ["7", "5", "[]", "{0, 1, 2, 3, 4, 5}", "Pop 5, mark visited, stack empty, traversal complete"],
    ],
  },
  tradeoffs: {
    use: [
      "Path finding when any path is sufficient (does not require shortest path)",
      "Cycle detection in directed and undirected graphs",
      "Topological sorting in DAGs and finding strongly connected components",
      "Maze solving and game board state space exploration",
    ],
    avoid: [
      "Finding the shortest path in unweighted graphs (use BFS instead)",
      "Graphs with infinite or extremely deep branches where memory stack depth could overflow",
      "Weighted shortest path calculations (use Dijkstra or Bellman-Ford)",
    ],
  },
  code: {
    python: `def dfs(graph, start):
    visited = set()
    stack = [start]
    order = []
    while stack:
        vertex = stack.pop()
        if vertex not in visited:
            visited.add(vertex)
            order.append(vertex)
            for neighbor in reversed(graph.get(vertex, [])):
                if neighbor not in visited:
                    stack.append(neighbor)
    return order`,
    javascript: `export function dfs(graph, start) {
  const visited = new Set();
  const stack = [start];
  const order = [];
  while (stack.length > 0) {
    const vertex = stack.pop();
    if (!visited.has(vertex)) {
      visited.add(vertex);
      order.push(vertex);
      const neighbors = graph[vertex] || [];
      for (let i = neighbors.length - 1; i >= 0; i--) {
        if (!visited.has(neighbors[i])) {
          stack.push(neighbors[i]);
        }
      }
    }
  }
  return order;
}`,
    java: `import java.util.*;

public class DFS {
    public static List<Integer> traverse(Map<Integer, List<Integer>> graph, int start) {
        Set<Integer> visited = new HashSet<>();
        Deque<Integer> stack = new ArrayDeque<>();
        List<Integer> order = new ArrayList<>();
        stack.push(start);
        while (!stack.isEmpty()) {
            int vertex = stack.pop();
            if (!visited.contains(vertex)) {
                visited.add(vertex);
                order.add(vertex);
                List<Integer> neighbors = graph.getOrDefault(vertex, Collections.emptyList());
                for (int i = neighbors.size() - 1; i >= 0; i--) {
                    if (!visited.contains(neighbors.get(i))) {
                        stack.push(neighbors.get(i));
                    }
                }
            }
        }
        return order;
    }
}`,
    cpp: `#include <vector>
#include <unordered_set>
#include <stack>
#include <unordered_map>

std::vector<int> dfs(const std::unordered_map<int, std::vector<int>>& graph, int start) {
    std::unordered_set<int> visited;
    std::stack<int> s;
    std::vector<int> order;
    s.push(start);
    while (!s.empty()) {
        int vertex = s.top();
        s.pop();
        if (visited.find(vertex) == visited.end()) {
            visited.insert(vertex);
            order.push_back(vertex);
            auto it = graph.find(vertex);
            if (it != graph.end()) {
                const auto& neighbors = it->second;
                for (auto rIt = neighbors.rbegin(); rIt != neighbors.rend(); ++rIt) {
                    if (visited.find(*rIt) == visited.end()) {
                        s.push(*rIt);
                    }
                }
            }
        }
    }
    return order;
}`,
    c: `#include <stdbool.h>
#include <stddef.h>

void dfs_matrix(const int adj[10][10], size_t n, int start, int order[], size_t *count) {
    bool visited[10] = {false};
    int stack[100];
    int top = 0;
    stack[top++] = start;
    *count = 0;
    while (top > 0) {
        int vertex = stack[--top];
        if (!visited[vertex]) {
            visited[vertex] = true;
            order[(*count)++] = vertex;
            for (int i = (int)n - 1; i >= 0; i--) {
                if (adj[vertex][i] && !visited[i]) {
                    stack[top++] = i;
                }
            }
        }
    }
}`,
  },
  faq: [
    {
      q: "Does DFS always find the shortest path?",
      a: "No. DFS explores deeply down arbitrary branches and can return an unnecessarily long path. For unweighted shortest paths, use BFS.",
    },
    {
      q: "When should DFS be implemented iteratively vs. recursively?",
      a: "Recursive DFS is concise and intuitive, but on graphs with more than 10,000 vertices it risks exceeding call stack limits. Iterative DFS using an explicit heap-allocated stack avoids stack overflow.",
    },
    {
      q: "How does DFS detect cycles in directed graphs?",
      a: "By tracking 3 node states: unvisited (white), currently visiting in recursion stack (gray), and finished (black). If an edge points to a gray node, a cycle exists.",
    },
  ],
};

