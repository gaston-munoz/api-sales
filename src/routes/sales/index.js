import { Router } from 'express';
import {
    create,
    getAll,
    getById,
    getPurchasesByUser,
    getSalesByUser
} from '../../controllers/sales';
import { isAdmin, isAuthenticated } from '../../middleware/auth';

const router = Router();

router.get('/', isAdmin, getAll);
router.get('/user', isAuthenticated, getSalesByUser);
router.get('/user-purchases', isAuthenticated, getPurchasesByUser);
router.get('/:id', isAuthenticated, getById);

router.post('/', isAuthenticated, create);

export default router;
