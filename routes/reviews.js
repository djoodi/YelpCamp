const express = require('express');
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review");
const reviews = require("../controllers/reviews");
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');
const Campground = require("../models/campground");
const router = express.Router({mergeParams: true});

router.post('/', isLoggedIn, validateReview,  catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;