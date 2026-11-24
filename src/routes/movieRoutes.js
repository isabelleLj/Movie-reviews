const express = require("express");
const router = express.Router();
const pool = require("../config/database");
const Movie = require("../models/Movie");
const Review = require("../models/Review");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: "You are authenticated!",
    userId: req.user.userId,
  });
});

// Hämta alla filmer
router.get("/", async (req, res) => {
  try {
    const [movies] = await pool.query("SELECT * FROM movies");

    const movieObjects = movies.map(
      (movie) =>
        new Movie(movie.id, movie.title, movie.genre, movie.release_year),
    );

    res.json(movieObjects);
  } catch (error) {
    console.error("Error fetching movies:", error.message);

    res.status(500).json({
      message: "Something went wrong when fetching movies",
    });
  }
});

// Hämta en specifik film
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [movies] = await pool.query("SELECT * FROM movies WHERE id = ?", [
      id,
    ]);

    if (movies.length === 0) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.json(movies[0]);
  } catch (error) {
    console.error("Error fetching movie:", error.message);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

// Hämta recensioner för en specifik film
router.get("/:movieId/reviews", async (req, res) => {
  try {
    const { movieId } = req.params;

    const [reviews] = await pool.query(
      "SELECT * FROM reviews WHERE movie_id = ?",
      [movieId],
    );

    const reviewObjects = reviews.map(
      (review) =>
        new Review(
          review.id,
          review.user_id,
          review.movie_id,
          review.rating,
          review.comment,
        ),
    );

    res.json(reviewObjects);
  } catch (error) {
    console.error("Error fetching reviews:", error.message);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

router.post("/:movieId/reviews", authenticateToken, async (req, res) => {
  try {
    const { movieId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.userId;

    if (!rating || !comment) {
      return res.status(400).json({
        message: "Rating and comment are required",
      });
    }

    if (!Number.isInteger(Number(rating)) || rating < 1 || rating > 10) {
      return res.status(400).json({
        message: "Rating must be an integer between 1 and 10",
      });
    }

    const [movie] = await pool.query(
      "SELECT id FROM movies WHERE movie_id = ?",
      [movieId],
    );

    if (movie.length < 1) {
      return res.status(404).json({
        message: "Movie do not exist",
      });
    }

    const [existingReviews] = await pool.query(
      "SELECT id FROM reviews WHERE user_id = ? AND movie_id = ?",
      [userId, movieId],
    );

    if (existingReviews.length > 0) {
      return res.status(409).json({
        message: "Review alredy exist",
      });
    }

    const [result] = await pool.query(
      "INSERT INTO reviews (user_id, movie_id, rating, comment) VALUES (?, ?, ?, ?)",
      [userId, movieId, rating, comment],
    );

    res.status(201).json({
      message: "Review created successfully",
      reviewId: result.insertId,
    });
  } catch (error) {
    console.error("Error creating review:", error.message);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

module.exports = router;
