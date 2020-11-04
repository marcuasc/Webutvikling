const express = require("express");
const Movie = require("../models/movie");
const router = express.Router();
const Review = require("../models/review");
const User = require("../models/user");

router.get("/id/:id", (req, res, next) => {
  Review.find({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/", (req, res, next) => {
  if (req.body) {
    Review.create(req.body)
      .then((review) => {
        Movie.findOneAndUpdate(
          { _id: review.movieID },
          { $push: { reviews: review._id } },
          { new: true, useFindAndModify: false }
        ).then();
        User.findOneAndUpdate(
          { _id: review.userID },
          { $push: { reviews: review._id } },
          { new: true, useFindAndModify: false }
        ).then();
        return review;
      })
      .then((review) => res.json(review))
      .catch(next);
  } else {
    res.json({ error: "Not a valid review" });
  }
});

module.exports = router;
