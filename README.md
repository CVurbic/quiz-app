# Quiz App

A simple, interactive quiz application built with React and Tailwind CSS. Users can take quizzes, view their scores, and challenge themselves with multiple-choice questions.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Multiple-choice quiz functionality
- Dynamic question loading
- Score tracking and result display
- Responsive design for desktop and mobile

## Demo

A live demo of the application is available at: [https://your-demo-link.com](https://your-demo-link.com)

## Tech Stack

- **React**: A JavaScript library for building user interfaces. ([react.dev](https://react.dev/?utm_source=chatgpt.com))
- **Create React App**: Bootstrapped the project with minimal configuration. ([create-react-app.dev](https://create-react-app.dev/docs/getting-started/?utm_source=chatgpt.com))
- **Tailwind CSS**: Utility-first CSS framework for custom designs. ([tailwindcss.com](https://tailwindcss.com/?utm_source=chatgpt.com))

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/CVurbic/quiz-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd quiz-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

## Available Scripts

In the project directory, you can run:

- `npm start` - Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- `npm run build` - Builds the app for production to the `build` folder.
- `npm run eject` - Removes the single build dependency from your project.

## Project Structure

```
quiz-app/
├── public/           # Static assets
├── src/              # Application source code
│   ├── components/   # Reusable React components
│   ├── pages/        # Main pages
│   ├── data/         # Quiz questions and data
│   ├── App.js        # Root component
│   ├── index.js      # Entry point
│   └── styles/       # Global and Tailwind CSS config
├── package.json      # Project metadata and dependencies
├── tailwind.config.js# Tailwind CSS configuration
└── README.md         # Project documentation
```
