const usersRouter = require("./api/users/router");

module.exports = function routes(app) {
  app.use("/api/v1/users", usersRouter);
};
