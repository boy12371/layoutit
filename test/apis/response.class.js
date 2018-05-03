const Response = class BaseResponse {
  constructor(code, msg, data) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  setCode(code) {
    this.code = code;
  }

  getCode() {
    return this.code;
  }

  setMsg(msg) {
    this.msg = msg;
  }

  getMsg() {
    return this.msg;
  }

  setData(data) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  getRes() {
    return { code: this.code, msg: this.msg, data: this.data };
  }
};

module.exports = {
  CLASS: Response,
  SUCCESS: new Response(0, "成功", {}),
  FAILED: new Response(1, "失败", {})
};
