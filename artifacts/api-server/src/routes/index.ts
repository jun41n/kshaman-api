import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import readingRouter from "./reading.js";
import askAnythingRouter from "./askAnything.js";
import gongsuRouter from "./gongsu.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(readingRouter);
router.use(askAnythingRouter);
router.use(gongsuRouter);

export default router;
