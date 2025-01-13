# Social Network API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

**Social Network API** is a backend application designed to manage a social networking platform. It allows users to create accounts, post thoughts, react to thoughts, and manage friendships. This application leverages **Express.js** for routing, **MongoDB** for the database, and **Mongoose** for object data modeling.

This project is tested using **Insomnia** to demonstrate full CRUD operations on users, thoughts, reactions, and friend relationships.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Testing with Insomnia](#testing-with-insomnia)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation

To run this project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/YourUsername/social-network-api.git
   cd social-network-api
   ```

2. Install Dependencies:

   ```bash
   npm install
   ```

3. Build the Server:

   ```bash
   npm run build
   ```

4. Seed the database:

   ```bash
   npm run seed
   ```

## Usage

1. Start the server:
   ```bash
   npm run start
   ```
   
2. Open **Insomnia** to test API routes.  

### API Endpoints

#### Users

- **GET** all users:  
  `GET /api/users`

- **GET** a single user by ID:  
  `GET /api/users/:id`

- **POST** create a new user:  
  `POST /api/users`  
  **Body:**
  ```json
  {
    "username": "testuser",
    "email": "testuser@mail.com"
  }
  ```

- **PUT** update a user by ID:  
  `PUT /api/users/:id`  
  **Body:**
  ```json
  {
    "username": "updatedUser",
    "email": "updateduser@mail.com"
  }
  ```

- **DELETE** a user by ID:  
  `DELETE /api/users/:id`

#### Friends

- **POST** add a friend:  
  `POST /api/users/:userId/friends/:friendId`

- **DELETE** remove a friend:  
  `DELETE /api/users/:userId/friends/:friendId`

#### Thoughts

- **GET** all thoughts:  
  `GET /api/thoughts`

- **GET** a single thought by ID:  
  `GET /api/thoughts/:id`

- **POST** create a new thought:  
  `POST /api/thoughts`  
  **Body:**
  ```json
  {
    "thoughtText": "This is a new thought!",
    "username": "testuser",
    "userId": "userIdHere"
  }
  ```

- **PUT** update a thought by ID:  
  `PUT /api/thoughts/:id`  
  **Body:**
  ```json
  {
    "thoughtText": "Updated thought text."
  }
  ```

- **DELETE** a thought by ID:  
  `DELETE /api/thoughts/:id`

#### Reactions

- **POST** add a reaction to a thought:  
  `POST /api/thoughts/:thoughtId/reactions`  
  **Body:**
  ```json
  {
    "reactionBody": "Nice post!",
    "username": "anotherUser"
  }
  ```

- **DELETE** remove a reaction from a thought:  
  `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`

## Testing with Insomnia

1. **Start the server** with:  
   npm run start

2. **Open Insomnia** and test the API routes listed in the [Usage](#usage) section.

## License

This project is licensed under the MIT License.  

## Contributing

1. Fork the repository.  
2. Create a new branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
4. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
6. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
8. Open a pull request.

## Questions

- **GitHub**: [Sinnema](https://github.com/Sinnema1/social-network-api)  
- **Email**: test@test.com
