import { Router } from 'express';
import {
    getAll,
    create,
    getById,
    update
} from '../../controllers/category';
 
const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.post('/', create);

export default router;
