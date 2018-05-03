const BaseResponse = require("../../common/response.class");

class Response extends BaseResponse.CLASS {}

module.exports = {
  USER_SUCCESS: BaseResponse.SUCCESS,
  USER_FAILED: BaseResponse.FAILED,
  USER_PASSWORD_ERROR: new Response(101, "用户名或密码错误", {}),
  USER_CAPTCHA_ERROR: new Response(102, "验证码错误", {}),
  USER_READ_ERROR: new Response(103, "该用户不存在", {})
};
