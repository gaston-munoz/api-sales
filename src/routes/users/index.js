import { Router } from 'express';
import { isAuthenticated } from '../../middleware/auth';
import {
  create,
  getAll,
  getById,
  update,
  signIn
} from '../../controllers/users';

const router = Router();

router.post('/signin', signIn);
router.get('/', isAuthenticated, getAll);
router.get('/:id', getById);               
router.post('/registry', create);
router.put('/:id', isAuthenticated, update);

export default router;
