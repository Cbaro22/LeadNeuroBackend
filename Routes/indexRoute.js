import express from 'express';
import staffRoutes from './staffRoute.js';
import drugRoutes from './drugRoute.js';
import nurseRoutes from './nurseRoute.js';
import cleanerRoutes from './cleanerRoute.js';
import doctorRoutes from './doctorRoute.js';



const router = express.Router();

router.use("/staff", staffRoutes);
router.use("/drug", drugRoutes);
router.use("/nurse", nurseRoutes);
router.use("/cleaner", cleanerRoutes);
router.use("/doctor", doctorRoutes);

export default router;