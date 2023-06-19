const db = require("../models");
const config = require("../config/auth");
const CommonServices = require('../services/commonServices');

const UserModel = db.user;
const VideoModel = db.video;


exports.getAllSharedVideo = async (req, res) => {
  try {
      const videos = await VideoModel.find().populate('userShared');
      res.status(200).send(videos);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

exports.shareNewVideo = async (req, res) => {
  try {
    const {linkId, userId} = req.body.params;
    VideoModel.findOne(
      { linkId: linkId },
      async (err, video) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (video) {
          res.status(400).send({ message: "The video has been shared." });
          return;
        }
        await CommonServices.fetchVideoInformation(
          linkId,
          (videoInfo) => {
            if (videoInfo) {
              const body = {
                title: videoInfo.snippet.title,
                description: videoInfo.snippet.description,
                linkId: videoInfo.id,
                userShared: userId,
              };
              VideoModel.create(body);
              res.status(200)
                .send({
                  message: "Video shared successfully!",
                  result: body,
                });
            } else {
              res.status(400).send({ message: "Cannot share this video, please check again!" });
            }
          },
          (errorCb) => {
            res.status(500).send({ message: errorCb });
          },
        );
      }
    );
  } catch (err) {
    res.status(500).send({ error: err });
  }
};