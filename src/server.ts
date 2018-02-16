import * as dotenv from "dotenv";
dotenv.config({ path: ".env.development" });
import * as errorHandler from "errorhandler";
import app from "./app";

/**
 * errorHandler - remove for production
 */
app.use(errorHandler());

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