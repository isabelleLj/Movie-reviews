const express = require("express");
const router = express.Router();
const pool = require("../config/database");
const Review = require("../models/Review");
const authenticateToken = require("../middleware/authMiddleware");

router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.userId;

    const [reviews] = await pool.query("SELECT * FROM reviews WHERE id = ?", [
      id,
    ]);

    if (reviews.length === 0) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    if (reviews[0].user_id !== userId) {
      return res.status(403).json({
        message: "You are not allowed to edit this review",
      });
    }

    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 10 ||
      typeof comment !== "string" ||
      !comment.trim()
    ) {
      return res.status(400).json({
        message: "Valid rating and comment are required",
      });
    }
    await pool.query(
      "UPDATE reviews SET rating = ?, comment = ? WHERE id = ?",
      [numericRating, comment, id],
    );

    res.json({
      message: "Review updated successfully",
    });
  } catch (error) {
    console.error("Error updating review:", error.message);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

module.exports = router;
