const Table = require("./Table.service");
const db = require("../common/redis.db");

let userData = {};

module.exports = class Users extends Table {
  constructor(userInfo) {
    super();
    userData = userInfo;
    Users.userDb = new db(userData);
  }

  // 新增用户信息(支持批量)
  add(callFunc) {
    Users.userDb.save(callFunc);
  }

  // 修改用户信息(支持批量)
  update(callFunc) {
    Users.userDb.save(callFunc);
  }

  // 统计数据表记录数(支持批量)
  count(callFunc) {
    Users.userDb.count(callFunc);
  }

  // 获取用户信息(支持批量)
  get(callFunc) {
    Users.userDb.get(callFunc);
  }

  // 获取用户信息(支持批量)
  getab(callFunc) {
    Users.userDb.getab(callFunc);
  }

  // 搜索用户信息
  search(callFunc) {
    Users.userDb.search(callFunc);
  }

  // 删除数据表(支持批量)
  clear(callFunc) {
    Users.userDb.clear(callFunc);
  }

  // 删除用户信息(支持批量)
  remove(callFunc) {
    Users.userDb.remove(callFunc);
  }
};
