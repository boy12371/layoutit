// require("dotenv").config();
// const express = require("express");
// // const responseTime = require("response-time");
// const bodyParser = require("./body.parser");
// const swaggerUi = require("swagger-ui-express");
// const swaggerJSDoc = require("swagger-jsdoc");
// var routes = require("./routes");
// // const db = require("./redis.db");
// // const https = require("./https.server");
// const http = require("./http.server");
// // const auth = require("./http.auth");
// // const users = require("../api/users/controller");
// const swaggerDefinition = require("./swagger.jsdoc");

// const app = express();
// const server = class Server {
//   init() {
//     // app.use(responseTime());
//     bodyParser(app);

//     // Options for the swagger docs
//     var options = {
//       // Import swaggerDefinitions
//       swaggerDefinition: swaggerDefinition,
//       // Path to the API docs
//       apis: ["./example/routes*.js", "./parameters.yaml"]
//     };
//     var swaggerSpec = swaggerJSDoc(options);

//     // Serve swagger docs the way you like (Recommendation: swagger-tools)
//     app.get("/api-docs.json", function(req, res) {
//       res.setHeader("Content-Type", "application/json");
//       res.send(swaggerSpec);
//     });
//     // Set up the routes
//     routes.setup(app);
//     app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//     // const redisClient = new db({});
//     // redisClient.clientConnect();

//     // users(app);

//     // if (process.env.HTTPS_PORT) {
//     //   https(app);
//     // }
//     if (process.env.HTTP_PORT) {
//       http(app);
//     }
//     // auth(app);
//   }
// };

// module.exports = server;
