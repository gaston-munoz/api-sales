import { Router } from 'express';
import {
  create,
  getAll,
  update
} from '../../controllers/products'

const router = Router();

router.get('/', getAll);
router.post('/', create);
router.put('/:id', update);

export default router;