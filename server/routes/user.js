const express = require("express");
const router = express.Router();
const User = require("../models/user");
const utils = require("../middleware/utils");

//Method for logging in as a user.
router.post("/login", function (req, res, next) {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        //Checks if user exists
        res.status(401).json({ sucess: false, msg: "Could not find user" });
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
        responseObject.success = true;
        responseObject.userID = user._id;
        res.status(200).json(responseObject);
      } else {
        res.status(401).json({ success: false, msg: "Wrong password" });
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
        const tokenObject = utils.issueJWT(user);
        tokenObject.success = true;
        res.status(200).json(tokenObject);
      });
    } catch (err) {
      res.json({ success: false, msg: err });
    }
  } else {
    res.json({ error: "Username already taken" });
  }
});

module.exports = router;
