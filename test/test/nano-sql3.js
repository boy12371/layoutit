require("dotenv").config();
const fs = require("fs");
const nSQL = require("nano-sql").nSQL;
const RedisAdapter = require("nano-redis").RedisAdapter;
const cron = require("node-cron");

const usersTab = "Users";
const transactionTab = "Transaction";
const betnumberTab = "Betnumber";
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
  { key: "id", type: "int", props: ["pk", "ai"] },
  { key: "username", type: "string", default: "None" },
  { key: "password", type: "string", default: "None" },
  { key: "nickname", type: "string" },
  { key: "sex", type: "string" },
  { key: "avatar", type: "string" },
  { key: "qq", type: "string" },
  { key: "wechat", type: "string" },
  { key: "alipay", type: "string" },
  { key: "bankno", type: "string" },
  { key: "address", type: "string" },
  { key: "regip", type: "string" },
  { key: "email", type: "string" },
  { key: "phone", type: "string" },
  { key: "modify_date", type: "int" },
  { key: "create_date", type: "int" }
];

const transactionModel = [
  { key: "id", type: "int", props: ["pk", "ai"] },
  { key: "userid", type: "int" },
  { key: "transaction", type: "int[]" },
  { key: "date", type: "int" },
  { key: "modify_date", type: "int" },
  { key: "create_date", type: "int" }
];

const betnumberModel = [
  { key: "id", type: "int", props: ["pk", "ai"] },
  { key: "num", type: "string" },
  { key: "multiple", type: "int" },
  { key: "betmethodid", type: "int" },
  { key: "modify_date", type: "int" },
  { key: "create_date", type: "int" }
];

const userFilter = row => {
  if (row.age > 100) row.age = 100;
  return row;
};

const userActions = [
  {
    name: "add_new_user",
    args: ["user:map"],
    call: function(args, db) {
      return db.query("upsert", args.user).exec();
    }
  }
];

const transactionActions = [
  {
    name: "add_new_transaction",
    args: ["transaction:map"],
    call: function(args, db) {
      return db.query("upsert", args.transaction).exec();
    }
  }
];

const betnumberActions = [
  {
    name: "add_new_betnumber",
    args: ["betnumber:map"],
    call: function(args, db) {
      return db.query("upsert", args.betnumber).exec();
    }
  }
];

const userViews = [
  {
    name: "get_user_by_id",
    args: ["id:int"],
    call: function(args, db) {
      return db
        .query("select")
        .where(["id", "=", args.id])
        .exec();
    }
  },
  {
    name: "list_all_users",
    call: (args, db) => {
      return db.query("select").exec();
    }
  }
];

const transactionViews = [
  {
    name: "get_transaction_by_id",
    args: ["id:int"],
    call: function(args, db) {
      return db
        .query("select")
        .where(["id", "=", args.id])
        .exec();
    }
  },
  {
    name: "list_all_transaction",
    call: (args, db) => {
      return db.query("select").exec();
    }
  }
];

const betnumberViews = [
  {
    name: "get_betnumber_by_id",
    args: ["id:int"],
    call: function(args, db) {
      return db
        .query("select")
        .where(["id", "=", args.id])
        .exec();
    }
  },
  {
    name: "list_all_betnumber",
    call: (args, db) => {
      return db.query("select").exec();
    }
  }
];

const dbConfig = {
  cache: false,
  mode: new RedisAdapter(config)
};

// 1、用户表Users
const usersData = fs.readFileSync("./src/data/origin/users.json", "utf8");
// 2、彩种分类表category
// 3、游戏表game
// 4、开奖时间周期表period
// 5、开奖结果bonusresult
// 6、投注交易表Transaction(每条记录即一张彩票或者一个订单)
const transactionData = fs.readFileSync(
  "./src/data/origin/transaction.json",
  "utf-8"
);
// 7、交易数字表(每条记录即交易时投注的数字)Betnumber
const betnumberData = fs.readFileSync(
  "./src/data/origin/betnumber.json",
  "utf-8"
);
// 8、投注结果表(每条记录即投注的数字拆分后的开奖结果)betresult
// 9、通知表notice
// 10、派奖表（根据交易流水号派奖）distribute
// 11、投注方式(每条记录即每个游戏的投注方式)betmethod

// 1. Declare Model & Setup
nSQL(usersTab)
  .model(userModel)
  .rowFilter(function(row) {
    console.log(row);
    return row;
  })
  .connect()
  .then(
    nSQL(usersTab)
      .query("upsert", { nickname: "billy" })
      .exec()
  );
// .actions(userActions)
// .views(userViews);
// nSQL(transactionTab)
//   .model(transactionModel)
//   .actions(transactionActions)
//   .views(transactionViews);
// nSQL(betnumberTab)
//   .model(betnumberModel)
//   .actions(betnumberActions)
//   .views(betnumberViews);

// 2. Connect the DB and execute queries
// nSQL()
//   .config(dbConfig)
//   .connect();

nSQL("*").on("change", (event, db) => {
  const eventLogs = {
    query: {
      // an object describing the query
      table: event.query.table, // the table used for this query
      action: event.query.action, // the 1st argument passed into .query()
      actionArgs: event.query.actionArgs, // the 2nd argument passed into .query()
      state: event.query.state, // the state the query is in
      result: event.query.result, // the result of the query passed through the promise.
      //comments: [], // if .comment() was called, the comments will be here
      //queryID: "13ilfa", // a random 16 bit number used to identify this query.
      //transaction: false, // wether this was part of a transaction or not.
      where: event.query.where, // if .where() was used, the argument passed into it will be here.
      //range: undefined, // if .range() was used, an array will be here coorosponding to the arguments passed in.
      orm: event.query.orm, // if .orm() was used, argument will be here.
      orderBy: event.query.orderBy, // if .orderBy() was used, argument will be here.
      groupBy: event.query.groupBy, // if .groupBy() was used, argument will be here.
      having: event.query.having, // if .having() was used, argument will be here.
      join: event.query.join, // if .join() was used, argument will be here.
      limit: event.query.limit, // if .limit() was used, argument will be here.
      offset: event.query.offset, // if .offset() was used, argument will be here.
      trie: event.query.trie // if .trie() was used an object will be here like this: {column, search}
    },
    table: event.table, // table attached to the evet
    time: event.time, // unix timestamp of when the query happened.
    result: event.result, // result of the query passed into the promise.
    types: event.types, // all events called for this query
    actionOrView: event.actionOrView, // if an actor or view was used, it's name will be here.
    //transactionID: undefined, // if this was part of a transaction, the transactionID will be here.
    affectedRowPKS: event.affectedRowPKS, //Primary keys of affected rows, empty array of no effected rows.
    affectedRows: event.affectedRows
  };
  // console.log("========[DB logs]=======");
  // console.log(eventLogs);
});

// nSQL(userTab).doAction("add_new_user", {
//   user: {
//     id: null,
//     username: "richard",
//     password: "123456",
//     nickname: "王富贵",
//     sex: "男",
//     avatar: "",
//     qq: "1607409",
//     wechat: "",
//     alipay: "",
//     bankno: "",
//     address: "",
//     regip: "",
//     email: "richard@kuangjia.org",
//     phone: "13888888881",
//     modify_date: Date.now(),
//     create_date: Date.now()
//   }
// });

// nSQL(transactionTab).doAction("add_new_transaction", {
//   transaction: {
//     id: null,
//     userid: 1,
//     transaction: [1, 2, 3],
//     modify_date: Date.now(),
//     create_date: Date.now()
//   }
// });

// nSQL(betnumberTab).doAction("add_new_betnumber", {
//   betnumber: {
//     id: 1,
//     num: "1#2#3#4#5#6#7",
//     multiple: 2,
//     betmethodid: 1,
//     modify_date: 1523762700616,
//     create_date: 1523762700616
//   }
// });

// nSQL().onConnected(() => {
//   nSQL(usersTab)
//     .query("drop")
//     .exec();
//   nSQL(transactionTab)
//     .query("drop")
//     .exec();
//   nSQL(betnumberTab)
//     .query("drop")
//     .exec();
// });

// nSQL().onConnected(() => {
// nSQL().loadJS(usersTab, JSON.parse(usersData));
//   nSQL().loadJS(transactionTab, transactionData);
//   nSQL().loadJS(betnumberTab, betnumberData);
// });

// cron.schedule("* * * * *", function() {
//   console.log("running backup every minute");
//   nSQL().onConnected(() => {
//     nSQL(usersTab)
//       .getView("list_all_users")
//       .then(rows => {
//         fs.writeFile(
//           "./src/data/backup/users.json",
//           JSON.stringify(rows),
//           function(err) {
//             if (err) {
//               return console.error(err);
//             }
//           }
//         );
//       });
// nSQL(transactionTab)
//   .getView("list_all_transaction")
//   .then(function(rows) {
//     console.log(rows);
//   });
// nSQL(betnumberTab)
//   .getView("list_all_betnumber")
//   .then(function(rows) {
//     console.log(rows);
//   });
//   });
// });

// nSQL()
//   .query("show tables")
//   .exec()
//   .then(function(rows) {
//     console.log(rows);
//   });

// nSQL()
//   .query("describe")
//   .exec()
//   .then(function(rows) {
//     console.log(rows);
//   });
