module.exports.default = User => {
  User.statics = {
    loginByLocal(username, password) {
      console.log(password);
      return username;
    }
  };
};
