import { Router } from 'express';
import {
  create,
  getAll,
  getById,
  getUserProducts,
  update
} from '../../controllers/products'
import { isAuthenticated } from '../../middleware/auth';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', isAuthenticated, create); 
router.put('/:id', isAuthenticated, update);
router.get('/user/:id', getUserProducts)

export default router;
