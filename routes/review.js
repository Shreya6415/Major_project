const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const express = require("express");
const router = express.Router({ mergeParams: true }); 

const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const reviewController = require("../controllers/reviews.js");


//REVIEWS
//POST REVIEW Route
router.post("/", validateReview, wrapAsync(reviewController.createReview));

//DELETE REVIEW Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));
module.exports = router;