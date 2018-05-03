require("dotenv").config();
const nSQL = require("nano-sql").nSQL;
const RedisAdapter = require("nano-redis").RedisAdapter;
const tab = "Users";
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

const userModel = [
  // Data Model, required
  { key: "id", type: "uuid", props: ["pk"] }, // This has the primary key value
  { key: "name", type: "string", default: "None" }, // The 'default' will cause inserts to always use "None" if no value is provided.
  { key: "age", type: "int", props: ["idx"] }, // secondary index
  { key: "eyeColor", type: "string", props: ["trie"] }, // Index as trie
  { key: "balance", type: "float", default: 0 },
  { key: "postIDs", type: "array" },
  { key: "meta", type: "map" }
];

const postsModel = [
  { key: "id", type: "int", props: ["pk", "ai"] },
  { key: "title", type: "string" },
  { key: "date", type: "int" },
  { key: "author", type: "Users", props: ["ref=>myPosts[]"] }
];

const dbConfig = {
  cache: false,
  mode: new RedisAdapter(config)
};

const userActions = [
  // Optional
  {
    name: "add_new_user",
    args: ["user:map"],
    call: function(args, db) {
      return db.query("upsert", args.user).exec();
    }
  }
];

const userViews = [
  {
    name: "get_user_by_name",
    args: ["name:string"],
    call: function(args, db) {
      return db
        .query("select")
        .where(["name", "=", args.name])
        .exec();
    }
  },
  {
    name: "list_all_users",
    args: ["page:int"],
    call: function(args, db) {
      return db.query("select", ["id", "name"]).exec();
    }
  }
];

function userThen(rows) {
  console.log(rows);
}

// 1. declare your models
nSQL(tab)
  .model(userModel)
  .config(dbConfig)
  .actions(userActions)
  .views(userViews);

// 2. Connect the DB and execute queries
nSQL()
  .connect()
  .then(
    (async () => {
      await userAddAction();
    })()
  )
  .then(
    (async () => {
      await userGetView();
    })()
  );

function userAddAction() {
  new Promise((resolve, reject) => {
    nSQL()
      .doAction("add_new_user", {
        user: {
          id: null,
          name: "jim",
          age: 30,
          balance: 25.02,
          postIDs: [0, 20, 5],
          meta: {
            favorteColor: "blue"
          }
        }
      })
      .then(result => {
        console.log(result);
      });
    resolve();
  });
}

function userGetView() {
  new Promise((resolve, reject) => {
    nSQL()
      .getView("list_all_users")
      .then(rows => {
        console.log(rows);
      });
    resolve();
  });
}
