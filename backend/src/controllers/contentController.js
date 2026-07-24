const asyncHandler = require("../utils/asyncHandler");
const Content = require("../models/Content");

// Create Content
const createContent = asyncHandler(async (req, res) => {
  const { title, slug, content, status } = req.body;

  const existing = await Content.findOne({ slug });

  if (existing) {
    return res.status(400).json({
      success: false,
      message: "Slug already exists",
    });
  }

  const page = await Content.create({
    title,
    slug,
    content,
    status,
  });

  res.status(201).json({
    success: true,
    data: page,
  });
});

// Get All Content
const getAllContent = asyncHandler(async (req, res) => {
  const content = await Content.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: content.length,
    data: content,
  });
});

// Get Content By Slug
const getContentBySlug = asyncHandler(async (req, res) => {
  const page = await Content.findOne({
    slug: req.params.slug,
  });

  if (!page) {
    return res.status(404).json({
      success: false,
      message: "Content not found",
    });
  }

  res.status(200).json({
    success: true,
    data: page,
  });
});

// Update Content
const updateContent = asyncHandler(async (req, res) => {
  const page = await Content.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!page) {
    return res.status(404).json({
      success: false,
      message: "Content not found",
    });
  }

  res.status(200).json({
    success: true,
    data: page,
  });
});

// Delete Content
const deleteContent = asyncHandler(async (req, res) => {
  const page = await Content.findByIdAndDelete(req.params.id);

  if (!page) {
    return res.status(404).json({
      success: false,
      message: "Content not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Content deleted successfully",
  });
});

module.exports = {
  createContent,
  getAllContent,
  getContentBySlug,
  updateContent,
  deleteContent,
};