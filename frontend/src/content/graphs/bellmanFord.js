export const bellmanFordArticle = {
  introduction: [
    "The Bellman-Ford algorithm computes single-source shortest paths on directed graphs with positive or negative edge weights.",
    "Running V - 1 relaxation cycles over all edges guarantees convergence if no negative cycles exist. A final relaxation pass detects negative cycles where paths could decrease infinitely.",
  ],
  complexity: {
    best: { time: "O(E)", space: "O(V)" },
    average: { time: "O(V × E)", space: "O(V)" },
    worst: { time: "O(V × E)", space: "O(V)" },
  },
  stepByStep: [
    "Initialize distance to the source vertex as 0 and all other vertices as infinity",
    "Repeat relaxation over all edges |V| - 1 times",
    "In each pass, for every edge (u, v) with weight w, check if dist[u] + w < dist[v]",
    "If shorter, update dist[v] = dist[u] + w and set parent[v] = u",
    "If no distance updates occur during an entire pass, terminate early (graph is settled)",
    "Perform one final (|V|-th) check over all edges: if any edge can still be relaxed, a negative cycle exists",
  ],
  workedExample: {
    headers: ["Step", "Edge Evaluated", "Weight", "Relaxed?", "Distances Array"],
    rows: [
      ["0", "Initialization", "-", "-", "{A:0, B:∞, C:∞, D:∞}"],
      ["1", "(A, B)", "4", "0 + 4 < ∞ (Yes)", "{A:0, B:4, C:∞, D:∞}"],
      ["2", "(A, C)", "5", "0 + 5 < ∞ (Yes)", "{A:0, B:4, C:5, D:∞}"],
      ["3", "(B, C)", "-3", "4 + (-3) < 5 (Yes)", "{A:0, B:4, C:1, D:∞}"],
      ["4", "(C, D)", "2", "1 + 2 < ∞ (Yes)", "{A:0, B:4, C:1, D:3}"],
      ["5", "Pass 2 check", "-", "No further reductions", "{A:0, B:4, C:1, D:3} (Done)"],
    ],
  },
  tradeoffs: {
    use: [
      "Graphs containing negative edge weights where Dijkstra fails",
      "Detecting negative weight cycles (currency arbitrage in finance)",
      "Distributed routing algorithms like Routing Information Protocol (RIP)",
    ],
    avoid: [
      "Graphs with purely non-negative weights (Dijkstra is much faster at O(E log V))",
      "Dense graphs with large V and E where O(V × E) becomes excessively slow",
    ],
  },
  code: {
    python: `def bellman_ford(vertices, edges, start):
    dist = {v: float('inf') for v in range(vertices)}
    dist[start] = 0
    for _ in range(vertices - 1):
        updated = False
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                updated = True
        if not updated:
            break
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            return None
    return dist`,
    javascript: `export function bellmanFord(numVertices, edges, start) {
  const dist = new Array(numVertices).fill(Infinity);
  dist[start] = 0;
  for (let i = 0; i < numVertices - 1; i++) {
    let updated = false;
    for (const [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        updated = true;
      }
    }
    if (!updated) break;
  }
  for (const [u, v, w] of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      return null;
    }
  }
  return dist;
}`,
    java: `import java.util.*;

public class BellmanFord {
    public static int[] compute(int vertices, int[][] edges, int start) {
        int[] dist = new int[vertices];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[start] = 0;
        for (int i = 0; i < vertices - 1; i++) {
            boolean updated = false;
            for (int[] edge : edges) {
                int u = edge[0], v = edge[1], w = edge[2];
                if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    updated = true;
                }
            }
            if (!updated) break;
        }
        for (int[] edge : edges) {
            int u = edge[0], v = edge[1], w = edge[2];
            if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                return null;
            }
        }
        return dist;
    }
}`,
    cpp: `#include <vector>
#include <tuple>
#include <limits>

std::vector<int> bellmanFord(int vertices, const std::vector<std::tuple<int, int, int>>& edges, int start) {
    const int INF = std::numeric_limits<int>::max();
    std::vector<int> dist(vertices, INF);
    dist[start] = 0;
    for (int i = 0; i < vertices - 1; ++i) {
        bool updated = false;
        for (const auto& [u, v, w] : edges) {
            if (dist[u] != INF && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                updated = true;
            }
        }
        if (!updated) break;
    }
    for (const auto& [u, v, w] : edges) {
        if (dist[u] != INF && dist[u] + w < dist[v]) {
            return {};
        }
    }
    return dist;
}`,
    c: `#include <limits.h>
#include <stdbool.h>
#include <stddef.h>

bool bellman_ford(int vertices, const int edges[][3], size_t edge_count, int start, int dist[]) {
    for (int i = 0; i < vertices; i++) dist[i] = INT_MAX;
    dist[start] = 0;
    for (int i = 0; i < vertices - 1; i++) {
        bool updated = false;
        for (size_t e = 0; e < edge_count; e++) {
            int u = edges[e][0], v = edges[e][1], w = edges[e][2];
            if (dist[u] != INT_MAX && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                updated = true;
            }
        }
        if (!updated) break;
    }
    for (size_t e = 0; e < edge_count; e++) {
        int u = edges[e][0], v = edges[e][1], w = edges[e][2];
        if (dist[u] != INT_MAX && dist[u] + w < dist[v]) {
            return false;
        }
    }
    return true;
}`,
  },
  faq: [
    {
      q: "Why does the algorithm relax edges exactly |V| - 1 times?",
      a: "In a simple graph with |V| vertices, any simple path without cycles contains at most |V| - 1 edges. Therefore, |V| - 1 iterations are sufficient for the shortest distance to propagate across the entire graph.",
    },
    {
      q: "How does Bellman-Ford detect negative cycles?",
      a: "If all simple shortest paths are settled after |V| - 1 iterations, any edge that can still be relaxed on iteration |V| must belong to or be reachable from a negative weight cycle.",
    },
    {
      q: "What is SPFA (Shortest Path Faster Algorithm)?",
      a: "SPFA is a queue-based heuristic optimization of Bellman-Ford that only relaxes edges from vertices whose distances were updated in the previous step.",
    },
  ],
};

