# Catch the Stars

## Description
Catch the Stars is a casual 2D arcade game built with Phaser 3. The player controls a basket to catch falling stars while avoiding bombs before the timer runs out.

## Objective
Collect at least **20 stars** within **30 seconds** while avoiding bombs. Each bomb reduces one life, and the game ends when either the timer expires or all lives are lost.

## Controls
### Desktop
- ⬅ Left Arrow
- ➡ Right Arrow
### Mobile & Tablet
- Drag anywhere on the screen to move the basket.

## Technologies Used
- Phaser 3
- Vite
- JavaScript (ES6)

## Installation
```bash
npm install
npm run dev
```

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Features
- Responsive gameplay
- Desktop and touch controls
- Countdown timer
- Score and lives system
- Win and Game Over states
- Sound effects
- Base64 embedded assets
- Responsive UI
- Lightweight build (under 5 MB)

## Assumptions
- The game is designed to comply with the 5 MB build size requirement.
- Images and audio assets are embedded as Base64 strings.
- Gameplay is optimized for desktop, tablet, and mobile devices.

## Future Improvements
- Background music with mute option
- Particle effects for star collection and explosions
- Progressive difficulty
- Additional collectibles and power-ups
- High score / leaderboard
- Pause and resume functionality