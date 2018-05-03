// const env = require("./env.config");
// const fs = require("fs");
// const https = require("https");

// env.config();

// const port = process.env.HTTP_PORTS;

// module.exports = function(app) {
//   let credentials;
//   try {
//     credentials = {
//       key: fs.readFileSync("./server.key", "utf8"),
//       cert: fs.readFileSync("./server.crt", "utf8")
//     };
//   } catch (e) {
//     console.log(
//       "Keyfiles (server.key and server.crt) not found! You can generate them with cert.sh."
//     );
//   }
//   https.createServer(credentials, app).listen(port, function(err) {
//     if (err) {
//       console.log("Couldn't start the HTTP serveron port:" + port);
//       console.log(err);
//       return;
//     }
//     console.log("Https Server started on port:" + port);
//   });
// };
