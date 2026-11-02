# DESIGN  -  Visual, Layout & Interaction Specification

## 1. Design principles

1. **The algorithm is the hero.** Chrome and navigation recede into a dark charcoal backdrop; data structures and active state transitions are the brightest elements on screen.
2. **One color, one meaning.** State colors (comparing, swapping, pivoting, visiting, completed) maintain uniform semantics across sorting, trees, and graphs.
3. **One accent.** A single cyan-blue accent is used for active focus, interactive controls, and hover highlights.
4. **Motion explains causality.** Visual transitions mirror physical state transitions; animation duration scales dynamically with playback speed and is strictly zero when stepping or when reduced motion is preferred.
5. **Keyboard and URL parity.** Every player control has a dedicated keyboard shortcut, and player state (`view`, `speed`, `size`) is synchronized with the URL.

## 2. Theme tokens (Dark Theme Only)

DevTrace is strictly dark-themed with no light mode or theme toggle. Tokens are defined in `styles/tokens.css` as CSS custom properties on `:root`. Raw hex codes must never be hardcoded into UI components.

| Token | Value | Purpose |
|---|---|---|
| `--bg-0` | `#0B0E14` | Primary app background (deep dark charcoal) |
| `--bg-1` | `#111622` | Card surfaces, sidebar background, table headers |
| `--bg-2` | `#1A2234` | Raised surfaces, input controls, hover fills |
| `--border` | `#232E44` | Subtle card borders, dividers, table borders |
| `--border-hover` | `#00E5FF` | Active/hovered card border (cyan-blue highlight) |
| `--text-0` | `#E6EDF7` | Headings, primary text, prominent data |
| `--text-1` | `#93A1B8` | Subtitles, article body, table text, metadata |
| `--text-muted` | `#5C6B84` | Breadcrumbs, inactive controls, disabled states |
| `--accent` | `#00E5FF` | Primary cyan-blue accent: active buttons, focus ring, icons |
| `--idle` | `#4A5A78` | Untouched array bars, inactive graph/tree nodes |
| `--compare` | `#FFD60A` | Active comparison / inspection / frontier node |
| `--swap` | `#FF3B30` | Swapped elements, written positions, modified edges |
| `--pivot` | `#BF5AF2` | Pivot element, current node pointer, active root |
| `--range` | `#1E3A5F` | Active partition window, sub-array range |
| `--done` | `#30D158` | Fully sorted elements, completed paths, visited nodes |

## 3. Typography

- **UI Headings & Body:** `Inter`, weights 400 (regular), 500 (medium), 600 (semi-bold).
- **Code, Data, Complexity, Numbers:** `JetBrains Mono`, weights 400 and 600.
- **Scale:** 
  - Page title: 32 px (`font-semibold`)
  - Section headings: 22 px (`font-semibold`)
  - Subheadings: 16 px (`font-medium`)
  - Body & descriptions: 14 px (`font-normal`, leading 1.6)
  - Code & tokens: 13 px (`font-mono`)

## 4. Page layouts

### 4.1 Top Navigation Bar (Shared across all pages)
- Left: DevTrace logo with cyan-blue mark, section navigation menu (`Sorting`, `Data Structures`, `Graphs`, `Searching`, `Concepts`).
- Center: Quick algorithm search bar (`Cmd/Ctrl + K`).
- Right: GitHub repository link.
- *(No user profiles, sign-in buttons, language toggles, or theme switchers).*

### 4.2 Section Hub Pages (`/visualize/:section`)
```
+--------------------------------------------------------------------------+
| Top Bar: DevTrace Logo   [Sections v]    [Search...]            [GitHub] |
+--------------------------------------------------------------------------+
| Breadcrumb: Visualizations / Sorting                                     |
| Page Title: Sorting Algorithms                                           |
| Intro: Explore 8 sorting algorithms with interactive visualizations...   |
+--------------------------------------------------------------------------+
| Algorithm Cards Grid (3 columns):                                        |
| +--------------------+ +--------------------+ +--------------------+     |
| | [Icon] Bubble Sort | | [Icon] Quick Sort  | | [Icon] Merge Sort  |     |
| | Watch adjacent     | | See divide-and-    | | Watch recursive    |     |
| | elements bubble up | | conquer partition  | | subarrays merge    |     |
| +--------------------+ +--------------------+ +--------------------+     |
| +--------------------+ +--------------------+ +--------------------+     |
| | [Icon] Insertion   | | [Icon] Selection   | | [Icon] Heap Sort   |     |
| +--------------------+ +--------------------+ +--------------------+     |
+--------------------------------------------------------------------------+
| Section Heading: Sorting Comparison                                      |
| [Comparison Table: Algorithm | Best | Avg | Worst | Space | Stable]       |
+--------------------------------------------------------------------------+
```

- **Cards:** Rounded cards with subtle border (`--border`). Hovering transitions border to `--accent` (`#00E5FF`).
- **Blurbs:** One verb-led sentence per card ("Watch X do Y", "See X do Y").
- **Comparison Table:** Positioned directly below the card grid with columns tailored to the section.

### 4.3 Algorithm Detail Pages (`/visualize/:section/:algorithm`)
```
+--------------------------------------------------------------------------+
| Top Bar                                                                  |
+--------------------------------------------------------------------------+
| Breadcrumb: Visualizations / Sorting / Quick Sort                        |
| Title: Quick Sort                                                        |
+--------------------------------------------------------------------------+
| Sibling Menu / Quick Switcher [Dropdown / Sidebar]                       |
| PLAYER CANVAS                                                            |
|  - Visualizer Stage (Bars / Trees / Graphs)                              |
|  - Playback Toolbar: |< (Reset)  < (Back)  [Play/Pause]  > (Step)        |
|  - Controls: Speed [---o--]  Size [---o--]  View [bars v]                |
|  - Status / Note: "Compare 42 and 18 at index 3 and 4"                   |
+--------------------------------------------------------------------------+
| ARTICLE CONTENT                                                          |
| 1. Introduction (2 paragraphs)                                           |
| 2. Complexity Table (Best, Average, Worst, Space)                        |
| 3. Step-by-Step Table                                                    |
| 4. Worked Example Table (step-by-step state: array, stack, visited)      |
| 5. When to Use vs When to Avoid (side-by-side comparison)                 |
| 6. Code Implementations (Python | JavaScript | Java | C++ | C) [Copy]     |
| 7. Frequently Asked Questions (FAQ)                                      |
| 8. Sibling Links (Next / Previous algorithms in this section)           |
+--------------------------------------------------------------------------+
```

## 5. Playback controls and URL synchronization

| Control | Function | URL Parameter |
|---|---|---|
| Play / Pause | Starts or halts the animation ticker | None (transient state) |
| Step Forward | Advances exactly one recorded step | None |
| Step Backward | Reverts exactly one recorded step | None |
| Reset | Reverts state to step 0 | None |
| Speed | Delay in ms per step | `?speed=2` (mapped preset: 1=slow, 2=normal, 3=fast) |
| Size | Number of elements / nodes | `?size=14` |
| View | Visualization rendering mode | `?view=bars` |

All three URL parameters are read on page mount and updated upon user selection, ensuring links are shareable.

## 6. State-to-visual mapping

| State | Array / Sorting | Tree / BST / Heap | Graph (Grid / Nodes) |
|---|---|---|---|
| Idle | `--idle` bar fill | `--idle` node border & text | `--idle` node / cell |
| Compare / Inspect | `--compare` yellow highlight | `--compare` yellow ring | `--compare` yellow border |
| Swap / Write / Settle | `--swap` red-orange bar | `--swap` node fill | `--swap` modified edge |
| Pivot / Pointer | `--pivot` purple bar | `--pivot` purple halo | `--pivot` active source node |
| Sorted / Done / Path | `--done` green bar | `--done` green node | `--done` green path node/edge |

## 7. Motion specification

- **Bar height / node coordinates:** Framer Motion animate with easing `easeOut`.
- **Duration:** `Math.min(0.8 * delayMs, 250) ms`. When `delayMs < 60 ms` or when stepping manually, duration is `0 ms`.
- **Colors:** Handled via CSS `transition: background-color 100ms linear` (avoids string interpolation issues with CSS variables).
- **Reduced Motion:** If `prefers-reduced-motion: reduce` is detected, all transitions are instant (`0 ms`) and scaling effects are disabled.

## 8. Audio sonification (optional toggle)

- Clean Web Audio API synthesis (sine oscillator with 90 ms envelope: 5 ms attack, 85 ms release).
- Frequency mapped to element value: `220 * 2^((value / maxValue) * 2)` Hz.
- Distinct audio chimes for comparison (soft), swap (accentuated + octave blip), and completion (harmonic arpeggio).
- Default: Muted until explicitly enabled by user.

## 9. Accessibility & keyboard navigation

- **Keyboard shortcuts:**
  - `Space`: Play / Pause toggle
  - `ArrowRight` (`→`): Step forward
  - `ArrowLeft` (`←`): Step backward
  - `R`: Reset to frame 0
  - `[` / `]`: Decrease / increase speed
- **Focus ring:** 2 px `--accent` with 2 px offset on all interactive elements.
- **Screen readers:** Accessible labels on all controls; step notes update via `aria-live='polite'` when paused.
