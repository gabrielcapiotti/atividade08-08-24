import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller";

const UsuarioRoutes = () => {
    const router = Router();
    const controller = new UsuarioController();

    router.get("/", controller.register);
    router.post("/login", controller.login);

    return router;
}

export default UsuarioRoutes;





