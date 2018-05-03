import Schema from "../lib/redis/nanoo.schema";

const Users = new Schema("Users");

require("../api/models/hooks/user.hook").default(Users);
require("../api/models/statics/user.static").default(Users);
require("../api/models/methods/user.method").default(Users);

console.log(Users);
