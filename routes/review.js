const express = require("express");
const router = express.Router({ mergeParams: true });
const { protect } = require("../middleware/auth");
const {
  addReview,
  getReviews,
  updateReview,
  deleteReview,
} = require("../controllers/review");

router.get("/", protect, getReviews);
router.post("/", protect, addReview);
router.put("/:reviewId", protect, updateReview);
router.delete("/:reviewId", protect, deleteReview);

module.exports = router;
