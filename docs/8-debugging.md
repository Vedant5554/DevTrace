# Debugging  -  Troubleshooting Guide

Symptom-first troubleshooting for DevTrace. Identify the symptom, inspect the responsible layer, apply the fix, and add an automated regression test.

## 1. General troubleshooting method

1. **Reproduce with fixed input:** Use fixed default arrays or graphs so the exact step sequence can be inspected deterministically.
2. **Isolate the layer:**
   - **Generator:** Are the emitted step event states mathematically correct? (Test in Vitest).
   - **Player:** Is `playerReducer` tracking the step index and status correctly?
   - **Canvas:** Is the React canvas component correctly rendering the current step state?
3. **Inspect the step trace:** Inspect `steps[index]` in the console or debug panel. If the step state is correct, the issue lies in the rendering layer.

## 2. Built-in step inspector (React JSX)

Append `?debug=1` to any algorithm URL to display the floating debug inspector:

```jsx
export function DebugPanel({ index, status, delayMs, stepCount, currentStep }) {
  if (!new URLSearchParams(window.location.search).has('debug')) return null;
  return (
    <aside className='fixed bottom-2 right-2 max-h-72 w-96 overflow-auto rounded border border-[var(--border)] bg-[var(--bg-1)] p-2 font-mono text-xs text-[var(--text-0)] z-50'>
      <div>{`Step ${index} / ${stepCount - 1} · ${status} · ${delayMs} ms`}</div>
      <pre>{JSON.stringify(currentStep, null, 2)}</pre>
    </aside>
  );
}
```

## 3. Playback & animation issues

| Symptom | Probable Cause | Corrective Action |
|---|---|---|
| Animation runs double speed in development | React StrictMode double-invokes effects; interval set without cleanup | Ensure `useTicker` returns `() => window.clearTimeout(id)` in its cleanup function. |
| Pause does not halt immediately | Reducer `tick` action lacks status guard | Ensure `if (state.status !== 'playing') return state;` is at the top of the `tick` reducer branch. |
| Speed change does not take effect while playing | Ticker hook does not re-arm on `delayMs` change | Include `delayMs` and `index` in the `useTicker` effect dependency array. |
| Stepping backward shows wrong or corrupted state | Step generator mutated state in place instead of cloning | Ensure every generator step clones arrays (`values.slice()`); never mutate past step snapshots. |
| Bars lag behind highlighted comparison | CSS/Framer animation duration exceeds tick delay | Cap transition duration at `Math.min(0.8 * delayMs, 250) ms`; force duration to `0 ms` when `delayMs < 60 ms`. |
| Step button clicks ignored at end | Step action reaches end of steps | Disable Step forward button when `index >= stepCount - 1`. |
| URL parameters do not update on control change | Missing history push/replace state call | Use `useSearchParams` from React Router to set `view`, `speed`, and `size` parameters. |

## 4. Algorithm correctness issues

| Symptom | Probable Cause | Corrective Action |
|---|---|---|
| Quick Sort fails on duplicate elements | Lomuto partition equality check inconsistent | Use strict `<` against pivot value during partition scan; test with all-equal array. |
| Merge Sort highlights wrong bars | `compare` indices refer to auxiliary array instead of main values | When auxiliary array is active, target comparisons to the aux lane. |
| Binary Search loops indefinitely | Midpoint computation overflows or bounds do not adjust | Compute mid as `Math.floor((lo + hi) / 2)` and update `lo = mid + 1` / `hi = mid - 1`. |
| Tree edges cross or overlap | Layout computes x positions solely from depth | Compute horizontal coordinate using in-order traversal index (`column * gapX`). |
| Dijkstra shortest path cost incorrect | Settling vertices on discovery instead of heap pop | Settle vertex only when popped from the min-heap; skip stale entries via visited set. |
| Graph cells remain highlighted after step back | Canvas checks boolean flag rather than comparing frame index | Render cell visited only if `visitedAt[cell] !== -1 && visitedAt[cell] <= index`. |

## 5. Frontend build & styling issues

| Symptom | Probable Cause | Corrective Action |
|---|---|---|
| Tailwind utilities have no effect | Missing `@import 'tailwindcss';` in CSS entry | Verify `@import 'tailwindcss';` and `@tailwindcss/vite` in `vite.config.js`. |
| Colors do not update on state change | Framer Motion attempting to interpolate CSS variables | Apply colors via standard CSS `transition: background-color` and use Framer only for layout/height. |
| Blank page upon static deployment | Missing SPA fallback for deep paths | Configure static host rewrite (`/* -> /index.html 200`) so paths like `/visualize/sorting/quick-sort` route cleanly. |
| Prop type or undefined state error in canvas | Missing fallback check for empty state | Default `currentStep` to empty object or guard with conditional rendering. |

## 6. Demo-day emergency checklist

| Issue During Demo | Immediate Action |
|---|---|
| Page fails to display on projector | Check browser zoom level; resize browser window; verify localhost server is active. |
| Animation appears stalled | Press `R` to reset to step 0; click `Play` again. |
| Sound fails or is too loud | Press `M` to mute; sonification is optional. |
| Question about server performance | Clarify that DevTrace is 100% static client-side: all algorithms compute in browser memory in under 5 ms. |
