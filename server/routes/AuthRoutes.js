const express = require('express');
const {
  signin,
  signup,
  refreshToken,
} = require('../controllers/AuthController');
const { verifySignUp } = require("../middlewares");

const router = express.Router();

router.post(
  "/signup",
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  signup
);
router.post("/signin", signin);
router.post("/refreshtoken", refreshToken);

module.exports = router;
