// require("dotenv").config();
// const flatten = require("flat");
// const hash = require("redis-hashes")({
//   prefix: process.env.DB_NAME,
//   separator: "-",
//   redis: {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     retry_strategy: function(options) {
//       if (options.error && options.error.code === "ECONNREFUSED") {
//         throw new Error(
//           options.error.address +
//             ":" +
//             options.error.port +
//             ":" +
//             options.error.errno
//         );
//       }
//     }
//   }
// });
// const redis = require("redis-clients")({
//   prefix: process.env.DB_NAME,
//   separator: "-",
//   redis: {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     retry_strategy: function(options) {
//       if (options.error && options.error.code === "ECONNREFUSED") {
//         throw new Error(
//           options.error.address +
//             ":" +
//             options.error.port +
//             ":" +
//             options.error.errno
//         );
//       }
//     }
//   }
// });

// const db = class DB {
//   constructor(data) {
//     this.data = data;
//     DB.hash = hash;
//     DB.redis = redis;
//   }

//   // init redis
//   clientConnect() {
//     DB.hash.client();
//     console.log("Connect to Redis server...");
//   }

//   // 存储（创建或更新）记录，支持批量
//   save(callback) {
//     function flatFunc(obj) {
//       let result = [];
//       if (Array.isArray(obj)) {
//         for (var i in obj) {
//           result = result.concat(flatten(obj[i]));
//         }
//       } else {
//         result = flatten(obj);
//       }
//       return result;
//     }
//     console.log(flatFunc(this.data.json));
//     DB.hash.save(
//       flatFunc(this.data.json),
//       { collection: this.data.table },
//       callback
//     );
//   }

//   // 统计数据表记录数(支持批量)
//   count(callback) {
//     DB.hash.count(...this.data.tables, callback);
//   }

//   // 获取记录(支持批量)
//   get(callback) {
//     if (this.data.fields === undefined) {
//       DB.hash.get(...this.data.ids, callback);
//     } else {
//       DB.hash.get(...this.data.ids, { fields: this.data.fields }, callback);
//     }
//   }

//   // 获取限定表的所有记录(支持批量)
//   getab(callback) {
//     DB.hash.all(this.data.search[0], callback);
//   }

//   // 搜索记录
//   search(callback) {
//     const indexKey = DB.hash.indexKey(this.data.search.collection);
//     DB.hash.indexes[indexKey] =
//       DB.hash.indexes[indexKey] || DB.hash.reds.createSearch(indexKey);
//     DB.hash.search(this.data.search, callback);
//   }

//   // 删除数据表(不支持批量)
//   clear(callback) {
//     DB.redis.client();
//     console.log("Connect to Redis server on new client");
//     DB.redis.clear(...this.data.tables, callback);
//   }

//   // 删除用户信息(支持批量)
//   remove(callback) {
//     DB.hash.remove(...this.data.ids, callback);
//   }
// };

// module.exports = db;
