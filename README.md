# Franklin Nguyen — Portfolio

A personal portfolio inspired by public transit maps, station signage, and Boston's MBTA. Built with React, the site presents my experience, projects, and technical skills as an interactive transit system.

🌐 **Live site:** [franklinminh.com](https://franklinminh.com)

## Features

- Responsive, transit-inspired navigation between portfolio sections
- Interactive station timelines for experience and projects
- Animated page transitions and custom cursor effects
- Original SVG signage, maps, icons, and transit branches
- Mobile layouts with swipe navigation and keyboard controls

## Tech Stack

- React 19
- React Router
- Material UI and Emotion
- Custom CSS and SVG
- Create React App
- GitHub Pages deployment

## Getting Started

Requires Node.js and npm.

```bash
npm install
npm start
```

The development server runs at `http://localhost:3000`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Run the development server |
| `npm test` | Start the interactive test runner |
| `npm run build` | Create an optimized production build in `build/` |
| `npm run deploy` | Build and publish the site with `gh-pages` |

## Routes

- `/` — Home
- `/#/experience` — Work and research experience
- `/#/projects` — Selected projects
- `/#/skills` — Languages, frameworks, and tools

## Project Structure

```text
src/
├── components/   # Shared transit UI and navigation components
├── pages/        # Home, experience, projects, and skills views
├── styles/       # Shared styles
├── App.js        # Application routes
└── index.js      # Application entry point
```
