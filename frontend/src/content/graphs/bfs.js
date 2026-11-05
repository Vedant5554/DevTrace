export const bfsArticle = {
  introduction: [
    "Breadth-First Search (BFS) traverses a graph layer by layer, visiting every neighbor at distance k before moving to vertices at distance k + 1. It tracks discovery order with a First-In, First-Out (FIFO) queue.",
    "On unweighted graphs, the first time BFS reaches a destination vertex, that path contains the minimum number of edges. This makes BFS an exact single-source shortest path algorithm when edge weights are uniform.",
  ],
  complexity: {
    best: { time: "O(V + E)", space: "O(V)" },
    average: { time: "O(V + E)", space: "O(V)" },
    worst: { time: "O(V + E)", space: "O(V)" },
  },
  stepByStep: [
    "Initialize an empty queue and enqueue the start vertex",
    "Mark the start vertex as visited to prevent duplicate processing",
    "While the queue is not empty, dequeue the front vertex",
    "Process the dequeued vertex",
    "Iterate through all adjacent neighbors of the current vertex",
    "For each neighbor that has not yet been visited, mark it as visited, record its parent, and enqueue it",
    "Repeat until the queue is exhausted or the target vertex is dequeued",
  ],
  workedExample: {
    headers: ["Step", "Current", "Queue State", "Visited Set", "Action"],
    rows: [
      ["1", "-", "[0]", "{0}", "Enqueue start vertex 0, mark visited"],
      ["2", "0", "[1, 2]", "{0, 1, 2}", "Dequeue 0; enqueue unvisited neighbors 1 and 2"],
      ["3", "1", "[2, 3, 4]", "{0, 1, 2, 3, 4}", "Dequeue 1; enqueue neighbors 3 and 4"],
      ["4", "2", "[3, 4, 5]", "{0, 1, 2, 3, 4, 5}", "Dequeue 2; enqueue neighbor 5"],
      ["5", "3", "[4, 5]", "{0, 1, 2, 3, 4, 5}", "Dequeue 3; no new unvisited neighbors"],
      ["6", "4", "[5]", "{0, 1, 2, 3, 4, 5}", "Dequeue 4; no new unvisited neighbors"],
      ["7", "5", "[]", "{0, 1, 2, 3, 4, 5}", "Dequeue 5; queue empty, traversal complete"],
    ],
  },
  tradeoffs: {
    use: [
      "Finding the shortest path on unweighted graphs or grids",
      "Finding connected components and level-order tree traversal",
      "Finding all nodes within k hops of a starting vertex (e.g. social network distance)",
      "Testing bipartiteness of an undirected graph",
    ],
    avoid: [
      "Graphs with weighted edges (use Dijkstra or Bellman-Ford)",
      "High-branching factor trees or game states where queue memory grows exponentially (O(b^d))",
      "Problems requiring exhaustive path backtracking or topological sorting (use DFS)",
    ],
  },
  code: {
    python: `from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    order = []
    while queue:
        vertex = queue.popleft()
        order.append(vertex)
        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order`,
    javascript: `export function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length > 0) {
    const vertex = queue.shift();
    order.push(vertex);
    const neighbors = graph[vertex] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}`,
    java: `import java.util.*;

public class BFS {
    public static List<Integer> traverse(Map<Integer, List<Integer>> graph, int start) {
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new ArrayDeque<>();
        List<Integer> order = new ArrayList<>();
        visited.add(start);
        queue.add(start);
        while (!queue.isEmpty()) {
            int vertex = queue.poll();
            order.add(vertex);
            for (int neighbor : graph.getOrDefault(vertex, Collections.emptyList())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.add(neighbor);
                }
            }
        }
        return order;
    }
}`,
    cpp: `#include <vector>
#include <unordered_set>
#include <queue>
#include <unordered_map>

std::vector<int> bfs(const std::unordered_map<int, std::vector<int>>& graph, int start) {
    std::unordered_set<int> visited;
    std::queue<int> q;
    std::vector<int> order;
    visited.insert(start);
    q.push(start);
    while (!q.empty()) {
        int vertex = q.front();
        q.pop();
        order.push_back(vertex);
        auto it = graph.find(vertex);
        if (it != graph.end()) {
            for (int neighbor : it->second) {
                if (visited.find(neighbor) == visited.end()) {
                    visited.insert(neighbor);
                    q.push(neighbor);
                }
            }
        }
    }
    return order;
}`,
    c: `#include <stdbool.h>
#include <stddef.h>

void bfs_matrix(const int adj[10][10], size_t n, int start, int order[], size_t *count) {
    bool visited[10] = {false};
    int queue[100];
    int head = 0, tail = 0;
    visited[start] = true;
    queue[tail++] = start;
    *count = 0;
    while (head < tail) {
        int vertex = queue[head++];
        order[(*count)++] = vertex;
        for (size_t i = 0; i < n; i++) {
            if (adj[vertex][i] && !visited[i]) {
                visited[i] = true;
                queue[tail++] = (int)i;
            }
        }
    }
}`,
  },
  faq: [
    {
      q: "Why mark vertices as visited on enqueue instead of dequeue?",
      a: "Marking on enqueue prevents the same vertex from being added to the queue multiple times by different neighbors, preventing memory explosion and redundant checks.",
    },
    {
      q: "How do you reconstruct the actual shortest path with BFS?",
      a: "Maintain a parent array or map where parent[neighbor] = current vertex. Once destination is reached, trace backwards from destination to start and reverse the list.",
    },
    {
      q: "Can BFS handle edge weights?",
      a: "Only uniform weights. If edges have varying non-negative weights, use Dijkstra's Algorithm.",
    },
  ],
};

