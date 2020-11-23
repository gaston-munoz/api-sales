import { Router } from 'express';
import {
  showHome
} from '../../controllers/home'

const router = Router();

router.get('/', showHome);

export default router;
