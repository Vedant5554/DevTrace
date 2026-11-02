# Setup  -  Environment & First Run

## 1. Prerequisites

| Tool | Version | Verification Command |
|---|---|---|
| Node.js | 20 LTS or newer | `node -v` |
| npm | 10 or newer | `npm -v` |
| Git | Recent stable | `git --version` |

*(Note: JDK, Maven, Docker, MySQL, and TypeScript are not required. DevTrace is built purely with React and modern JavaScript).*

## 2. Repository layout

```
devtrace/
├── docs/                     # Technical specifications and design docs
├── CLAUDE.md                 # Agent and team working rules
└── frontend/                 # React 18 + Vite JavaScript application
```

## 3. Frontend installation

From the repository root:

```bash
cd frontend
npm ci
```

If initializing a fresh installation using Vite's React JavaScript template:
```bash
npm create vite@latest . -- --template react
npm install
npm install framer-motion lucide-react react-router-dom
npm install -D tailwindcss @tailwindcss/vite
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event fast-check
npm install -D eslint-plugin-react-hooks prettier
```

## 4. Key configuration files

### `frontend/vite.config.js`

```js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.js',
  },
});
```

### `frontend/src/styles/index.css`

```css
@import 'tailwindcss';
@import './tokens.css';

html,
body,
#root {
  height: 100%;
}

body {
  background: var(--bg-0);
  color: var(--text-0);
  font-family: 'Inter', system-ui, sans-serif;
}
```

### `frontend/package.json` scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "test": "vitest"
  }
}
```

### ESLint architecture boundary rule

Ensure pure algorithm generators remain isolated from DOM and UI libraries:

```js
{
  files: ['src/algorithms/**/*.js', 'src/core/**/*.js'],
  rules: {
    'no-restricted-imports': [
      'error',
      { patterns: ['react', 'react-dom', 'react-dom/*', 'framer-motion'] },
    ],
  },
}
```

## 5. Running the development server

```bash
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 6. Verification checklist

| Step | Expected Result |
|---|---|
| Run `npm run lint` | Zero ESLint warnings or errors |
| Run `npm test -- --run` | All unit and property tests pass |
| Run `npm run build` | Production Vite build compiles cleanly to `dist/` |
| Navigate to `/visualize` | Main hub renders 5 section cards |
| Navigate to `/visualize/sorting` | Sorting hub renders 8 algorithm cards & comparison table |
| Open an algorithm page | Player loads with interactive controls and 8-part article |

## 7. Editor setup (recommended)

- **VS Code Extensions:**
  - ESLint
  - Prettier - Code formatter
  - Tailwind CSS IntelliSense
- **Settings:**
  - Enable "Format on Save" (`editor.formatOnSave: true`).
  - Set Default Formatter to `esbenp.prettier-vscode`.
