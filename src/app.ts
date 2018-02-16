import * as express from "express";
import expressConfiguration from "./config/express-configuration";
import { topic, thread, contact, user, root, account, api, auth } from "./routes";
import dontCache from "./middlewares/dont-cache";

/**
 * Mongo/Mongoose configuration.
 */
import "./config/mongoose-configuration";

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration (setters/middlewares).
 */
expressConfiguration(app);

/**
 * Application Routes.
 */

app.use("/", root);
app.use('/contact', contact);
app.use('/thread', thread);
app.use('/topic', topic);
app.use('/user', user);
app.use('/account', dontCache, account);
app.use('/api', api);
app.use('/auth', auth);


export default app;