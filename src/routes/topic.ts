import { Router } from 'express';
import * as TopicController from '../controllers/topic';

const router = Router();

router.get('/', TopicController.all);
router.post('/', TopicController.postCreate);
router.get('/:_id', TopicController.getOne);
router.delete('/:_id', TopicController.remove);

export default router;