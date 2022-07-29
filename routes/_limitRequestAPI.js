const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "too many requests sent by this ip, please try again in an hour !",
});
module.exports = (app) => {
  app.use("/api", limiter);
};
