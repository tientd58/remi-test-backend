const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.user = require("./User");
db.role = require("./Role");
db.video = require("./Video");
db.refreshToken = require("./RefreshToken");

db.ROLES = ["user", "admin"];

module.exports = db;