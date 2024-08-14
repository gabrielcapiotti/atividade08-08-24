import { Request, Response } from "express";
import db from "../database/prisma.connection";

class CriminosoController {
    public async list(req: Request, res: Response) {
        try {
            const criminosos = await db.criminoso.findMany({
                include: { crimes: true }
            });
            return res
                .status(200)
                .json({ success: true, msg: "Listagem completa de criminosos realizada com sucesso.", data: criminosos });
        } catch (error) {
            console.error("Erro ao listar criminosos:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro ao acessar o banco de dados para listar os criminosos." });
        }
    }

    public async create(req: Request, res: Response) {
        const { nome, idade } = req.body;
        if (!nome) {
            return res
                .status(400)
                .json({ success: false, msg: "Nome é obrigatório." });
        }
        try {
            const criminoso = await db.criminoso.create({
                data: { nome, idade }
            });
            return res
                .status(201)
                .json({ success: true, msg: "Criminoso criado com sucesso!", data: criminoso });
        } catch (error) {
            console.error("Erro ao criar criminoso:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro interno ao tentar registrar o criminoso." });
        }
    }

    public async show(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const criminoso = await db.criminoso.findUnique({
                where: { id },
                include: { crimes: true }
            });
            if (criminoso) {
                return res
                    .status(200)
                    .json({ success: true, msg: "Criminoso encontrado com sucesso.", data: criminoso });
            } else {
                return res
                    .status(404)
                    .json({ success: false, msg: "Criminoso não encontrado." });
            }
        } catch (error) {
            console.error("Erro ao encontrar criminoso:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro interno ao buscar informações do criminoso." });
        }
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        const updates = req.body;
        try {
            const existingCriminoso = await db.criminoso.findUnique({ where: { id } });
            if (!existingCriminoso) {
                return res
                    .status(404)
                    .json({ success: false, msg: "Criminoso não encontrado." });
            }
            const criminoso = await db.criminoso.update({
                where: { id },
                data: updates,
            });
            return res
                .status(200)
                .json({ success: true, msg: "Criminoso atualizado com sucesso.", data: criminoso });
        } catch (error) {
            console.error("Erro ao atualizar criminoso:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro interno ao atualizar o criminoso." });
        }
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const existingCriminoso = await db.criminoso.findUnique({ where: { id } });
            if (!existingCriminoso) {
                return res
                    .status(404)
                    .json({ success: false, msg: "Criminoso não encontrado para deletar." });
            }
            await db.criminoso.delete({
                where: { id },
            });
            return res
                .status(204)
                .json({ success: true, msg: "Criminoso deletado com sucesso." });
        } catch (error) {
            console.error("Erro ao deletar criminoso:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro interno ao tentar deletar o criminoso." });
        }
    }
}

export default CriminosoController;
