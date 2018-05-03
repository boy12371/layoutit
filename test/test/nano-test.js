import config from "../config";
import { nSQL } from "nano-sql";
import { RedisAdapter } from "nano-redis";
import fs from "fs";
import Users from "./nano-users";

Users.avModel();

(async function run() {
  await require("../lib/redis").connect();
})();

nSQL().onConnected(() => {
  // 新增数据
  // Users.addMultiple([
  //   {
  //     id: null,
  //     username: "tom",
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
  //     email: "tom@kuangjia.org",
  //     phone: "13888888881",
  //     modify_date: Date.now(),
  //     create_date: Date.now()
  //   },
  //   {
  //     id: null,
  //     username: "richard",
  //     password: "123456",
  //     nickname: "王富贵",
  //     sex: "男",
  //     avatar: "",
  //     qq: "1607408",
  //     wechat: "",
  //     alipay: "",
  //     bankno: "",
  //     address: "",
  //     regip: "",
  //     email: "richard@kuangjia.org",
  //     phone: "13888888882",
  //     modify_date: Date.now(),
  //     create_date: Date.now()
  //   }
  // ])
  //   .then(result => {
  //     console.log(result);
  //     return Users.listAll();
  //   })
  //   .then(function(result) {
  //     console.log(result);
  //   });
  // 查询数据
  // Users.listAll().then(result => {
  //   console.log(result);
  // });
  // Users.getJoin(1).then(result => {
  //   console.log(result);
  // });
  // nSQL(usersTab)
  //   .query("select", ["id", "username"])
  //   .range(3, 1)
  //   .exec()
  //   .then(result => {
  //     console.log(result);
  //   });
  // Users.countAll().then(result => {
  //   console.log(result);
  // });
  // 清空数据
  // (async function clear() {
  //   let clearUsers = new Promise((resolve, reject) => {
  //     Users.clearData().then(result => {
  //       console.log(result);
  //       console.log("用户表数据清空完成");
  //       resolve();
  //     });
  //   });
  //   let clearTransaction = new Promise((resolve, reject) => {
  //     nSQL(transactionTab)
  //       .doAction("clear_all_transaction")
  //       .then(result => {
  //         console.log(result);
  //         console.log("投注交易表数据清空完成");
  //         resolve();
  //       });
  //   });
  //   await Promise.all([clearUsers]).then(() => {
  //     console.log("清空数据完成");
  //   });
  // })();
  // 导入数据
  // (async function load() {
  //   let loadUsers = new Promise((resolve, reject) => {
  //     Users.loadData().then(result => {
  //       console.log(result);
  //       console.log("用户表数据导入完成");
  //       resolve();
  //     });
  //   });
  //   let loadTransaction = new Promise((resolve, reject) => {
  //     nSQL()
  //       .loadJS(transactionTab, transactionData)
  //       .then(result => {
  //         console.log(result);
  //         console.log("投注交易表数据导入完成");
  //         resolve();
  //       });
  //   });
  //   await Promise.all([loadUsers]).then(() => {
  //     console.log("数据全部导入完成");
  //   });
  // })();
  // 导出数据
  // (async function expo() {
  //   let expoUsers = new Promise((resolve, reject) => {
  //     Users.expoData().then(() => {
  //       console.log("用户表数据导出完成");
  //       resolve();
  //     });
  //   });
  //   let expoTransaction = new Promise((resolve, reject) => {
  //     nSQL(transactionTab)
  //       .getView("list_all_transaction")
  //       .then(rows => {
  //         fs.writeFileSync(
  //           "./src/data/backup/transaction.json",
  //           JSON.stringify(rows)
  //         );
  //         console.log("投注交易表数据导出完成");
  //         resolve();
  //       });
  //   });
  //   await Promise.all([expoUsers]).then(() => {
  //     console.log("数据全部导出完成");
  //   });
  // })();
});
