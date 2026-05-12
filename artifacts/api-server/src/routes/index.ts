import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import readingRouter from "./reading.js";
import askAnythingRouter from "./askAnything.js";
import gongsuRouter from "./gongsu.js";
import faceReadingRouter from "./face-reading.js";
import faceImageRouter from "./face-image.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(readingRouter);
router.use(askAnythingRouter);
router.use(gongsuRouter);
router.use(faceReadingRouter);
router.use(faceImageRouter);

export default router;
