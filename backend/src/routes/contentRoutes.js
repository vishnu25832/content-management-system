const express = require("express");

const {
  createContent,
  getAllContent,
  getContentBySlug,
  updateContent,
  deleteContent,
} = require("../controllers/contentController");

const protect = require("../middleware/authMiddleware");
const { contentValidation } = require("../validators/contentValidator");

const router = express.Router();

router.post("/", protect, contentValidation, createContent);
router.get("/", protect, getAllContent);
router.get("/:slug", protect, getContentBySlug);
router.put("/:id", protect, contentValidation, updateContent);
router.delete("/:id", protect, deleteContent);

module.exports = router;