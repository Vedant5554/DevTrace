export const topologicalSortArticle = {
  introduction: [
    "Topological Sort is a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge (u, v), vertex u comes before vertex v in the ordering.",
    "Topological sorting is the foundational algorithm behind dependency resolution engines, build systems (such as Make or Gradle), course prerequisite planning, and task scheduling pipelines. If the graph contains a directed cycle, no topological order exists.",
  ],
  complexity: {
    best: { time: "O(V + E)", space: "O(V)" },
    average: { time: "O(V + E)", space: "O(V)" },
    worst: { time: "O(V + E)", space: "O(V)" },
  },
  stepByStep: [
    "Compute the in-degree (number of incoming edges) for every vertex in the graph",
    "Initialize an empty queue and enqueue all vertices with an in-degree of 0",
    "Initialize a counter of visited vertices to 0 and an empty result list",
    "While the queue is not empty, dequeue a vertex u and append it to the result list",
    "Increment the visited counter by 1",
    "For each adjacent outgoing neighbor v of u, decrement its in-degree by 1",
    "If neighbor v's in-degree drops to 0, enqueue it",
    "If the visited counter equals the total number of vertices, return the ordering; otherwise, the graph contains a cycle",
  ],
  workedExample: {
    headers: ["Step", "Dequeued", "Queue (In-Degree 0)", "In-Degrees State", "Result Order"],
    rows: [
      ["1", "-", "[5, 4]", "{0:2, 1:1, 2:2, 3:1, 4:0, 5:0}", "[]"],
      ["2", "5", "[4, 2, 0]", "{0:1, 1:1, 2:0, 3:1, 4:0, 5:0}", "[5]"],
      ["3", "4", "[2, 0, 1]", "{0:0, 1:0, 2:0, 3:1, 4:0, 5:0}", "[5, 4]"],
      ["4", "2", "[0, 1, 3]", "{0:0, 1:0, 2:0, 3:0, 4:0, 5:0}", "[5, 4, 2]"],
      ["5", "0", "[1, 3]", "{0:0, 1:0, 2:0, 3:0, 4:0, 5:0}", "[5, 4, 2, 0]"],
      ["6", "1", "[3]", "{0:0, 1:0, 2:0, 3:0, 4:0, 5:0}", "[5, 4, 2, 0, 1]"],
      ["7", "3", "[]", "{0:0, 1:0, 2:0, 3:0, 4:0, 5:0}", "[5, 4, 2, 0, 1, 3]"],
    ],
  },
  tradeoffs: {
    use: [
      "Dependency resolution in package managers (npm, pip, cargo) and build systems",
      "Scheduling interdependent tasks and jobs with strict prerequisite constraints",
      "Deadlock and cycle detection in dependency graphs",
      "Critical path analysis in project management",
    ],
    avoid: [
      "Undirected graphs (topological sort requires directed edges)",
      "Graphs with cycles (Kahn's algorithm detects cycles by returning fewer vertices than V)",
    ],
  },
  code: {
    python: `from collections import deque

def topological_sort(vertices, edges):
    in_degree = {v: 0 for v in range(vertices)}
    adj = {v: [] for v in range(vertices)}
    for u, v in edges:
        adj[u].append(v)
        in_degree[v] += 1
    queue = deque([v for v in range(vertices) if in_degree[v] == 0])
    order = []
    while queue:
        u = queue.popleft()
        order.append(u)
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
    if len(order) == vertices:
        return order
    return []`,
    javascript: `export function topologicalSort(numVertices, edges) {
  const inDegree = new Array(numVertices).fill(0);
  const adj = Array.from({ length: numVertices }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    inDegree[v]++;
  }
  const queue = [];
  for (let i = 0; i < numVertices; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  const order = [];
  while (queue.length > 0) {
    const u = queue.shift();
    order.push(u);
    for (const v of adj[u]) {
      inDegree[v]--;
      if (inDegree[v] === 0) queue.push(v);
    }
  }
  return order.length === numVertices ? order : [];
}`,
    java: `import java.util.*;

public class TopologicalSort {
    public static List<Integer> sort(int vertices, int[][] edges) {
        int[] inDegree = new int[vertices];
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < vertices; i++) adj.add(new ArrayList<>());
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            inDegree[edge[1]]++;
        }
        Queue<Integer> queue = new ArrayDeque<>();
        for (int i = 0; i < vertices; i++) {
            if (inDegree[i] == 0) queue.add(i);
        }
        List<Integer> order = new ArrayList<>();
        while (!queue.isEmpty()) {
            int u = queue.poll();
            order.add(u);
            for (int v : adj.get(u)) {
                if (--inDegree[v] == 0) queue.add(v);
            }
        }
        return order.size() == vertices ? order : Collections.emptyList();
    }
}`,
    cpp: `#include <vector>
#include <queue>

std::vector<int> topologicalSort(int vertices, const std::vector<std::pair<int, int>>& edges) {
    std::vector<int> inDegree(vertices, 0);
    std::vector<std::vector<int>> adj(vertices);
    for (const auto& edge : edges) {
        adj[edge.first].push_back(edge.second);
        inDegree[edge.second]++;
    }
    std::queue<int> q;
    for (int i = 0; i < vertices; ++i) {
        if (inDegree[i] == 0) q.push(i);
    }
    std::vector<int> order;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        order.push_back(u);
        for (int v : adj[u]) {
            if (--inDegree[v] == 0) q.push(v);
        }
    }
    if (order.size() == static_cast<size_t>(vertices)) {
        return order;
    }
    return {};
}`,
    c: `#include <stdbool.h>
#include <stddef.h>

bool topological_sort(int vertices, const int edges[][2], size_t edge_count, int order[]) {
    int in_degree[100] = {0};
    int adj[100][100] = {0};
    int adj_size[100] = {0};
    for (size_t i = 0; i < edge_count; i++) {
        int u = edges[i][0];
        int v = edges[i][1];
        adj[u][adj_size[u]++] = v;
        in_degree[v]++;
    }
    int queue[100];
    int head = 0, tail = 0;
    for (int i = 0; i < vertices; i++) {
        if (in_degree[i] == 0) queue[tail++] = i;
    }
    int count = 0;
    while (head < tail) {
        int u = queue[head++];
        order[count++] = u;
        for (int i = 0; i < adj_size[u]; i++) {
            int v = adj[u][i];
            if (--in_degree[v] == 0) queue[tail++] = v;
        }
    }
    return count == vertices;
}`,
  },
  faq: [
    {
      q: "Can a graph have multiple valid topological sort orderings?",
      a: "Yes. Whenever multiple vertices have an in-degree of 0 at the same time, any choice among them is valid, yielding multiple permutations.",
    },
    {
      q: "How does Kahn's algorithm differ from DFS topological sort?",
      a: "Kahn's algorithm uses in-degree counting with a queue, naturally detecting cycles when the queue empties early. DFS uses post-order reversal with recursion call stack.",
    },
    {
      q: "What does an empty result indicate?",
      a: "An empty result indicates the graph contains at least one directed cycle, making a linear dependency ordering impossible.",
    },
  ],
};

