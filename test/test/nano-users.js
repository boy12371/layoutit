import fs from "fs";
import { nSQL } from "nano-sql";

const tab = "Users";
export { tab };

const model = [
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

const rowFilter = row => {
  return row;
};

const actions = [
  {
    name: "add_new_user",
    args: ["user:map"],
    call: function(args, db) {
      return db.query("upsert", args.user).exec();
    }
  },
  {
    name: "add_multiple_users",
    args: ["users:map[]"],
    call: function(args, db) {
      return Promise.all(
        args.users.map(user => db.query("upsert", user).exec())
      );
    }
  },
  {
    name: "delete_by_id",
    args: ["id:int"],
    call: function(args, db) {
      return db
        .query("delete")
        .where(["id", "=", args.id])
        .exec();
    }
  },
  {
    name: "delete_by_ids",
    args: ["ids:int[]"],
    call: function(args, db) {
      return Promise.all(
        args.ids.map(id =>
          db
            .query("delete")
            .where(["id", "=", id])
            .exec()
        )
      );
    }
  },
  {
    name: "clear_all_users",
    call: function(args, db) {
      return db.query("drop").exec();
    }
  }
];

const views = [
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
    name: "get_user_join_trans",
    args: ["id:int"],
    call: function(args, db) {
      return db
        .query("select", ["Users.id", "UPPER(Users.username) AS Customer"])
        .join({
          type: "left",
          table: "Transaction",
          where: ["Users.id", "=", "Transaction.userid"]
        })
        .where(["Users.id", "=", args.id])
        .exec();
    }
  },
  {
    name: "count_all_users",
    call: (args, db) => {
      return db.query("select", ["COUNT(*) AS totalUsers"]).exec();
    }
  },
  {
    name: "list_all_users",
    call: (args, db) => {
      return db.query("select").exec();
    }
  },
  {
    name: "search_specific_fields",
    args: ["q:string", "fields:string"],
    call: (args, db) => {
      let valArr = [];
      args.fields.split(",").forEach((item, index) => {
        valArr[index] = [item, "LIKE", args.q];
      });
      let result = [];
      for (let i = 0; i < valArr.length; i++) {
        result.push(valArr[i]);
        result.push("AND");
      }
      result.pop();
      return db
        .query("select", ["id", "UPPER(username)"])
        .where(result)
        .exec();
    }
  }
];

const originData = "./src/data/origin/users.json";
const backupData = "./src/data/backup/users.json";

const UserSchema = {
  tab: tab,
  model: model,
  rowFilter: rowFilter,
  actions: actions,
  views: views,
  avModel: () =>
    nSQL(tab)
      .model(model)
      .rowFilter(rowFilter)
      .actions(actions)
      .views(views),
  clearData: () => nSQL(tab).doAction("clear_all_users"),
  loadData: () =>
    nSQL().loadJS(tab, JSON.parse(fs.readFileSync(originData, "utf8"))),
  expoData: () =>
    nSQL(tab)
      .getView("list_all_users")
      .then(rows => {
        fs.writeFileSync(backupData, JSON.stringify(rows));
      }),
  addMultiple: items =>
    nSQL(tab).doAction("add_multiple_users", {
      users: items
    }),
  listAll: () => nSQL(tab).getView("list_all_users"),
  getJoin: id => nSQL(tab).getView("get_user_join_trans", { id: id }),
  countAll: () => nSQL(tab).getView("count_all_users"),
  searchAll: () =>
    nSQL(tab).getView("search_specific_fields", {
      q: "richard",
      fields: "username,nickname"
    }),
  deleteById: () => nSQL(tab).doAction("delete_by_id", { id: 1 }),
  deleteByIds: () => nSQL(tab).doAction("delete_by_ids", { ids: [1, 2, 3] })
};

export default UserSchema;
