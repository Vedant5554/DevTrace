export const kruskalArticle = {
  introduction: [
    "Kruskal's Algorithm is a greedy graph algorithm that finds a Minimum Spanning Tree (MST) for a connected, weighted, undirected graph. An MST is a subset of edges that connects all vertices together with minimum possible total edge weight and without any cycles.",
    "Kruskal's algorithm operates by sorting all edges in ascending order of weight and adding each edge one by one to the growing forest, provided that adding the edge does not form a cycle. It relies on the Disjoint Set Union (Union-Find) data structure to achieve near-linear cycle checks.",
  ],
  complexity: {
    best: { time: "O(E log E)", space: "O(V)" },
    average: { time: "O(E log E)", space: "O(V)" },
    worst: { time: "O(E log E)", space: "O(V)" },
  },
  stepByStep: [
    "Sort all edges of the graph in non-decreasing order of their weights",
    "Initialize a Disjoint Set Union (DSU) structure where each vertex belongs to its own set",
    "Iterate through the sorted edges list",
    "For each edge (u, v) with weight w, check if find(u) == find(v)",
    "If they belong to different sets, union(u, v) and add (u, v) to the MST edge list",
    "If they belong to the same set, discard the edge to prevent cycle creation",
    "Terminate when the MST contains |V| - 1 edges or all edges have been evaluated",
  ],
  workedExample: {
    headers: ["Sorted Edge", "Weight", "Endpoints Connected?", "Action", "MST Edges"],
    rows: [
      ["(C, D)", "4", "No (find(C) != find(D))", "Include in MST, union(C, D)", "[(C, D): 4]"],
      ["(A, D)", "5", "No (find(A) != find(D))", "Include in MST, union(A, D)", "[(C, D): 4, (A, D): 5]"],
      ["(A, B)", "6", "No (find(A) != find(B))", "Include in MST, union(A, B)", "[(C, D): 4, (A, D): 5, (A, B): 6]"],
      ["(B, D)", "10", "Yes (find(B) == find(D))", "Discard (would create cycle)", "[(C, D): 4, (A, D): 5, (A, B): 6]"],
      ["(B, C)", "15", "Yes (find(B) == find(C))", "Discard (would create cycle)", "[(C, D): 4, (A, D): 5, (A, B): 6] (Done)"],
    ],
  },
  tradeoffs: {
    use: [
      "Sparse graphs with fewer edges (where E is close to V)",
      "Designing telecommunications, electrical power grids, and pipeline layouts",
      "Clustering algorithms in machine learning and data science",
    ],
    avoid: [
      "Dense graphs with many edges (where E is close to V^2); Prim's algorithm with an adjacency matrix or heap is faster",
      "Directed graphs (MST algorithms apply to undirected graphs)",
    ],
  },
  code: {
    python: `class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
    def find(self, i):
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i])
        return self.parent[i]
    def union(self, i, j):
        root_i, root_j = self.find(i), self.find(j)
        if root_i != root_j:
            self.parent[root_i] = root_j
            return True
        return False

def kruskal(vertices, edges):
    edges.sort(key=lambda x: x[2])
    dsu = DSU(vertices)
    mst = []
    for u, v, w in edges:
        if dsu.union(u, v):
            mst.append((u, v, w))
            if len(mst) == vertices - 1:
                break
    return mst`,
    javascript: `class DSU {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
  }
  find(i) {
    if (this.parent[i] === i) return i;
    return (this.parent[i] = this.find(this.parent[i]));
  }
  union(i, j) {
    const rootI = this.find(i);
    const rootJ = this.find(j);
    if (rootI !== rootJ) {
      this.parent[rootI] = rootJ;
      return true;
    }
    return false;
  }
}

export function kruskal(numVertices, edges) {
  const sortedEdges = [...edges].sort((a, b) => a[2] - b[2]);
  const dsu = new DSU(numVertices);
  const mst = [];
  for (const [u, v, w] of sortedEdges) {
    if (dsu.union(u, v)) {
      mst.push([u, v, w]);
      if (mst.length === numVertices - 1) break;
    }
  }
  return mst;
}`,
    java: `import java.util.*;

public class Kruskal {
    static class DSU {
        int[] parent;
        DSU(int n) {
            parent = new int[n];
            for (int i = 0; i < n; i++) parent[i] = i;
        }
        int find(int i) {
            if (parent[i] == i) return i;
            return parent[i] = find(parent[i]);
        }
        boolean union(int i, int j) {
            int rootI = find(i), rootJ = find(j);
            if (rootI != rootJ) {
                parent[rootI] = rootJ;
                return true;
            }
            return false;
        }
    }
    public static List<int[]> compute(int vertices, int[][] edges) {
        Arrays.sort(edges, Comparator.comparingInt(a -> a[2]));
        DSU dsu = new DSU(vertices);
        List<int[]> mst = new ArrayList<>();
        for (int[] edge : edges) {
            if (dsu.union(edge[0], edge[1])) {
                mst.add(edge);
                if (mst.size() == vertices - 1) break;
            }
        }
        return mst;
    }
}`,
    cpp: `#include <vector>
#include <algorithm>
#include <numeric>

struct DSU {
    std::vector<int> parent;
    DSU(int n) : parent(n) { std::iota(parent.begin(), parent.end(), 0); }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }
    bool unite(int i, int j) {
        int rootI = find(i), rootJ = find(j);
        if (rootI != rootJ) {
            parent[rootI] = rootJ;
            return true;
        }
        return false;
    }
};

struct Edge {
    int u, v, weight;
};

std::vector<Edge> kruskal(int vertices, std::vector<Edge> edges) {
    std::sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b) {
        return a.weight < b.weight;
    });
    DSU dsu(vertices);
    std::vector<Edge> mst;
    for (const auto& edge : edges) {
        if (dsu.unite(edge.u, edge.v)) {
            mst.push_back(edge);
            if (mst.size() == static_cast<size_t>(vertices - 1)) break;
        }
    }
    return mst;
}`,
    c: `#include <stdbool.h>
#include <stddef.h>
#include <stdlib.h>

typedef struct {
    int u, v, w;
} Edge;

int compare_edges(const void *a, const void *b) {
    return ((const Edge*)a)->w - ((const Edge*)b)->w;
}

int dsu_find(int parent[], int i) {
    if (parent[i] == i) return i;
    return parent[i] = dsu_find(parent, parent[i]);
}

bool dsu_union(int parent[], int i, int j) {
    int root_i = dsu_find(parent, i);
    int root_j = dsu_find(parent, j);
    if (root_i != root_j) {
        parent[root_i] = root_j;
        return true;
    }
    return false;
}

size_t kruskal(int vertices, Edge edges[], size_t edge_count, Edge mst[]) {
    qsort(edges, edge_count, sizeof(Edge), compare_edges);
    int parent[100];
    for (int i = 0; i < vertices; i++) parent[i] = i;
    size_t mst_count = 0;
    for (size_t i = 0; i < edge_count; i++) {
        if (dsu_union(parent, edges[i].u, edges[i].v)) {
            mst[mst_count++] = edges[i];
            if (mst_count == (size_t)(vertices - 1)) break;
        }
    }
    return mst_count;
}`,
  },
  faq: [
    {
      q: "What is the difference between Kruskal's and Prim's algorithm?",
      a: "Kruskal's algorithm adds edges globally in ascending weight order using a Disjoint Set, whereas Prim's algorithm grows a single contiguous connected tree from a starting node using a priority queue.",
    },
    {
      q: "Why is sorting the edges the bottleneck?",
      a: "Sorting E edges takes O(E log E) time. With path compression and union by rank, DSU operations take near-constant O(α(V)) time, making edge sorting the dominant cost.",
    },
    {
      q: "Does Kruskal work if the graph is disconnected?",
      a: "If the graph is disconnected, Kruskal produces a Minimum Spanning Forest connecting all reachable components.",
    },
  ],
};

