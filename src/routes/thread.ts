import { Router } from 'express';
import * as ThreadController from "../controllers/thread";
import * as passportConfig from "../config/passport";

// app.get("/thread", threadController.redirectToSingleTopic);
// app.get("/thread/threadId/:id", threadController.getOne);
// app.get("/thread/topicId/:id", threadController.getByTopicId);
// app.get("/thread/create", threadController.create);
// app.post("/thread/create", threadController.postCreate);

const router = Router();

router.get('/', ThreadController.redirectToSingleTopic);
router.get('/threadId/:_id', ThreadController.getOne);
router.get('/topicId/:_id', ThreadController.getByTopicId);
router.get('/create', passportConfig.isAuthenticated, ThreadController.create);
router.post('/create', passportConfig.isAuthenticated, ThreadController.postCreate);

export default router;