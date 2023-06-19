const { v4: uuidv4 } = require('uuid');

const db = require("../models");
const config = require("../config/auth");

const Role = db.role;
const RefreshToken = db.refreshToken;

const createToken = async (user) => {
  let expiredAt = new Date();

  expiredAt.setSeconds(
    expiredAt.getSeconds() + config.jwtRefreshExpiration
  );

  const _object = new RefreshToken({
    token: uuidv4(),
    user: user._id,
    expiryDate: expiredAt.getTime(),
  });
  const refreshToken = await _object.save();

  return refreshToken.token;
};

const verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
};

const initialDataRole = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({ name: "user" }).save();
      new Role({ name: "admin" }).save();
    }
  });
};

module.exports = {
  createToken,
  verifyExpiration,
  initialDataRole,
};
