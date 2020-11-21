import { Router } from 'express';
import {
  create,
  getAll
} from '../../controllers/users';

const router = Router();

router.get('/', getAll);
router.post('/', create);

export default router;