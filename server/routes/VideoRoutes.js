const express = require('express');
const {
  shareNewVideo,
  getAllSharedVideo,
} = require('../controllers/VideoController');
const { authJwt } = require("../middlewares");

const router = express.Router();

router.get("/shared-videos", [authJwt.verifyToken], getAllSharedVideo);
router.post("/share-video", [authJwt.verifyToken], shareNewVideo);

module.exports = router;
