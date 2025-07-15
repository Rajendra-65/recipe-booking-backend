import { ENV } from "./src/config/env"
import schema from "../"

export default {
    schema: "./src/db/schema.js",     // change to your actual schema path
    out: "./src/db/migrations",            // this matches your migration folder
    dialect: "postgresql",
    dbCredentials: {
        url : ENV.DATABASE_URL,
    },
}