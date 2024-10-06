# Spark Hope Donations

**Empower change through donations.** One contribution can make an infinite impact and shape a brighter future for countless lives.

## Overview

**Spark Hope Donations** is a web-based platform that allows users to explore various charitable organizations and contribute to them directly. Built with modern technologies like React, Redux, and TypeScript, it features state management with Redux Toolkit, a mock API with JSON Server, and styled components for modern UI design. The application offers an intuitive donation interface and is fully tested using Jest and React Testing Library.

## Features

- **Charity Listing**: Displays a curated list of charities with key details.
- **Donation Modal**: Allows users to contribute to a selected charity.
- **State Management**: Global state management using Redux, with persisted states.
- **API Integration**: Utilizes a mock API to simulate real-world backend services.
- **Responsive UI**: Styled with `styled-components` for a clean and modern design.
- **Notification System**: Provides feedback to users with success/error notifications using `react-toastify`.
- **Unit Tests**: Comprehensive test coverage for core components and utility functions.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Testing](#testing)

---

## Getting Started

### Prerequisites

To get the application up and running, you'll need the following installed on your local machine:

- **Node.js** (v14.x or later)
- **npm** or **Yarn** (Yarn is recommended for this project)

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Benzson92/spark-hope-donations.git
    cd spark-hope-donations
    ```

2. **Install the dependencies**:

    If you're using npm:

    ```bash
    npm install
    ```

    If you're using Yarn (recommended):

    ```bash
    yarn install
    ```

---

## Project Structure

Here's a high-level overview of the project's structure:

```plaintext
src/
├── components/         # Reusable React components (CharityCard, DonationModal, etc.)
├── models/             # Data models (DTOs) for charity and donation types
├── redux/              # Redux store configuration, slices, and selectors
├── services/           # API service for handling HTTP requests
├── styles/             # Global CSS and styled-components
├── tests/              # Unit tests for components and utilities
├── utils/              # Utility functions
├── App.tsx             # Main application component
├── index.tsx           # Entry point for rendering the React app
└── ...
```

## Running the Application

You'll need to run two services simultaneously: the client (React app) and the server (JSON Server to simulate API responses).

### Development Mode

Start the mock API server:

```bash
yarn server
```

This will start the JSON Server at http://localhost:3001 and serve the mock API from db.json.

Start the React development server:

```bash
yarn client
```

This will start the React development server at http://localhost:3000.

Now, open your browser and navigate to http://localhost:3000 to view the application.

---

## Testing

This project is fully tested using Jest and React Testing Library. Tests cover components, utilities, and key functionality like rendering and user interactions.

### Running Unit Tests

To run the unit tests:

```bash
yarn test
```

This will execute all tests located in the src/tests/ directory. Tests will run in watch mode by default.

To see detailed test coverage, use the following command:

```bash
yarn test --coverage
```
