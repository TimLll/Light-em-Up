# Light 'em Up

A small browser game where you search a large image with a moving flashlight cone and try to locate a randomly selected detail preview.

## Overview

`Light 'em Up` is a single-page HTML/CSS/JavaScript project. At game start, the app shows a target image detail. You move your mouse (or touch) to scan the darkened board with a flashlight effect. When you get close to the target area, the indicator changes and a sound plays.

## Features

- Full-screen canvas game board
- Dynamic flashlight effect using CSS radial gradients
- Random target clip generation for each round
- Proximity hint + click-to-confirm interaction
- Background music and hint sound effects

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- jQuery (loaded from CDN)

## Quick Start

### Option 1: Open directly

Open `flashlight.html` in your browser.

### Option 2 (recommended): Local server

From the project root, run:

```powershell
python -m http.server 5500
```

Then open:

- <http://localhost:5500/flashlight.html>

## How to Demo

1. Open the app.
2. Click **Start game**.
3. Show the target preview panel in the bottom-left corner.
4. Move the cursor to search with the flashlight.
5. When the yellow indicator lights up (and sound triggers), click to confirm.
6. A new target detail appears for the next round.

## Controls

- **Mouse move / touch move**: Move flashlight
- **Click**: Confirm found position
- **Refresh page (`F5`)**: Start with a fresh random target

## Project Structure

```text
.
├── flashlight.html
├── flashlight.css
├── flashlight.js
├── 1_BPTB_cfrS3HePpDK68iC3A.jpeg
├── snd/
│   ├── Teeth-starred Face.mp3
│   ├── hey.mp3
│   └── hm.mp3
└── alt/
    ├── flashlight.html
    ├── flashlight.css
    ├── flashlight.js
    ├── flashlight01.html
    ├── flashlight01.css
    ├── flashlight01.js
    ├── flashlight02.js
    ├── taschenlampe.html
    ├── taschenlampe.css
    ├── taschenlampe.js
    └── taschenlampe_01.js
```

## Notes

- Audio autoplay may be blocked by the browser until user interaction.
- For the best demo experience, use a desktop browser in full-screen view.

## License

No license file is currently included in this repository.
