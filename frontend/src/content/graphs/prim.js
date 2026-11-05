export const primArticle = {
  introduction: [
    "Prim's Algorithm is a greedy algorithm that finds a Minimum Spanning Tree (MST) for a weighted, undirected graph. Starting from an arbitrary root vertex, it grows the spanning tree one vertex at a time.",
    "At every iteration, Prim's algorithm examines all edges connecting the vertices currently in the tree to vertices outside the tree, greedily selecting the edge with the lowest weight. This guarantees that the growing subgraph remains connected at all times.",
  ],
  complexity: {
    best: { time: "O(E log V)", space: "O(V)" },
    average: { time: "O(E log V)", space: "O(V)" },
    worst: { time: "O(E log V)", space: "O(V)" },
  },
  stepByStep: [
    "Select an arbitrary starting vertex and add it to the visited set",
    "Insert all edges incident to the starting vertex into a min-priority queue",
    "While the priority queue is not empty and the tree has not spanned all vertices:",
    "Extract the minimum weight edge (u, v, weight) from the priority queue",
    "If destination vertex v is already in the visited set, discard the edge (prevents cycle)",
    "Otherwise, add edge (u, v) to the MST and mark vertex v as visited",
    "Add all edges incident to vertex v that connect to unvisited vertices into the priority queue",
    "Repeat until all reachable vertices are connected in the spanning tree",
  ],
  workedExample: {
    headers: ["Step", "Added Edge", "Weight", "Connected Vertex", "Visited Set"],
    rows: [
      ["1", "-", "-", "0 (Start)", "{0}"],
      ["2", "(0, 2)", "1", "2", "{0, 2}"],
      ["3", "(2, 1)", "2", "1", "{0, 1, 2}"],
      ["4", "(1, 3)", "1", "3", "{0, 1, 2, 3}"],
      ["5", "All nodes spanned", "-", "-", "{0, 1, 2, 3} (Complete)"],
    ],
  },
  tradeoffs: {
    use: [
      "Dense graphs where E is close to V^2 (using an adjacency matrix runs in O(V^2))",
      "Network routing and physical pipeline layouts requiring a single connected tree growing outward",
      "When edge lists are not readily pre-sorted",
    ],
    avoid: [
      "Sparse graphs with few edges (Kruskal's algorithm with edge sorting is generally simpler and faster)",
      "Disconnected graphs without handling each connected component separately",
    ],
  },
  code: {
    python: `import heapq

def prim(vertices, adj, start=0):
    visited = set()
    mst = []
    pq = [(0, start, -1)]
    while pq and len(visited) < vertices:
        weight, u, parent = heapq.heappop(pq)
        if u in visited:
            continue
        visited.add(u)
        if parent != -1:
            mst.append((parent, u, weight))
        for v, w in adj.get(u, []):
            if v not in visited:
                heapq.heappush(pq, (w, v, u))
    return mst`,
    javascript: `export function prim(numVertices, adj, start = 0) {
  const visited = new Set();
  const mst = [];
  const pq = [[0, start, -1]];
  while (pq.length > 0 && visited.size < numVertices) {
    pq.sort((a, b) => a[0] - b[0]);
    const [weight, u, parent] = pq.shift();
    if (visited.has(u)) continue;
    visited.add(u);
    if (parent !== -1) {
      mst.push([parent, u, weight]);
    }
    const neighbors = adj[u] || [];
    for (const [v, w] of neighbors) {
      if (!visited.has(v)) {
        pq.push([w, v, u]);
      }
    }
  }
  return mst;
}`,
    java: `import java.util.*;

public class Prim {
    record Edge(int to, int weight) {}
    record Node(int weight, int vertex, int parent) implements Comparable<Node> {
        public int compareTo(Node o) { return Integer.compare(this.weight, o.weight); }
    }
    public static List<int[]> compute(int vertices, Map<Integer, List<Edge>> adj, int start) {
        Set<Integer> visited = new HashSet<>();
        List<int[]> mst = new ArrayList<>();
        PriorityQueue<Node> pq = new PriorityQueue<>();
        pq.add(new Node(0, start, -1));
        while (!pq.isEmpty() && visited.size() < vertices) {
            Node curr = pq.poll();
            if (visited.contains(curr.vertex)) continue;
            visited.add(curr.vertex);
            if (curr.parent != -1) {
                mst.add(new int[]{curr.parent, curr.vertex, curr.weight});
            }
            for (Edge edge : adj.getOrDefault(curr.vertex, Collections.emptyList())) {
                if (!visited.contains(edge.to)) {
                    pq.add(new Node(edge.weight, edge.to, curr.vertex));
                }
            }
        }
        return mst;
    }
}`,
    cpp: `#include <vector>
#include <queue>
#include <unordered_set>
#include <unordered_map>
#include <tuple>

using EdgeTuple = std::tuple<int, int, int>; // weight, vertex, parent

std::vector<std::pair<int, int>> prim(int vertices, const std::unordered_map<int, std::vector<std::pair<int, int>>>& adj, int start = 0) {
    std::unordered_set<int> visited;
    std::vector<std::pair<int, int>> mst;
    std::priority_queue<EdgeTuple, std::vector<EdgeTuple>, std::greater<EdgeTuple>> pq;
    pq.push({0, start, -1});
    while (!pq.empty() && visited.size() < static_cast<size_t>(vertices)) {
        auto [w, u, parent] = pq.top();
        pq.pop();
        if (visited.find(u) != visited.end()) continue;
        visited.insert(u);
        if (parent != -1) mst.push_back({parent, u});
        auto it = adj.find(u);
        if (it != adj.end()) {
            for (const auto& [v, weight] : it->second) {
                if (visited.find(v) == visited.end()) {
                    pq.push({weight, v, u});
                }
            }
        }
    }
    return mst;
}`,
    c: `#include <limits.h>
#include <stdbool.h>
#include <stddef.h>

void prim_matrix(const int graph[10][10], size_t n, int parent[]) {
    int key[10];
    bool in_mst[10] = {false};
    for (size_t i = 0; i < n; i++) {
        key[i] = INT_MAX;
        parent[i] = -1;
    }
    key[0] = 0;
    for (size_t count = 0; count < n - 1; count++) {
        int min_key = INT_MAX, u = -1;
        for (size_t v = 0; v < n; v++) {
            if (!in_mst[v] && key[v] < min_key) {
                min_key = key[v];
                u = (int)v;
            }
        }
        if (u == -1) break;
        in_mst[u] = true;
        for (size_t v = 0; v < n; v++) {
            if (graph[u][v] && !in_mst[v] && graph[u][v] < key[v]) {
                parent[v] = u;
                key[v] = graph[u][v];
            }
        }
    }
}`,
  },
  faq: [
    {
      q: "Does Prim's algorithm work on directed graphs?",
      a: "No. Standard Prim's algorithm is formulated for undirected graphs. Finding a minimum directed spanning tree is known as the Arborescence problem (solved by Edmonds' algorithm).",
    },
    {
      q: "How does starting node selection affect the final MST?",
      a: "If all edge weights in the graph are distinct, the Minimum Spanning Tree is unique, and starting at any vertex yields the identical MST.",
    },
    {
      q: "What is the time complexity difference between adjacency matrix and binary heap?",
      a: "With an adjacency matrix, Prim's takes O(V^2), which is optimal for dense graphs where E is approximately V^2. With an adjacency list and binary heap, it takes O(E log V).",
    },
  ],
};

