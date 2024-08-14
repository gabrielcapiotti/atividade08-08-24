import { Router } from "express";
import CrimeController from "../controllers/crimes.controller";

const crimeRoutes = () => {
    const router = Router();
    const controller = new CrimeController();

    router.get("/", controller.lista);
    router.post("/", controller.create);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);

    return router;
}

export default crimeRoutes;
