# Online Story Application - Frontend

## Overview
The frontend of the Online Story Application is built using **ReactJS** and styled with **Tailwind CSS**. It allows users to search for stories, read them in different modes (Page Flip or Scroll), and toggle between Light/Dark themes. The **Strategy Pattern** is implemented to manage reading modes efficiently.

## Technologies Used

The frontend of the Online Story Application is built using the following technologies:

- **ReactJS**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **React Context API**: Used for managing global state, such as reading modes and themes.
- **Axios**: A promise-based HTTP client for making API requests to the backend.
- **Environment Variables**: `.env` file is used to configure the backend API URL.

## Features
- Search and read stories by genre.
- Toggle between Light/Dark mode.
- Switch between Page Flip and Scroll reading modes.
- Responsive design using Tailwind CSS.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/long-vux/online-story-app-frontend.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server
    ```bash
    npm start
    ```

## Environment Variables
Create a .env file in the fe folder with the following content:
    ```
    REACT_APP_ROOT_URL=<backend-api-url>
    ```
## Folder Structure
- `src/`: Contains the source code of the frontend application.
- `assets/`: Contains the static assets and the index.html file.
- `components/`: Contains the React components used in the application.
- `pages/`: Contains the React components for different pages.
- `routes/`: Contains the routing configuration for the application.
- `App.js`:
- `index.js`: Entry point of the application.

## Design Patterns

### 1. **Strategy Pattern**
The **Strategy Pattern** is used to manage the reading modes (Page Flip and Scroll) efficiently. It allows the application to switch between different reading strategies dynamically without altering the core logic.

- **Implementation**:
  - `PageFlipStrategy`: Displays one page at a time with navigation buttons.
  - `ScrollStrategy`: Displays all pages in a scrollable view.
- **Usage**:
  The `ReadingModeContext` and `ReadingModeProvider` components handle the state and logic related to reading modes. The strategies are implemented in `FlipScrollStrategies.js`.

```javascript
import { PageFlipStrategy, ScrollStrategy } from './FlipScrollStrategies';

const strategy = isPageFlipMode ? new PageFlipStrategy() : new ScrollStrategy();
strategy.renderContent(pages, currentPage, contentClasses);
```

---

### 2. **Factory Pattern**
The **Factory Pattern** is used to create stories based on their genres. This ensures that the creation logic for different types of stories is centralized and easy to maintain.

- **Implementation**:
  A `StoryFactory` class is responsible for creating story objects based on the genre.

```javascript
class StoryFactory {
  static createStory(genre, data) {
    switch (genre) {
      case 'fantasy': return new FantasyStory(data);
      case 'romance': return new RomanceStory(data);
      default: throw new Error('Unknown genre');
    }
  }
}
```

- **Usage**:
  The factory is used in the backend to create story objects dynamically when adding or fetching stories.

---

### 3. **Observer Pattern**
The **Observer Pattern** is used to notify users who have subscribed to a story whenever a new chapter is added. This ensures that only interested users receive updates.

- **Implementation**:
  - A `Story` class maintains a list of subscribers.
  - When a new chapter is added, the `notifySubscribers` method is called to notify all subscribed users.

```javascript
class Story {
  constructor() {
    this.subscribers = [];
  }

  subscribe(user) {
    this.subscribers.push(user);
  }

  notifySubscribers(chapter) {
    this.subscribers.forEach(user => user.notify(chapter));
  }
}


class User {
  constructor(name) {
    this.name = name;
  }

  // Receive notification
  notify(storyTitle, chapter) {
    console.log(`${this.name}, a new chapter (${chapter}) has been added to ${storyTitle}!`);
  }
}
```

- **Usage**:
  This pattern is implemented in the backend to handle user subscriptions and notifications.

---

### 4. **Singleton Pattern**
The **Singleton Pattern** ensures that there is only one active reading session at a time. This prevents conflicts and ensures consistency in the user's reading experience.

- **Implementation**:
  A `ReadingSession` class is used to manage the single instance of the reading session.

```javascript
class ReadingSession {
  static getInstance() {
    if (!ReadingSession.instance) {
      ReadingSession.instance = new ReadingSession();
    }
    return ReadingSession.instance;
  }
}
```

- **Usage**:
  The singleton is used in the backend to manage the user's reading session and ensure that only one session is active at any given time.