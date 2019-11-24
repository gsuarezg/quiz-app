const jwt = require("jwt-simple");
const moment = require("moment");
const secret = "this_is_a_secret_key";

exports.ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: "The request does not have the authentication header." });
  }
  let token = req.headers.authorization.replace(/['"]+/g, "");
  try {
    let payload = jwt.decode(token, secret);
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: "Token expired" });
    }
    req.user = payload;
  } catch (error) {
    console.log(error);
    return res.status(404).send({ message: "Invalid token" });
  }
  next();
};
