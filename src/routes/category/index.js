import { Router } from 'express';
import {
    getAll,
    create,
    getById,
    update
} from '../../controllers/category';
import { isAuthenticated } from '../../middleware/auth';
 
const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', isAuthenticated, update);
router.post('/', isAuthenticated, create);

export default router;
