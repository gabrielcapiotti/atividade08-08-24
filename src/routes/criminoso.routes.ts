import { Router } from "express";
import CrimeController from "../controllers/criminoso.controller";
import authMiddleware from "../middlewares/auth.middleware";

const crimeRoutes = () => {
    const router = Router();
    const controller = new CrimeController();

    router.get("/", authMiddleware, controller.list);
    router.post("/", authMiddleware, controller.create);
    router.put("/:id", authMiddleware, controller.update);
    router.delete("/:id", authMiddleware, controller.delete);

    return router;
}

export default crimeRoutes;
