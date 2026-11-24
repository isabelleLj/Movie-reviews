class Review {
  constructor(id, userId, movieId, rating, comment) {
    this.id = id;
    this.userId = userId;
    this.movieId = movieId;
    this.rating = rating;
    this.comment = comment;
  }
}

module.exports = Review;
