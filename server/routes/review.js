const express = require("express");
const Movie = require("../models/movie");
const router = express.Router();
const Review = require("../models/review");
const User = require("../models/user");
const passport = require("passport");

router.get("/id/:id", (req, res, next) => {
  Review.find({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    if (req.user._id.toString() === req.body.userID) {
      if (req.body) {
        let reviewExists = await Review.exists(
          { movieID: req.body.movieID } && { userID: req.body.userID }
        );
        if (!reviewExists) {
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
          res.json({ error: "You have already reviewed this movie" });
        }
      } else {
        res.json({ error: "Not a valid review" });
      }
    } else {
      res.json({ error: "That is not your user" });
    }
  }
);

module.exports = router;
