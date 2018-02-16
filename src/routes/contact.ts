import { Router } from 'express';
import * as contactController from "../controllers/contact";

const router = Router();

router.get('/', contactController.getContact);
router.post('/', contactController.postContact);

export default router;