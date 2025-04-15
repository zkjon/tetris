![Status](https://img.shields.io/badge/status-in%20development-yellow) ![Project Status](https://img.shields.io/badge/project-active--development-yellow) ![Work in Progress](https://img.shields.io/badge/work%20in%20progress-yes-orange)

<p align="center">
  <img src="./public/icon.avif" alt="Tetris Banner" />
</p>
<h2 align="center">by zkjon</h2>

# Tetris - Vanilla JavaScript 

A simple and responsive Tetris game built with modern web technologies.

## Technologies Used

- **JavaScript**: Main game logic and rendering.
- **TypeScript**: Tetromino shapes and color constants are defined in TypeScript files.
- **Tailwind CSS**: Utility-first CSS framework for styling and layout.
- **Vite**: Fast development server and build tool.
- **Bun**: Ultra-fast JavaScript runtime and package manager.
- **HTML5**: Markup for the game interface.
- **CSS**: Custom styles and CSS variables for piece colors.

## Features

- Classic Tetris gameplay
- Responsive design for desktop and mobile
- Keyboard controls for movement, rotation, and pause
- Score tracking
- Each tetromino has a unique color, defined via CSS variables
- Clean and modern UI

## Controls

- **Left / A**: Move piece left
- **Right / D**: Move piece right
- **Down / S**: Move piece down faster
- **Up / W**: Rotate piece
- **Space**: Hard drop (instantly drop piece)
- **P**: Pause / Resume

## How it works

- The game board is a 10x20 grid rendered on a `<canvas>`.
- Each tetromino is randomly generated and assigned a color based on its type.
- When a piece lands, it is fixed to the board and a new piece appears.
- Completed lines are cleared and the score increases.
- The game ends when new pieces cannot be placed.

## Customization

- Piece colors are defined in `src/global.css` as CSS variables.
- Tetromino shapes and color mapping are in `src/consts/pieces.ts`.
- Game logic is in `src/main.js`.

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/zkjon/tetris.git
   cd tetris
   ```

2. **Install dependencies (with Bun or npm):**
   ```sh
   bun install
   # or
   npm install
   ```

3. **Run the project (with Vite):**
   ```sh
   bun run dev
   # or
   npm run dev
   ```
   Or simply open `index.html` in your browser if not using a bundler.

## License

MIT

---

Made with ❤️ by zkjon
