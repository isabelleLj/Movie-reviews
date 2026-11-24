const express = require("express");
const movieRoutes = require("./src/routes/movieRoutes");
const app = express();
const PORT = 3000;
const authRoutes = require("./src/routes/authRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");
const watchlistRoutes = require("./src/routes/watchlistRoutes");

app.use(express.json());
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
