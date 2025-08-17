const { body, param, validationResult } = require("express-validator");


const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map((err) => ({
                field: err.path,
                message: err.msg,
            })),
        });
    }
    next();
};

const validateRegister = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  validateResult,
];

const validateLogin = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("password is required"),
  validateResult,
];

const validateContact = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone").notEmpty().withMessage("phone number is required"),
  validateResult,
];

const validateUpdateContact = [
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("email").optional().isEmail().withMessage("Valid email is required"),
  body("phone").optional().notEmpty().withMessage("phone cannot be empty"),
  validateResult,
];

const validateObjectIdParam = (paramName) => [
    param(paramName).isMongoId().withMessage(`Invalid ${paramName}`),
    validateResult,
];

module.exports = { validateRegister, validateLogin, validateContact, validateUpdateContact, validateObjectIdParam, };
