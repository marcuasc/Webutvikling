const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const qs = require("qs");

// Generates an FindObject that the get(/) method uses to filter.
const makeFindObject = (queryObject) => {
  //Create an empty object
  let findObject = {};
  // If the queryObject has query for title, generate a regex condition on title. The i flag make the regex not case senitive
  if (queryObject.q) {
    const regex = new RegExp("^" + queryObject.q, "i");
    findObject.title = { $regex: regex };
  }
  // If the queryObject has genres, generate an $all condition on the genres
  if (queryObject.genre) {
    findObject.genre = { $all: queryObject.genre };
  }
  //if the queryObject has duration, generate lower and upper limit on duration
  if (queryObject.duration) {
    findObject.duration = {
      $lt: queryObject.duration.lt,
      $gt: queryObject.duration.gt,
    };
  }
  //if the queryObject has budget, generate lower and upper limit on budget
  if (queryObject.budget) {
    findObject.budget = {
      $lt: queryObject.budget.lt,
      $gt: queryObject.budget.gt,
    };
  }

  // Returns the findObject
  return findObject;
};

//Method for making a sortObject from the queryObject.
const makeSortObject = (queryObject) => {
  let descending = 0;
  //Checks if the queryObject includes sorting
  if (queryObject.sortBy) {
    //Decides what way to sort.
    if (queryObject.sortBy.descending === "true") {
      descending = -1;
    } else {
      descending = 1;
    }
    //if queryObject sort on title, sort on title
    if (queryObject.sortBy.type === "title") {
      return { title: -descending };
    }
    //if queryObject sorts on duration, sort on duration
    if (queryObject.sortBy.type === "duration") {
      return { duration: descending };
    }
    //if queryObject sort on budget, sort on budget
    if (queryObject.sortBy.type === "budget") {
      return { budget: descending };
    }
  }
  //Sorts by default on title if no other sorting has been chosen.
  return { title: 1 };
};

//Main method for retrieving movies
router.get("/", async (req, res) => {
  // Parses the request query and makes it into an object
  const queryObject = qs.parse(req.query);
  // Generates the corresponding findObject based on the query.
  const findObject = makeFindObject(queryObject);
  // If the queryObject has a limit, set that limit. Else set it to 12
  const pageLimit = queryObject.limit ? queryObject.limit : 12;

  try {
    //Gets all movies that match the query without pagination to get the total number of movies for the given query.
    const unPaginatedMovies = await Movie.find(findObject).exec();
    const count = unPaginatedMovies.length;

    //Gets the movies that match the query, with pagination
    let movies = await Movie.find(findObject, {
      //Return id, title and poster_path for the movies.
      _id: 1,
      title: 1,
      poster_path: 1,
    })
      .limit(parseInt(pageLimit))
      .skip((queryObject.page - 1) * parseInt(pageLimit))
      .collation({ locale: "en" })
      //Sorts on the generated sortObject
      .sort(makeSortObject(queryObject))
      .exec();

    res.json({
      movies,
      //Return the movies, as well as totalPages and currentPage
      totalPages: Math.ceil(count / parseInt(pageLimit)),
      currentPage: queryObject.page * 1, // The *1 is to make currentPage a number
    });
  } catch (err) {
    console.error(err.message);
  }
});

//Return a movie from id aswell as the average rating-score
router.get("/id/:id", async (req, res) => {
  try {
    let data = await Movie.find({ _id: req.params.id }).exec();
    res.json(data);
  } catch (err) {
    console.error(err.message);
  }
});

//Updates a movie from id
router.put("/id/:id", (req, res, next) => {
  if (Movie.find({ _id: req.params.id })) {
    Movie.updateOne({ _id: req.params.id }, req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "Movie does not exist",
    });
  }
});

module.exports = router;
