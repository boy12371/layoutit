import fs from "fs";

const tab = "Transaction";

const model = [
  { key: "id", type: "int", props: ["pk", "ai"] },
  { key: "userid", type: "int" },
  { key: "transaction", type: "int[]" },
  { key: "date", type: "int" },
  { key: "modify_date", type: "int" },
  { key: "create_date", type: "int" }
];

const rowFilter = row => {
  if (row.age > 100) row.age = 100;
  return row;
};

const actions = [
  {
    name: "add_new_transaction",
    args: ["transaction:map"],
    call: function(args, db) {
      return db.query("upsert", args.transaction).exec();
    }
  },
  {
    name: "clear_all_transaction",
    call: function(args, db) {
      return db.query("drop").exec();
    }
  }
];

const views = [
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

const data = JSON.parse(
  fs.readFileSync("./src/data/origin/transaction.json", "utf8")
);

export { tab as default, model, rowFilter, actions, views, data };
