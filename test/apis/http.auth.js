const auth = require("http-auth");

const httpAuth = function(app) {
  const basic = auth.basic(
    {
      realm: "STCPD Area."
    },
    (username, password, callback) => {
      callback(username === "Richard" && password === "123456");
    }
  );

  app.use(auth.connect(basic));

  basic.on("success", result => {
    console.log("User authenticated:");
    console.log(result);
  });

  basic.on("fail", (result, req) => {
    console.log("User authentication failed:");
    console.log(result);
    console.log("req=======");
    console.log(req.body);
  });

  basic.on("error", (error, req) => {
    console.log("Authentication error:");
    console.log(error);
    console.log("req=======");
    console.log(req.body);
  });
};

module.exports = httpAuth;
