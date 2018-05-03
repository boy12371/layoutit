import { nSQL } from "nano-sql";
import UsersFilter from "./hooks/user.hook";
import UsersActions from "./statics/user.static";
import UsersViews from "./methods/user.method";

const UsersModel = [
  { key: "id", type: "int", props: ["pk", "ai"] },
  { key: "username", type: "string", props: ["idx"] },
  { key: "password", type: "string" },
  { key: "name", type: "string" },
  { key: "lastname", type: "string" },
  { key: "email", type: "string" },
  { key: "photo", type: "string" },
  { key: "provider", type: "string", default: "local" },
  { key: "roles", type: "string[]", default: ["user"] },
  { key: "status", type: "int", default: 1 },
  { key: "data", type: "int" },
  { key: "lastLogin", type: "int" },
  { key: "social", type: "string" }
];

export default nSQL("Users")
  .model(UsersModel)
  .avFilter(UsersFilter)
  .actions(UsersActions)
  .views(UsersViews);
