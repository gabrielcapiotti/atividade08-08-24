import { Request, Response } from "express";
import db from "../database/prisma.connection";

class ArmasController {
    public async list(req: Request, res: Response) {
        try {
            const armas = await db.arma.findMany({
                include: { crime: true }
            });
            return res
                .status(200)
                .json({ success: true, msg: "Listagem completa de armas!", data: armas });
        } catch (error) {
            console.error("Erro ao listar armas:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro ao listar as armas devido a erro do banco de dados." });
        }
    }

    public async create(req: Request, res: Response) {
        const { tipo, crimeId } = req.body;
        if (!tipo || !crimeId) {
            return res
                .status(400)
                .json({ success: false, msg: "Tipo e crimeId são obrigatórios." });
        }
        try {
            const arma = await db.arma.create({
                data: {
                    tipo,
                    crimeId
                }
            });
            return res
                .status(201)
                .json({ success: true, msg: "Arma criada com sucesso!", data: arma });
        } catch (error) {
            console.error("Erro ao criar uma arma:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Falha ao criar arma, erro interno do servidor." });
        }
    }


    public async show(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const arma = await db.arma.findUnique({
                where: { id },
                include: { crime: true }
            });
            if (arma) {
                return res
                    .status(200)
                    .json({ success: true, msg: "Arma encontrada", data: arma });
            } else {
                return res
                    .status(404)
                    .json({ success: false, msg: "Arma não encontrada" });
            }
        } catch (error) {
            console.error("Erro ao encontrar arma:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Falha ao encontrar arma devido a erro interno do servidor." });
        }
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        const updates = req.body;
        try {
            const arma = await db.arma.update({
                where: { id },
                data: updates,
            });
            return res
                .status(200)
                .json({ success: true, msg: "Arma atualizada com sucesso", data: arma });
        } catch (error) {
            console.error("Erro ao atualizar arma:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Falha ao atualizar arma devido a erro interno do servidor." });
        }
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await db.arma.delete({
                where: { id },
            });
            return res
                .status(204)
                .json({ success: true, msg: "Arma deletada com sucesso" });
        } catch (error) {
            console.error("Erro ao deletar arma:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Falha ao deletar arma devido a erro interno do servidor." });
        }
    }
}

export default ArmasController;
