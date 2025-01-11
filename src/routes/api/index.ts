import { Router } from 'express';
import { courseRouter } from './userRoutes.js';
import { studentRouter } from './thoughtRoutes.js';

const router = Router();

router.use('/courses', courseRouter);
router.use('/students', studentRouter);

export default router;
