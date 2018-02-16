import { Router } from 'express';
import * as ApiController from "../controllers/api";
import * as passportConfig from "../config/passport";
import * as mongoose from 'mongoose';
import dontCache from "../middlewares/dont-cache";

const router = Router();

/**
 * API routes.
 */
router.get('/', ApiController.getApi);
router.get("/facebook", dontCache, passportConfig.isAuthenticated, passportConfig.isAuthorized, ApiController.getFacebook);

router.get("/timestamp", async (req, res) => {
  console.log("api/timestamp");
  const doc = await mongoose.model("Topic").findOne();
  const timestamp = doc._id.getTimestamp();
  console.log('timestamp: ', timestamp);
  res.json({ doc, timestamp });
});

export default router;