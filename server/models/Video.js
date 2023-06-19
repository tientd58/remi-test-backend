const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  title: { type: String },
  description: { type: String },
  link: { type: String },
  linkId: { type: String },
  userShared: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Video", videoSchema);