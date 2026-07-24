const { body, validationResult } = require("express-validator");

const contentValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("slug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required"),

  body("content")
    .notEmpty()
    .withMessage("Content is required"),

  body("status")
    .optional()
    .isIn(["draft", "published"])
    .withMessage("Status must be draft or published"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = {
  contentValidation,
};