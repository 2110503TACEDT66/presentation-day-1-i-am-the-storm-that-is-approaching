const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  addReview,
  getReviews,
  updateReview,
  deleteReview,
} = require("../controllers/review");

router.get("/", getReviews);
router.post("/", addReview);
router.put("/:reviewId", updateReview);
router.delete("/:reviewId", deleteReview);

module.exports = router;
