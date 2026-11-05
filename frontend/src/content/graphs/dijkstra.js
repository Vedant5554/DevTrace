export const dijkstraArticle = {
  introduction: [
    "Dijkstra's Algorithm is the definitive greedy graph search algorithm that solves the single-source shortest path problem on graphs with non-negative edge weights.",
    "By systematically maintaining a priority queue (min-heap) of tentative distances and settling the closest unvisited vertex at each step, Dijkstra's algorithm guarantees finding optimal path lengths. It forms the backbone of internet routing protocols (like OSPF and IS-IS) and mapping navigation engines.",
  ],
  complexity: {
    best: { time: "O(E log V)", space: "O(V)" },
    average: { time: "O(E log V)", space: "O(V)" },
    worst: { time: "O(E log V)", space: "O(V)" },
  },
  stepByStep: [
    "Initialize distance to start vertex as 0 and all other vertices as infinity",
    "Insert the start vertex (0, start) into a min-priority queue",
    "Extract the vertex u with the minimum tentative distance from the queue",
    "If the extracted distance is greater than the recorded distance, skip (stale entry)",
    "For each outgoing edge (u, v) with weight w, calculate the potential new distance dist[u] + w",
    "If the new distance is strictly less than dist[v], update dist[v] and push (dist[v], v) onto the queue",
    "Repeat until the priority queue is empty or the target destination is settled",
  ],
  workedExample: {
    headers: ["Step", "Settled Vertex", "Distance", "Priority Queue State", "Distances Array"],
    rows: [
      ["1", "-", "-", "[(0, A)]", "{A:0, B:∞, C:∞, D:∞}"],
      ["2", "A", "0", "[(1, C), (4, B)]", "{A:0, B:4, C:1, D:∞}"],
      ["3", "C", "1", "[(3, B), (4, B), (6, D)]", "{A:0, B:3, C:1, D:6}"],
      ["4", "B", "3", "[(5, D), (4, B), (6, D)]", "{A:0, B:3, C:1, D:5}"],
      ["5", "D", "5", "[(6, D)]", "{A:0, B:3, C:1, D:5}"],
    ],
  },
  tradeoffs: {
    use: [
      "Road network routing and GPS navigation with positive distances or transit times",
      "Network routing protocols like Open Shortest Path First (OSPF)",
      "Robotic motion planning on cost-weighted spatial graphs",
    ],
    avoid: [
      "Graphs containing negative edge weights (Dijkstra fails; use Bellman-Ford)",
      "Unweighted graphs where simpler BFS runs in faster O(V + E) without heap overhead",
    ],
  },
  code: {
    python: `import heapq

def dijkstra(graph, start):
    distances = {v: float('inf') for v in graph}
    distances[start] = 0
    pq = [(0, start)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > distances[u]:
            continue
        for v, weight in graph.get(u, []):
            if distances[u] + weight < distances[v]:
                distances[v] = distances[u] + weight
                heapq.heappush(pq, (distances[v], v))
    return distances`,
    javascript: `export function dijkstra(graph, start) {
  const distances = {};
  for (const v in graph) distances[v] = Infinity;
  distances[start] = 0;
  const pq = [[0, start]];
  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, u] = pq.shift();
    if (d > distances[u]) continue;
    const neighbors = graph[u] || [];
    for (const [v, weight] of neighbors) {
      if (distances[u] + weight < distances[v]) {
        distances[v] = distances[u] + weight;
        pq.push([distances[v], v]);
      }
    }
  }
  return distances;
}`,
    java: `import java.util.*;

public class Dijkstra {
    record Edge(int to, int weight) {}
    record Node(int vertex, int dist) implements Comparable<Node> {
        public int compareTo(Node o) { return Integer.compare(this.dist, o.dist); }
    }
    public static Map<Integer, Integer> compute(Map<Integer, List<Edge>> graph, int start) {
        Map<Integer, Integer> dist = new HashMap<>();
        PriorityQueue<Node> pq = new PriorityQueue<>();
        for (int v : graph.keySet()) dist.put(v, Integer.MAX_VALUE);
        dist.put(start, 0);
        pq.add(new Node(start, 0));
        while (!pq.isEmpty()) {
            Node curr = pq.poll();
            if (curr.dist > dist.get(curr.vertex)) continue;
            for (Edge edge : graph.getOrDefault(curr.vertex, Collections.emptyList())) {
                if (curr.dist + edge.weight < dist.get(edge.to)) {
                    dist.put(edge.to, curr.dist + edge.weight);
                    pq.add(new Node(edge.to, dist.get(edge.to)));
                }
            }
        }
        return dist;
    }
}`,
    cpp: `#include <vector>
#include <queue>
#include <unordered_map>
#include <limits>

using Pair = std::pair<int, int>;

std::unordered_map<int, int> dijkstra(const std::unordered_map<int, std::vector<Pair>>& graph, int start) {
    std::unordered_map<int, int> dist;
    for (const auto& kv : graph) dist[kv.first] = std::numeric_limits<int>::max();
    dist[start] = 0;
    std::priority_queue<Pair, std::vector<Pair>, std::greater<Pair>> pq;
    pq.push({0, start});
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[u]) continue;
        auto it = graph.find(u);
        if (it != graph.end()) {
            for (const auto& [v, weight] : it->second) {
                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    pq.push({dist[v], v});
                }
            }
        }
    }
    return dist;
}`,
    c: `#include <limits.h>
#include <stdbool.h>
#include <stddef.h>

void dijkstra_matrix(const int graph[10][10], size_t n, int start, int dist[]) {
    bool settled[10] = {false};
    for (size_t i = 0; i < n; i++) dist[i] = INT_MAX;
    dist[start] = 0;
    for (size_t count = 0; count < n - 1; count++) {
        int min_val = INT_MAX, u = -1;
        for (size_t v = 0; v < n; v++) {
            if (!settled[v] && dist[v] <= min_val) {
                min_val = dist[v];
                u = (int)v;
            }
        }
        if (u == -1 || min_val == INT_MAX) break;
        settled[u] = true;
        for (size_t v = 0; v < n; v++) {
            if (!settled[v] && graph[u][v] && dist[u] != INT_MAX
                && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
}`,
  },
  faq: [
    {
      q: "Why does Dijkstra fail with negative edge weights?",
      a: "Dijkstra assumes that once a vertex is settled, its shortest path distance is final. A negative edge encountered later could reduce the cost of an already-settled vertex, invalidating the greedy choice.",
    },
    {
      q: "What priority queue implementation gives best performance?",
      a: "A standard binary heap yields O((V + E) log V). A Fibonacci heap theoretically achieves O(E + V log V), but has higher practical constant factors.",
    },
    {
      q: "How does A* relate to Dijkstra?",
      a: "A* is an extension of Dijkstra that adds an admissible heuristic estimation h(n) of distance to the goal, steering the search directionally.",
    },
  ],
};

