## Description

This project is a forum application built with React and TypeScript, leveraging hooks for state and lifecycle management. The app connects to a mock API (JSONPlaceholder) to fetch and manipulate user and post data. The project emphasizes scalability, clean architecture, and responsiveness.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/t-tranquility/form_app_test_project.git

2. Install dependencies:

   yarn install

3. Start the application:

   yarn dev

## Core Functionality

Core Functionality
   Users: View a list of users and their details.
   Posts:
     View all posts.
     Filter posts by user.
     Open individual posts on a dedicated page, along with their comments.
     Add comments to posts (client-side only, data resets upon page reload).
     Create and delete posts.
     Like or dislike posts.
     Add posts to "Favorites".
   User Profile:
     View and edit user details (name, email, address, etc.).
   Admin Panel:
     Admin users can access a dedicated page listing all users, with the ability to edit their details.

## Tech Stack

TypeScript: Ensures type safety and scalability.
React: A library for building user interfaces with components.
React Router: Handles application routing.
Zustand: Lightweight and easy-to-use state management.
Axios: Simplifies HTTP requests.
Tailwind CSS: Utility-first CSS framework for fast and modern styling.

## API Integration

This app uses the JSONPlaceholder API for:
   Users
   Posts
   Comments
Endpoints Used: 
   Users: /users
   Posts: /posts
   Comments: /comments

## Hooks-Only Approach
This project avoids class components entirely, leveraging React hooks such as:
   useState and useEffect for local state and side effects.
   Custom hooks (usePostStore, useFavoritesStore) for centralized state management.

## License
This project is licensed under the MIT License.