import { Request, Response } from "express";
import db from "../database/prisma.connection";
import bcrypt from "bcrypt";

class UsuarioController {
    public async register(req: Request, res: Response) {
        const { nome, email, senha, cargo } = req.body;
        const hashedPassword = bcrypt.hashSync(senha, 8);

        try {
            const novoUsuario = await db.usuario.create({
                data: {
                    nome,
                    email,
                    senha: hashedPassword,
                    cargo
                }
            });

            return res
                .status(201)
                .json({ success: true, msg: "Usuário registrado com sucesso!", data: novoUsuario });
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro interno ao registrar usuário." });
        }
    }

    public async login(req: Request, res: Response) {
        const { email, senha } = req.body;

        try {
            const usuario = await db.usuario.findUnique({
                where: { email }
            });

            if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
                return res
                    .status(401)
                    .json({ success: false, msg: "Email ou senha incorretos!" });
            }

            return res
                .status(200)
                .json({ success: true, msg: "Login realizado com sucesso!" });
        } catch (error) {
            console.error("Erro ao logar usuário:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro interno ao logar usuário." });
        }
    }
}

export default UsuarioController;
