import { Router } from 'express';
import { imageMakeHandle } from '../controllers/controller';

const router = Router();

router.post('/imageMake', imageMakeHandle);

export default router;