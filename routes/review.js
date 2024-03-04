const express = require("express");
const router = express.Router({ mergeParams: true });
const { protect, authorize } = require("../middleware/auth");
const {
  addReview,
  getReviews,
  updateReview,
  deleteReview,
} = require("../controllers/review");

router
  .route("/")
  .get(protect, getReviews) // anyuone auth can view the review
  .post(protect, authorize("admin", "user"), addReview); //only login user can add a review

router
  .route("/:reviewId")
  .get(protect, getReviews)
  .put(protect, authorize("admin", "user"), updateReview) //only original reviewer or admin can update the review
  .delete(protect, authorize("admin"), deleteReview); // admin can only delte the review

module.exports = router;
