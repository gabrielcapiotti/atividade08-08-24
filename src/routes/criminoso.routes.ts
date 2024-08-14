import { Router } from "express";
import CrimeController from "../controllers/criminoso.controller";

const crimeRoutes = () => {
    const router = Router();
    const controller = new CrimeController();

    router.get("/", controller.list);
    router.post("/", controller.create);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);

    return router;
}

export default crimeRoutes;
