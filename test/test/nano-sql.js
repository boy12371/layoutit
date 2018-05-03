require("dotenv").config();
const nSQL = require("nano-sql").nSQL;
const RedisAdapter = require("nano-redis").RedisAdapter;
const config = {
  prefix: process.env.DB_PREFIX,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  db: 0,
  retry_strategy: function(options) {
    if (options.error && options.error.code === "ECONNREFUSED") {
      throw new Error(
        options.error.address +
          ":" +
          options.error.port +
          ":" +
          options.error.errno
      );
    }
  }
};

(async function run() {
  await load("Users");
})();

function load(app) {
  new Promise((resolve, reject) => {
    nSQL(app)
      .model([
        { key: "id", type: "uuid", props: ["pk"] },
        { key: "name", type: "string" },
        { key: "age", type: "int", props: ["idx"] }
      ])
      .config({
        cache: false,
        mode: new RedisAdapter(config)
      })
      .connect()
      .then(() => {
        return nSQL(app)
          .query("upsert", { name: "Jeb", age: 30 })
          .exec();
      })
      .then(() => {
        return nSQL(app)
          .query("select")
          .exec();
      })
      .then(rows => {
        console.log(rows);
      });
    resolve();
  });
}
