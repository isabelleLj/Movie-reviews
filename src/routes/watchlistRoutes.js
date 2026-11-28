// Hanterar den inloggade användarens bevakningslista för filmer.
const express = require("express");
const router = express.Router();
const pool = require("../config/database");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const [movies] = await pool.query(
      `SELECT movies.*
       FROM watchlist
       JOIN movies ON watchlist.movie_id = movies.id
       WHERE watchlist.user_id = ?`,
      [userId],
    );

    res.json(movies);
  } catch (error) {
    console.error("Error fetching watchlist:", error.message);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

router.post("/:movieId", authenticateToken, async (req, res) => {
  try {
    const { movieId } = req.params;
    const userId = req.user.userId;
    const [movies] = await pool.query("SELECT id FROM movies WHERE id = ?", [
      movieId,
    ]);

    if (movies.length === 0) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }
    const [existingMovie] = await pool.query(
      "SELECT * FROM watchlist WHERE user_id = ? AND movie_id = ?",
      [userId, movieId],
    );

    if (existingMovie.length > 0) {
      return res.status(409).json({
        message: "Movie is already in your watchlist",
      });
    }
    await pool.query(
      "INSERT INTO watchlist (user_id, movie_id) VALUES (?, ?)",
      [userId, movieId],
    );

    res.status(201).json({
      message: "Movie added to watchlist",
    });
  } catch (error) {
    console.error("Error adding movie to watchlist:", error.message);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

router.delete("/:movieId", authenticateToken, async (req, res) => {
  try {
    const { movieId } = req.params;
    const userId = req.user.userId;

    const [existingMovie] = await pool.query(
      "SELECT * FROM watchlist WHERE user_id = ? AND movie_id = ?",
      [userId, movieId],
    );

    if (existingMovie.length === 0) {
      return res.status(404).json({
        message: "Movie not found in watchlist",
      });
    }

    await pool.query(
      "DELETE FROM watchlist WHERE user_id = ? AND movie_id = ?",
      [userId, movieId],
    );

    res.json({
      message: "Movie removed from watchlist",
    });
  } catch (error) {
    console.error("Error removing movie from watchlist:", error.message);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

module.exports = router;
