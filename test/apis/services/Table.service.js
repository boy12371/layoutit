module.exports = class Table {
  constructor(table) {
    this.table = table;
  }

  console() {
    console.log("[日志]: table=" + this.table);
  }
};
