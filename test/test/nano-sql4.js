const nanoo = require("../lib/redis/nanoo");
const nanooPaginate = require("../lib/redis/nanoo.paginate");

const Schema = nanoo.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required."],
    unique: true
  }
});

UserSchema.path("username").index({ unique: true });

UserSchema.plugin(nanooPaginate);
require("./user.statics").default(UserSchema);

console.log(nanoo.model("Caipiao", UserSchema));
