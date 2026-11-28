<!-- Dokumenterar projektets syfte, installation, databas, API-endpoints och struktur. -->

# FilmRecension API

## Project Description

FilmRecension is a REST API for a movie review platform built with Node.js, Express, and MySQL.

Users can register and log in, browse movies, write and update reviews, and manage their personal watchlists.

## Technologies

- Node.js (Recomends v24.13.0)
- Express
- MySQL
- JavaScript
- bcrypt
- JSON Web Token (JWT)
- mysql2

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd Movie-reviews
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Installation on macOS

1. Install Homebrew by following the instructions at [brew.sh](https://brew.sh/).
2. Install Node.js 24 and MySQL:

   ```bash
   brew install node@24 mysql
   ```

3. Add Node.js 24 to your `PATH` and reload your shell:

   ```bash
   echo 'export PATH="$(brew --prefix node@24)/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

4. Start the MySQL service:

   ```bash
   brew services start mysql
   ```

5. Clone the repository, navigate to the project directory, and install its dependencies as described above.
6. Create a local environment file from the example:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your MySQL credentials and a private JWT secret. The database setup and sample data steps are described below.

## Database Setup

1. Make sure MySQL is running.
2. Open your MySQL database client, for example Beekeeper Studio.
3. Run the SQL script located at `database/setup.sql`. This creates the `filmrecension` database and its tables.
4. Create a `.env` file in the project root with your database configuration and JWT secret:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=filmrecension
   DB_PORT=3306
   JWT_SECRET=your_secret_key
   ```

5. Register two test users through the registration endpoint.
6. Run `database/seed.sql` to insert sample movies and reviews.

**Note:** The seed script is intended for a fresh database. It assumes that two users have been registered and that the inserted movies receive IDs 1, 2, and 3. Do not run it repeatedly on an existing database.

## Starting the Server

Start the server from the project root:

```bash
npm start
```

The API will be available at:

```text
http://localhost:3000
```

## API Endpoints

### Authentication

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| POST   | `/api/auth/register` | Register a new user      |
| POST   | `/api/auth/login`    | Log in and receive a JWT |

### Movies

| Method | Endpoint                       | Description                 |
| ------ | ------------------------------ | --------------------------- |
| GET    | `/api/movies`                  | Get all movies              |
| GET    | `/api/movies/:id`              | Get a movie by ID           |
| GET    | `/api/movies/:movieId/reviews` | Get reviews for a movie     |
| POST   | `/api/movies/:movieId/reviews` | Create a review for a movie |

### Reviews

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| PUT    | `/api/reviews/:id` | Update your own review |

### Watchlist

| Method | Endpoint                  | Description                        |
| ------ | ------------------------- | ---------------------------------- |
| GET    | `/api/watchlist`          | Get your personal watchlist        |
| POST   | `/api/watchlist/:movieId` | Add a movie to your watchlist      |
| DELETE | `/api/watchlist/:movieId` | Remove a movie from your watchlist |

## Authentication

Protected endpoints require a valid JWT.

Include the token in the request header:

```text
Authorization: Bearer <your_token>
```

Users can only update their own reviews and access their own watchlists.

## Project Structure

```text
FilmRecension/
├── database/
│   ├── setup.sql
│   └── seed.sql
├── src/
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Movie.js
│   │   └── Review.js
│   └── routes/
│       ├── authRoutes.js
│       ├── movieRoutes.js
│       ├── reviewRoutes.js
│       └── watchlistRoutes.js
├── .env.example
├── .gitignore
├── package.json
└── server.js
```
