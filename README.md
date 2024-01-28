# Social Networking Site - MERN Stack Project

Welcome to the Social Networking Site project! This repository contains the source code and documentation for social networking application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **Storage:** Firebase Storage

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

## About the Project

Our Social Networking Site project aims to create a platform where users can connect, share, and interact with their friends and the wider community. It provides a range of features for social networking, including user profiles, posts, comments, likes, and more.

## Features

- **User Management:** JWT token-based authentication for secure user management.
- **Infinite Scrolling:** For posts and user feeds to dynamically load content as the user scrolls down the page.
- **Profile Management:**

  - User Profiles
  - Profile Image and Cover Image upload using Firebase Storage

- **Post Management:** Users can create, edit, and delete posts.
- **Commenting System:** Users can comment on posts and delete their own comments.
- **Like System:** Users can like posts.
- **Friendship System:**

  - Send Friend Requests
  - Accept or Reject Friend Requests
  - Find Friends

- Search and Explore Users and Posts
- Responsive Design

## Getting Started

To get started with the project, follow these steps:

### Prerequisites

Make sure you have the following software installed on your system:

- [Node.js](https://nodejs.org/) (LTS version)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:

   ```
   https://github.com/HelloBrijesh/Social-Network-MERN.git

   ```

2. Change to the project directory:

   ```
   cd Social-Network-MERN
   ```

3. Install server dependencies:
   ```
   cd server
   npm install
   ```
4. Install client dependencies:

   ```
   cd ../client
   npm install
   ```

5. Configure environment variables by creating a .env file in the server directory and specifying your MongoDB connection string, JWT secret, and other required variables.

6. Start the server:

   ```
   cd ../server
   npm start
   ```

7. Start the client:

   ```
   cd ../client
   npm start
   ```

## Usage

Visit the application in your browser at http://localhost:5173.
Sign up for an account, create posts, add friends, and explore the features of the social networking site.

## Future Improvements

- Implement real-time notifications.
- Enhance user interface and experience.

## Contributing

We welcome contributions from the community. To contribute to this project, please follow our Contribution Guidelines.

## License

This project is licensed under the [MIT License](https://github.com/HelloBrijesh/Social-Network-MERN/blob/main/LICENSE).
