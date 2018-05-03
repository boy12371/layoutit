require("dotenv").config();

const host = "http://" + process.env.IP + ":" + process.env.HTTP_PORT;

module.exports = {
  info: {
    title: process.env.APP_ID,
    description: process.env.APP_ID + " server.",
    termsOfService: "http://swagger.io/terms/",
    contact: {
      name: "API Support",
      url: "http://www.swagger.io/support",
      email: "support@swagger.io"
    },
    license: {
      name: "Apache 2.0",
      url: "http://www.apache.org/licenses/LICENSE-2.0.html"
    },
    version: "1.0.0"
  },
  host: host, // Host (optional)
  basePath: "/" // Base path (optional)
};
