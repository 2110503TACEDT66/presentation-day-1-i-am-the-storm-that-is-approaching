const Review = require("../models/Review");
const Company = require("../models/Company");

// @desc    Add a review for a company
// @route   POST /api/v1/companies/:companyId/reviews
// @params  :companyId (The ID of the company to which the review is being added)
// @body    title (String), text (String), rating (Number)
// @access  Private (User must be authenticated)
exports.addReview = async (req, res, next) => {
  try {
    req.body.company = req.params.companyId;
    req.body.user = req.user.id;

    const company = await Company.findById(req.params.companyId);

    if (!company) {
      return res.status(404).json({ success: false, msg: "Company not found" });
    }

    const review = await Review.create(req.body);

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// @desc    Get all reviews for a specific company
// @route   GET /api/v1/companies/:companyId/reviews
// @params  :companyId (The ID of the company whose reviews are being fetched)
// @access  Public or Private (Depending on application requirements)
exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      company: req.params.companyId,
    }).populate({
      path: "user",
      select: "name",
    });

    if (!reviews) {
      return res.status(404).json({ success: false, msg: "No reviews found" });
    }

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// @desc    Update a specific review
// @route   PUT /api/v1/companies/:companyId/reviews/:reviewId
// @params  :companyId (The ID of the company associated with the review), :reviewId (The ID of the review to update)
// @body    title (Optional, String), text (Optional, String), rating (Optional, Number)
// @access  Private (User must be authenticated and authorized to update the review)
exports.updateReview = async (req, res, next) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, msg: "Review not found" });
    }

    // Ensure user is the review owner
    if (review.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ success: false, msg: "Not authorized to update this review" });
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// @desc    Delete a specific review
// @route   DELETE /api/v1/companies/:companyId/reviews/:reviewId
// @params  :companyId (The ID of the company associated with the review), :reviewId (The ID of the review to delete)
// @access  Private (User must be authenticated and authorized to delete the review)
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, msg: "Review not found" });
    }

    // Ensure user is the review owner
    if (review.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ success: false, msg: "Not authorized to delete this review" });
    }

    await review.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};
