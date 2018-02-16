import * as mongoose from "mongoose";
import * as bluebird from "bluebird";

const mongoUrl = process.env.MONGODB_URI;
(<any>mongoose).Promise = bluebird;
mongoose.connect(mongoUrl, { useMongoClient: true })
  .then(() => console.log("MongoDB connection successful."))
  .catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
  });