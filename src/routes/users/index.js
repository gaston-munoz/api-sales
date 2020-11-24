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

router.get('/', isAuthenticated, getAll);
router.get('/:id', getById);               
router.put('/:id', isAuthenticated, update);
router.post('/registry', create);
router.post('/signin', signIn);


export default router;
