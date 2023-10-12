# ft_transcendence is Online Multiplayer Ping Pong Game


## Overview

This project is an online multiplayer ping pong game that was developed by a collaborative team effort. The game boasts features such as a chat system, player profiles, and a friends list. It was built using Docker for containerization, Next.js for the frontend, and Nest.js for the backend.

## Features

- **Multiplayer Gameplay**: Engage in exciting ping pong matches with players from around the world.

- **Chat System**: Communicate with other players in real-time through an integrated chat system.

- **Player Profiles**: Create and customize your player profile to showcase your achievements and progress.

- **Friends List**: Connect with friends and challenge them to friendly matches.
  
- **Two-Factor Authentication (2FA)** with Google**: Integrated Google's 2FA for an added layer of security, enhancing user account protection.

- **User Authentication**: Implemented a robust user authentication system to secure user accounts and login sessions.

## Technologies Used

- **Frontend**: Next.js was employed for the frontend development, ensuring a seamless and responsive user experience.

- **Backend**: The backend was built using Nest.js, providing a robust and scalable server framework.

- **Containerization**: Docker was utilized for containerization, enabling consistent deployment across various environments.
  
- **database**: This project utilizes PostgreSQL as the database management system

## Contributions

As a team of 3 members, I played a pivotal role in the development process. My contributions included:


- **User Authentication**:
  - Implemented a robust user authentication system to secure user accounts and login sessions.

- **Two-Factor Authentication (2FA)** with Google**:
  - Integrated Google's 2FA for an added layer of security, enhancing user account protection.

- **Friend Requests and Blocks**:
  - Designed and implemented a system for sending and accepting friend requests, as well as blocking unwanted interactions.

- **Public and Private Profiles**:
  - Created user interface elements for both public and private profiles, allowing users to control their visibility and share relevant information.

- **Dashboard**:
  - Developed a user-friendly dashboard providing an overview of a player's activity, including match history, statistics, and notifications.

- **Leaderboard**:
  - Designed and implemented the leaderboard feature to showcase top players based on various metrics.

These contributions were instrumental in shaping the functionality and user experience of the project, ensuring a secure and engaging environment for all players.

- **User Interface Design**: Actively participated in the design of the user interface, ensuring an intuitive and engaging player experience.

- **Debugging and Testing**: Assisted in identifying and resolving bugs, as well as contributing to comprehensive testing efforts.

## Installation

To run this project, follow these steps:

1. **Environment Variables**:
   - Create a `.env` file in the root of the project with the necessary environment variables.
   - Create a `.env.local` file in the `frontend` folder with frontend-specific environment variables.
   - Create another `.env` file in the `backend` folder with backend-specific environment variables.

2. **Build and Run**:
   - Open a terminal and run the following command to build and start the project:

   ```bash
   docker-compose up --build

- Access the Application:
        Once the containers are up and running, open a web browser and navigate to http://localhost:3000.

Ensure you have Docker installed in order to run this project.

Note: Make sure to provide appropriate environment variables in the .env files to configure the project according to your setup.

Enjoy the game!

![Game Screenshot](Screenshoot/1.png) ![2](Screenshoot/2.png) ![3](Screenshoot/3.png) ![4](Screenshoot/4.png) ![5](Screenshoot/5.png) ![6](Screenshoot/6.png) ![7](Screenshoot/7.png) ![8](Screenshoot/8.png)
