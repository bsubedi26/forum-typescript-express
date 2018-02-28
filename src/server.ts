import * as errorHandler from "errorhandler";
import * as dotenv from "dotenv";
/**
 * Configure dev environments before importing app
 * to allow applicatin to access .env variables
 */
(process.env.NODE_ENV !== "production" && dotenv.config({ path: ".env.development" }));
import app from "./app";

/**
 * errorHandler - remove for production
 */
(process.env.NODE_ENV !== "production" && app.use(errorHandler()));

/**
 * catch app process unhandled rejections
 */
process.on("unhandledRejection", (err) => console.log("unhandledRejection: ", err));

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

export default server;