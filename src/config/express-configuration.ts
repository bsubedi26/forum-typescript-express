import * as express from "express";
import * as compression from "compression";
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as lusca from "lusca";
import * as mongo from "connect-mongo";
import * as flash from "express-flash";
import * as path from "path";
import * as passport from "passport";
import * as expressValidator from "express-validator";

export default function(app) {
  const mongoUrl = process.env.MONGODB_URI;
  const MongoStore = mongo(session);

  app.set("port", process.env.PORT || 3000);
  app.set("views", path.join(__dirname, "../../views"));
  app.set("view engine", "pug");
  app.use(compression());
  app.use(logger("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(expressValidator());
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      url: mongoUrl,
      autoReconnect: true
    })
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use(lusca.xframe("SAMEORIGIN"));
  app.use(lusca.xssProtection(true));
  app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });
  app.use((req, res, next) => {
    // After successful login, redirect back to the intended page
    if (!req.user &&
      req.path !== "/login" &&
      req.path !== "/signup" &&
      !req.path.match(/^\/auth/) &&
      !req.path.match(/\./)) {
      req.session.returnTo = req.path;
    } else if (req.user &&
      req.path == "/account") {
      req.session.returnTo = req.path;
    }
    next();
  });
  app.use(express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 }));

}