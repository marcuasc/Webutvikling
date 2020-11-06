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
    if (req.body.rating !== undefined || req.body.text !== undefined) {
      let reviewExists = await Review.exists(
        { movieID: req.body.movieID } && { userID: req.body.userID }
      );
      if (!reviewExists) {
        let newReview = req.body;
        newReview.userID = req.user._id.toString();
        Review.create(newReview)
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
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    await Review.findOne({ _id: req.params.id })
      .then((data) => {
        if (data.userID.toString() === req.user._id.toString()) {
          Review.findOneAndDelete({ _id: req.params.id })
            .then(res.json({ msg: "Review deleted" }))
            .catch(next);
        } else {
          res.json({ error: "Not your review" });
        }
      })
      .catch(next);
  }
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    await Review.findOne({ _id: req.params.id })
      .then((data) => {
        if (data.userID.toString() === req.user._id.toString()) {
          if (req.body.rating !== undefined || req.body.text !== undefined) {
            Review.findOneAndUpdate(
              { _id: req.params.id },
              { rating: req.body.rating, text: req.body.text }
            )
              .then(res.json({ msg: "Review updated" }))
              .catch(next);
          } else {
            res.json({ error: "Not a valid review" });
          }
        } else {
          res.json({ error: "Not your review" });
        }
      })
      .catch(next);
  }
);

module.exports = router;
