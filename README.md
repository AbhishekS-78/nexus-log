# NEXUS LOG

A personal celestial observation log. Record what you observe in the night sky: galaxies, nebulae, stars, planets... and the app automatically fetches the NASA Astronomy Picture of the Day for your observation date, decorating each entry with a real space image from that day.

Named after the Nexus Events from **LOKI**, an MCU TV Show. Every observation is a branch in the **Sacred Timeline**.

---

## Features

- Log observations with object name, type, date, notes, and location
- Auto-fetches NASA APOD image and description for the observation date
- Entries persist across sessions via localStorage
- Filter entries by object type: Galaxy, Nebula, Star, Planet
- Full entry detail view with APOD image, explanation, and observer notes
- Delete entries
- Animated star field background via tsParticles

---

## Tech Stack

- Vanilla JavaScript (ES6+)
- Bootstrap 5.3
- Bootstrap Icons
- tsParticles 2.12
- NASA APOD API (api.nasa.gov)

No frameworks and backend *(yet)* :)

---

## Getting Started

1. Get a free NASA API key at [api.nasa.gov](https://api.nasa.gov)
2. Open `js/app.js` and replace the `API_KEY` value with your key
3. Open `index.html` with Live Server or any static file server

---

## How It Works

Each entry stores the user's observation data alongside APOD data fetched at save time. The APOD image is not a lookup of the observed object, it is whatever NASA published on that date. This means every card in the grid shows a unique space image corresponding to the day you made that observation.

If the APOD for a given date is a video rather than an image, the card renders a dark placeholder instead.

---
## License

MIT
