import { ENV } from "./env.js";
import schema from "../"

export default {
    schema : "./src/db/schema.js",
    out : "./src/db/migrations",
    dialect : "postgresql",
    dbCredentials : {uri: ENV.DATABASE_URL}
}