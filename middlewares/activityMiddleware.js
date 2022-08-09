const db = require("../models");

const Activity = db.activity;

exports.getActivityId = (req, res, next) => {
  try {
    Activity.findByPk(req.body.activityId)
      .then((activity) => {
        if (activity.id !== undefined) {
          req.body.activityId = activity.id;
          next();
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  } catch (error) {
    res.sendStatus(500);
  }
};
