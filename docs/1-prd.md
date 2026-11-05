# PRD  -  DevTrace Product Requirements Document

## 1. Purpose

DevTrace is a static, browser-based algorithm visualizer and learning platform. It provides 27 step-by-step algorithm and data structure visualizer pages organized across 5 distinct sections (Sorting, Data Structures, Graphs, Searching, Concepts). Each algorithm pairs an interactive player on top with a detailed, freshly authored reference article below. There is no backend; all pages are static and identical for every visitor.

## 2. Problem statement

Static textbook diagrams hide execution order and temporal state transitions. Most online visualizers either cannot step backward cleanly or lose state when speed or input size changes. Learners need an inspectable, reversible visualization platform where every step can be paused, analyzed, and stepped through backward and forward with exact state recovery, accompanied by thorough educational text and multi-language reference implementations.

## 3. Goals and non-goals

| Goals | Non-goals |
|---|---|
| Step-accurate, reversible visualization of all 27 algorithms across 5 core sections | Interactive coding environments or in-browser code execution |
| One dedicated page per algorithm featuring an interactive player and an 8-part article | User accounts, authentication, login, or guest identities |
| Hub pages per section featuring algorithm cards and domain-specific comparison tables | Quizzes, scoring, grading, leaderboards, or certificates |
| Shareable player state persisted in URL query parameters (`view`, `speed`, `size`) | Progress tracking, streaks, user bookmarks, or saved custom presets |
| Zero-backend static architecture deployed as a high-performance SPA | Complex multi-tenant cloud infrastructure or server-side rendering |
| Comment-free reference code implementations across 5 languages (Python, JS, Java, C++, C) | Native mobile applications (desktop-first responsive web design) |

## 4. Users

| Persona | Need | How DevTrace serves it |
|---|---|---|
| Student learner (primary) | Inspect and internalize how classic algorithms and data structures execute step by step | Deterministic play/pause/step rewind, pseudocode sync, worked step trace table, multi-language code |
| Interview candidate | Review algorithmic complexity, trade-offs, and edge cases rapidly | Domain-specific comparison tables on hubs, when-to-use vs. when-to-avoid matrices, clean syntax implementations |
| Instructor / evaluator | Demonstrate algorithm steps in lecture and inspect codebase architecture | Direct URL parameter sharing (`?view=&speed=&size=`), clean component separation, pure testable engines |

## 5. Functional requirements

### Hubs and catalog navigation

| ID | Requirement | Acceptance criterion |
|---|---|---|
| FR-H1 | Main Visualizations Hub (`/visualize`) | Renders cards linking to the 5 section hubs with descriptive blurbs |
| FR-H2 | Section Hubs (`/visualize/:section`) | Renders 3-column grid of algorithm cards with verb-led blurbs ("Watch X do Y") plus a dedicated comparison table |
| FR-H3 | Sorting Hub Comparison Table | Columns: Algorithm, Best, Average, Worst, Space, Stable |
| FR-H4 | Data Structures Hub Comparison Table | Columns: Structure, Access, Search, Insert, Delete |
| FR-H5 | Graphs Hub Comparison Table | Columns: Algorithm, Time, Space, Solves, Weighted |
| FR-H6 | Searching Hub Comparison Table | Columns: Algorithm, Best, Average, Worst, Space, Needs sorted data? |
| FR-H7 | Concepts Hub | Renders Recursion card detailing call stack, base case, and unwinding |

### Playback engine (shared across all 27 algorithms)

| ID | Requirement | Acceptance criterion |
|---|---|---|
| FR-P1 | Play / Pause | Play advances automatically at selected speed; Pause freezes immediately without advancing pending frames |
| FR-P2 | Step forward / Step backward | Forward advances exactly 1 frame; Backward restores the identical previous state deterministically |
| FR-P3 | Reset | Returns playback to frame 0 with initial state intact |
| FR-P4 | Speed control | Adjusts tick delay; updates `speed` URL param; applies on next tick without resetting index |
| FR-P5 | Size control | Adjusts input size/element count; updates `size` URL param; generates fresh step list and resets to frame 0 |
| FR-P6 | View mode | Adjusts visualizer representation (e.g., `bars` default); updates `view` URL param |
| FR-P7 | URL state synchronization | Reloading a URL containing `?view=&speed=&size=` restores the exact playback settings |

### Algorithm pages & article structure

Each of the 27 algorithm detail pages (`/visualize/:section/:algorithm`) contains the player on top, a sibling algorithm navigation sidebar, and an article structured into 8 standard sections:

1. **Introduction:** Two concise conceptual paragraphs explaining operation and intuition.
2. **Complexity Table:** Best, Average, Worst runtime and Space complexity.
3. **Step-by-Step Table:** Numbered chronological sequence of actions performed by the algorithm.
4. **Worked Example Table:** Concrete walkthrough tracking data structure state (stack, visited set, pointers) after each step.
5. **When to Use & When to Avoid:** Side-by-side comparative trade-off matrix.
6. **Code Implementations:** Comment-free, robust implementations in Python, JavaScript, Java, C++, and C with a copy button.
7. **FAQ:** Common conceptual questions, pitfalls, and edge cases.
8. **Sibling Links & Navigation:** Sibling algorithm links within the section and quick table of contents.

### Scope of 27 algorithm pages

| Section | Count | Algorithms included |
|---|---|---|
| Sorting | 8 | Insertion Sort, Selection Sort, Merge Sort, Bubble Sort, Quick Sort, Heap Sort, Radix Sort, Counting Sort |
| Data Structures | 9 | Trie, Binary Tree, Binary Search Tree, AVL Tree, Heap, Linked List, Hash Table, Hash Map, Doubly Linked List |
| Graphs | 7 | Depth-First Search (DFS), Breadth-First Search (BFS), Topological Sort, Dijkstra's Algorithm, Bellman-Ford, Kruskal's Algorithm, Prim's Algorithm |
| Searching | 2 | Linear Search, Binary Search |
| Concepts | 1 | Recursion (call stack, base case, stack unwinding) |

## 6. Non-functional requirements

| ID | Requirement | Target |
|---|---|---|
| NFR-1 | Rendering performance | Smooth 60 fps transitions during automatic playback; instantaneous step responses (< 16 ms) |
| NFR-2 | Static delivery & bundle size | Zero backend dependencies; SPA deployable to static object storage/CDN; code-split routes |
| NFR-3 | Accessibility | Keyboard accessible controls (Space, Left/Right arrows, R); WCAG AA contrast on dark background |
| NFR-4 | Browser compatibility | Latest stable releases of Chrome, Edge, Firefox, Safari |
| NFR-5 | Algorithmic correctness | 100% pure generators covered by automated property tests against deterministic reference oracles |
| NFR-6 | Deterministic replay | Every algorithm step generator is a pure JavaScript function; stepping backward yields the exact identical snapshot |

## 7. Hard limits (enforced in code)

- Array algorithms (sorting, searching): size 5–100 elements
- Trees and graphs: node count ≤ 35 nodes for clean visual rendering
- Maximum recorded trace frames per run: ≤ 20,000 frames (throws `TraceLimitError` if exceeded)
- Code snippets: strictly comment-free across all 5 programming languages

## 8. Success metrics

- All 27 algorithm pages fully built, tested, and reviewed within the 5-day team sprint
- Zero blocking (S1/S2) defects at the Day 4 feature freeze
- 100% of algorithm generators verified by automated property and oracle tests
- Complete 8-part freshly written articles and 5-language code implementations on all 27 pages

## 9. Milestones (5-Day Team Plan)

- **Day 1:** Step-event contract and player frozen by midday; core template, routes, token system; generator stubs begun.
- **Day 2:** Platform, Arrays, Trees, and Graphs builders implement core renderers and initial batch of pages (14 pages total).
- **Day 3:** Builders complete remaining algorithm pages and begin worked trace tables and articles (all 27 visualizers functional).
- **Day 4:** Builders finish articles, code tabs, and cross-test teammate sections; midday feature freeze; full regression.
- **Day 5:** Final bug fixes, polish, static production build, and final sign-off.

## 10. Assumptions and constraints

- Static hosting only: DevTrace requires no server runtime, database, or network API.
- Content integrity: All algorithm explanations, tables, and code snippets are freshly written without copying third-party texts.
- Single reviewer throughput: One reviewer/QA engineer gates all PRs using a standardized 6-point verification checklist.
