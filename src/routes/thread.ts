import { Router } from 'express';
import * as ThreadController from "../controllers/thread";
import * as passportConfig from "../config/passport";
import removeEmptyBodyProps from "../middlewares/remove-empty-body-props";

const router = Router();

router.get('/', ThreadController.get);
router.get('/:_id', ThreadController.getOne);
router.post('/remove/:_id', ThreadController.remove);
router.post('/edit/:_id', removeEmptyBodyProps, ThreadController.edit);
router.get('/:topicId', ThreadController.getByTopicId);
router.get('/:topicId/create', passportConfig.isAuthenticated, ThreadController.create);
router.post('/:topicId/create', passportConfig.isAuthenticated, ThreadController.postCreate);

export default router;