# Spinning Tetris

Classic Tetris in a slowly rotating 3D world. Built with React, TypeScript, React Three Fiber, Zustand, and Tailwind CSS.

## Features

- Full Tetris gameplay with 7-bag randomizer, wall kicks, line clears, scoring, and levels
- Smoothly spinning 3D board with neon cyberpunk aesthetics
- Keyboard + mobile touch controls
- Pause / resume / restart
- High score persisted in localStorage
- Responsive, deployable as a static site

## Tech Stack

- React 19 + TypeScript
- Vite
- React Three Fiber + Drei
- Zustand
- Tailwind CSS v4

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

## Production Build

```bash
npm run build
```

Output is in the `dist/` folder.

## Preview Production Build

```bash
npm run preview
```

## Deploy to Vercel

1. Push the project to a GitHub repository.
2. Import the repo in [Vercel](https://vercel.com).
3. Framework preset: Vite (auto-detected).
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.

Or use the Vercel CLI:

```bash
npx vercel
```

## Deploy to Netlify

1. Drag the `dist` folder to Netlify Drop, or
2. Connect the Git repo and set:
   - Build command: `npm run build`
   - Publish directory: `dist`

## Controls

| Key | Action |
|-----|--------|
| ← / A | Move left |
| → / D | Move right |
| ↓ / S | Soft drop |
| ↑ / W | Rotate clockwise |
| Space | Hard drop |
| P | Pause / Resume |
| R | Restart |

On mobile, on-screen buttons appear at the bottom.

## License

MIT
# spinning-tetris-3D
# spinning-tetris-3D
