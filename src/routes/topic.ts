import { Router } from 'express';
import TopicController from '../controllers/topic';

const router = Router();

router.get('/', TopicController.all);
router.post('/', TopicController.save);
router.get('/:_id', TopicController.one);
router.delete('/:_id', TopicController.remove);

export default router;