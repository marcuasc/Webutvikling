const express = require("express");
const router = express.Router();
const User = require("../models/user");
const utils = require("../middleware/utils");
const Review = require("../models/review");
const Movie = require("../models/movie");
const passport = require("passport");

//Method for returning the id, username and list of reviews for a selected user
router.get("/:id", (req, res, next) => {
  User.findOne(
    { _id: req.params.id },
    {
      _id: 1,
      username: 1,
      reviews: 1,
    }
  )
    .then((data) => res.status(200).json(data))
    .catch(next);
});
//Method for logging in as a user.
router.post("/login", function (req, res, next) {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        //Checks if user exists
        res
          .status(401)
          .json({ success: false, message: "Could not find user" });
      }
      //Check is the saved hash and salt is correct for the users password
      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      );
      //Gives the user a token if the login info is correct
      if (isValid) {
        const responseObject = utils.issueJWT(user);
        responseObject.userID = user._id;
        responseObject.username = user.username;
        res.status(200).json(responseObject);
      } else {
        res.status(401).json({ success: false, message: "Wrong password" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

//Method for adding a new user
router.post("/register", async (req, res, next) => {
  //Checks if username is taken
  if (!(await User.exists({ username: req.body.username }))) {
    //Hashes the users password
    const saltHash = utils.genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
      username: req.body.username,
      hash: hash,
      salt: salt,
    });

    try {
      //Saves the new user, and issues a valid token
      newUser.save().then((user) => {
        const responseObject = utils.issueJWT(user);
        responseObject.userID = user._id;
        responseObject.username = user.username;
        res.status(200).json(responseObject);
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error });
    }
  } else {
    res.status(401).json({ error: "Username already taken" });
  }
});

//Method for deleting users
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    //Check is the chosen id exists before deleting
    await User.findOne({ _id: req.params.id }).then((user) => {
      //Checks if the chosen user is the user that is logged in
      if (user._id.toString() === req.user._id.toString()) {
        // Finds user and deletes it
        User.findOneAndDelete({ _id: req.params.id })
          .then((deletedUser) => {
            // Gets the reviews of the deleted user
            const reviews = deletedUser.reviews;
            for (reviewID of reviews) {
              // For each reviewID, Find review and delete it
              Review.findOneAndDelete({
                _id: reviewID,
              }).then((deletedReview) => {
                // Update movie reviews list when review is deleted
                Movie.findOneAndUpdate(
                  { _id: deletedReview.movieID },
                  { $pull: { reviews: deletedReview._id } },
                  { new: true, useFindAndModify: false }
                ).then();
              });
            }
            return deletedUser;
          })
          .then((deletedUser) => {
            res
              .status(200)
              .json({ message: `User ${deletedUser.username} deleted` });
          })
          .catch(next);
      } else {
        res.status(403).json({ error: "Not your user" });
      }
    });
  }
);

router.get("/:id/reviews", async (req, res) => {
  await Review.find({ userID: req.params.id })
    .then((reviews) => {
      res.status(200).json({ reviews: reviews });
    })
    .catch(() => {
      res
        .status(400)
        .json({ error: "Could not get reviews from user " + req.params.id });
    });
});

module.exports = router;
