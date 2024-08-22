import { NextFunction, Request, Response } from "express"
import db from "../database/prisma.connection";
import * as bcrypt from "bcrypt";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ success: false, msg: "Acesso negado. Nenhum token fornecido." });
    }

    try {
        const usuario = await db.usuario.findFirst({
            where: { token: authHeader }
        });

        if (!usuario) {
            return res.status(401).json({ success: false, msg: "Usuário não logado." });
        }

        next();
    } catch (error) {
        console.error("Erro no middleware de autenticação:", error);
        return res.status(500).json({ success: false, msg: "Erro interno no servidor." });
    }
}

export default authMiddleware;









