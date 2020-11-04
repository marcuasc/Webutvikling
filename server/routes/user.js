const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const utils = require("../middleware/utils");

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.status(200).json({
      success: true,
      msg: "You are succesfully authenticated to this route!",
    });
  }
);

router.post("/login", function (req, res, next) {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        res.status(401).json({ sucess: false, msg: "Could not find user" });
      }

      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      );

      if (isValid) {
        const tokenObject = utils.issueJWT(user);

        res.status(200).json({
          success: true,
          token: tokenObject,
          expiresIn: tokenObject.expires,
        });
      } else {
        res.status(401).json({ success: false, msg: "WRONG PASSWORD!!!!" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/register", async (req, res, next) => {
  if (!(await User.exists({ username: req.body.username }))) {
    const saltHash = utils.genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
      username: req.body.username,
      hash: hash,
      salt: salt,
    });

    try {
      newUser.save().then((user) => {
        res.json({ success: true, user: user });
      });
    } catch (err) {
      res.json({ success: false, msg: err });
    }
  } else {
    res.json({ error: "Username already taken" });
  }
});

module.exports = router;
