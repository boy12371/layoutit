const UsersResponse = require("./response");
const UsersService = require("../../services/Users.service");

const table = "Users";

module.exports = function(app) {
  // 新增用户信息(支持批量)
  app.post("/user/add", function(req, res) {
    // 局部变量
    let userInfo = { table: table };
    if (!req.body) {
      UsersResponse.USER_FAILED.setData({ detail: "参数不正确" });
      return res.status(400).json(UsersResponse.USER_FAILED);
    } else {
      userInfo.json = req.body;
      const user = new UsersService(userInfo);
      user.add(function(err, obj) {
        if (err) {
          UsersResponse.USER_FAILED.setData({ detail: "服务器异常" });
          res.status(400).json(UsersResponse.USER_FAILED);
        } else if (!obj) {
          UsersResponse.USER_FAILED.setData({ detail: "查询失败" });
          res.status(400).json(UsersResponse.USER_FAILED);
        } else {
          UsersResponse.USER_SUCCESS.setData({ detail: obj });
          res.status(200).json(UsersResponse.USER_SUCCESS);
        }
      });
    }
  });

  // 修改用户信息(支持批量)，只更新改动的字段
  app.patch("/user/update", function(req, res) {
    // 局部变量
    let userInfo = { table: table };
    if (!req.body) {
      UsersResponse.USER_FAILED.setData({ detail: "参数不正确" });
      return res.status(400).json(UsersResponse.USER_FAILED);
    } else {
      userInfo.json = req.body;
      const user = new UsersService(userInfo);
      user.update(function(err, obj) {
        if (err) {
          UsersResponse.USER_FAILED.setData({ detail: "服务器异常" });
          res.status(400).json(UsersResponse.USER_FAILED);
        } else if (!obj) {
          UsersResponse.USER_FAILED.setData({ detail: "查询失败" });
          res.status(400).json(UsersResponse.USER_FAILED);
        } else {
          UsersResponse.USER_SUCCESS.setData({ detail: obj });
          res.status(200).json(UsersResponse.USER_SUCCESS);
        }
      });
    }
  });

  // 修改用户信息(支持批量)，更新整条记录
  app.put("/user/update", function(req, res) {
    // 局部变量
    let userInfo = { table: table };
    if (!req.body) {
      UsersResponse.USER_FAILED.setData({ detail: "参数不正确" });
      return res.status(400).json(UsersResponse.USER_FAILED);
    } else {
      userInfo.json = req.body;
      const user = new UsersService(userInfo);
      user.update(function(err, obj) {
        if (err) {
          UsersResponse.USER_FAILED.setData({ detail: "服务器异常" });
          res.status(400).json(UsersResponse.USER_FAILED);
        } else if (!obj) {
          UsersResponse.USER_FAILED.setData({ detail: "查询失败" });
          res.status(400).json(UsersResponse.USER_FAILED);
        } else {
          UsersResponse.USER_SUCCESS.setData({ detail: obj });
          res.status(200).json(UsersResponse.USER_SUCCESS);
        }
      });
    }
  });

  // 统计数据表记录数(支持批量)
  app.post("/count", function(req, res) {
    // 局部变量
    let userInfo = { table: table };
    if (!req.body) {
      UsersResponse.USER_FAILED.setData({ detail: "参数不正确" });
      return res.status(400).json(UsersResponse.USER_FAILED);
    } else {
      userInfo.tables = req.body;
      const user = new UsersService(userInfo);
      user.count(function(err, obj) {
        if (err) {
          UsersResponse.USER_FAILED.setData({ detail: "服务器异常" });
          res.status(400).json(UsersResponse.USER_FAILED);
        } else if (!obj) {
          UsersResponse.USER_FAILED.setData({ detail: "查询失败" });
          res.status(400).json(UsersResponse.USER_FAILED);
        } else {
          UsersResponse.USER_SUCCESS.setData({ detail: obj });
          res.status(200).json(UsersResponse.USER_SUCCESS);
        }
      });
    }
  });

  // 获取用户信息(支持批量)
  app.post("/user/get", function(req, res) {
    // 局部变量
    let userInfo = { table: table };
    if (!req.body.ids) {
      UsersResponse.USER_FAILED.setData({ detail: "参数不正确" });
      return res.status(400).json(UsersResponse.USER_FAILED);
    } else {
      userInfo.ids = req.body.ids;
      if (req.body.fields !== undefined) userInfo.fields = req.body.fields;
      const user = new UsersService(userInfo);
      user.get(function(err, obj) {
        if (err) {
          UsersResponse.USER_FAILED.setData({ detail: "服务器异常" });
          res.status(400).json(UsersResponse.USER_FAILED);
        } else if (!obj) {
          UsersResponse.USER_FAILED.setData({ detail: "查询失败" });
          res.status(400).json(UsersResponse.USER_FAILED);
        } else {
          UsersResponse.USER_SUCCESS.setData({ detail: obj });
          res.status(200).json(UsersResponse.USER_SUCCESS);
        }
      });
    }
  });

  // 获取用户表的所有记录(支持批量)
  app.post("/getab", function(req, res) {
    if (!req.body) {
      UsersResponse.USER_FAILED.setData({ detail: "参数不正确" });
      return res.status(400).json(UsersResponse.USER_FAILED);
    } else {
      // 局部变量
      let userInfo = { search: {} };
      userInfo.search = req.body;
      const user = new UsersService(userInfo);
      user.getab(function(err, obj) {
        if (err) {
          UsersResponse.USER_FAILED.setData({ detail: "服务器异常" });
          res.status(400).json(UsersResponse.USER_FAILED);
        } else if (!obj) {
          UsersResponse.USER_FAILED.setData({ detail: "查询失败" });
          res.status(400).json(UsersResponse.USER_FAILED);
        } else {
          UsersResponse.USER_SUCCESS.setData({ detail: obj });
          res.status(200).json(UsersResponse.USER_SUCCESS);
        }
      });
    }
  });

  // 搜索信息
  app.post("/search", function(req, res) {
    if (!req.body.q) {
      UsersResponse.USER_FAILED.setData({ detail: "参数不正确" });
      return res.status(400).json(UsersResponse.USER_FAILED);
    } else {
      // 局部变量
      let userInfo = { search: {} };
      userInfo.search.q = req.body.q;
      userInfo.search.type = "or";
      if (req.body.fields !== undefined)
        userInfo.search.fields = req.body.fields;
      if (req.body.collection === undefined) {
        userInfo.search.collection = table;
      } else {
        userInfo.search.collection = req.body.collection;
      }
      const user = new UsersService(userInfo);
      user.search(function(err, obj) {
        if (err) {
          UsersResponse.USER_FAILED.setData({ detail: "服务器异常" });
          res.status(400).json(UsersResponse.USER_FAILED);
        } else if (!obj) {
          UsersResponse.USER_FAILED.setData({ detail: "查询失败" });
          res.status(400).json(UsersResponse.USER_FAILED);
        } else {
          UsersResponse.USER_SUCCESS.setData({ detail: obj });
          res.status(200).json(UsersResponse.USER_SUCCESS);
        }
      });
    }
  });

  // 删除数据表(支持批量)
  app.delete("/clear", function(req, res) {
    // 局部变量
    let userInfo = {};
    if (!req.body) {
      UsersResponse.USER_FAILED.setData({ detail: "参数不正确" });
      return res.status(400).json(UsersResponse.USER_FAILED);
    } else {
      userInfo.tables = req.body;
      const user = new UsersService(userInfo);
      user.clear(function(err, obj) {
        if (err) {
          UsersResponse.USER_FAILED.setData({ detail: "服务器异常" });
          res.status(400).json(UsersResponse.USER_FAILED);
        } else if (!obj) {
          UsersResponse.USER_FAILED.setData({ detail: "查询失败" });
          res.status(400).json(UsersResponse.USER_FAILED);
        } else {
          UsersResponse.USER_SUCCESS.setData({ detail: obj });
          res.status(200).json(UsersResponse.USER_SUCCESS);
        }
      });
    }
  });

  // 删除用户信息(支持批量)
  app.delete("/user/delete", function(req, res) {
    // 局部变量
    let userInfo = {};
    if (!req.body) {
      UsersResponse.USER_FAILED.setData({ detail: "参数不正确" });
      return res.status(400).json(UsersResponse.USER_FAILED);
    } else {
      userInfo.ids = req.body;
      const user = new UsersService(userInfo);
      user.remove(function(err, obj) {
        if (err) {
          UsersResponse.USER_FAILED.setData({ detail: "服务器异常" });
          res.status(400).json(UsersResponse.USER_FAILED);
        } else if (!obj) {
          UsersResponse.USER_FAILED.setData({ detail: "查询失败" });
          res.status(400).json(UsersResponse.USER_FAILED);
        } else {
          UsersResponse.USER_SUCCESS.setData({ detail: obj });
          res.status(200).json(UsersResponse.USER_SUCCESS);
        }
      });
    }
  });
};
