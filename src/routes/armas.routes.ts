import { Router } from "express";
import ArmasController from "../controllers/armas.controller";

const ArmasRoutes = () => {
    const router = Router();
    const controller = new ArmasController();

    router.get("/", controller.list);
    router.post("/", controller.create);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);

    return router;
}

export default ArmasRoutes;
