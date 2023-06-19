const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
  token: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  expiryDate: Date,
});

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);