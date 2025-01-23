# City Management App

## Overview

City Management App is a Node.js-based backend with MongoDB integration, designed to handle electricity data records. It supports CSV file uploads, provides RESTful APIs, and offers user role-based access control (Manager and Viewer).

## Features

- Upload electricity data via CSV files.
- CRUD operations on electricity data.
- Role-based access:
  - **Manager**: Can create, read, update, and delete data.
  - **Viewer**: Can only view data.
- JWT-based authentication.

## Requirements

- Node.js (v14 or higher)
- MongoDB
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/city-management-app.git
   cd city-management-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following:

   ```env
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   PORT=5000
   ```

4. Start the application:

   ```bash
   npm start
   ```

5. The app will run at `http://localhost:5000`.

## API Endpoints

### Authentication

- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Login and receive a JWT.

### Electricity Data

- **GET** `/api/data`: Get all electricity data (Manager & Viewer).
- **POST** `/api/data`: Create new electricity data (Manager only).
- **DELETE** `/api/data/:id`: Delete electricity data by ID (Manager only).

## Development

- Run the server in development mode:

  ```bash
  npm run dev
  ```

## Testing

- Unit tests and E2E tests can be run using the following commands:

  ```bash
  npm run test
  npm run e2e
  ```

## Notes

- Ensure MongoDB is running locally or provide a remote connection string in the `.env` file.
- The `uploads/` directory stores temporary CSV files and can be cleaned periodically.

## License

This project is licensed under the MIT License.
