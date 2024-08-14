import { Request, Response } from "express";
import db from "../database/prisma.connection";

class CrimeController {
    public async lista(req: Request, res: Response) {
        try {
            const crimes = await db.crime.findMany({
                include: {
                    criminoso: true,
                    armas: true
                }
            });
            return res
                .status(200)
                .json({ success: true, msg: "Listagem completa de crimes realizada com sucesso.", data: crimes });
        } catch (error) {
            console.error("Erro ao listar crimes:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro ao acessar o banco de dados para listar os crimes." });
        }
    }

    public async create(req: Request, res: Response) {
        const { descricao, data, criminosoId, armas } = req.body;
        try {
            const crime = await db.crime.create({
                data: {
                    descricao,
                    data,
                    criminosoId,
                    armas: {
                        create: armas
                    }
                },
                include: {
                    armas: true
                }
            });
            return res
                .status(201)
                .json({ success: true, msg: "Crime criado com sucesso!", data: crime });
        } catch (error) {
            console.error("Erro ao criar crime:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Falha interna ao tentar registrar o crime." });
        }
    }

    public async show(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const crime = await db.crime.findUnique({
                where: { id },
                include: {
                    criminoso: true,
                    armas: true
                }
            });
            if (crime) {
                return res
                    .status(200)
                    .json({ success: true, msg: "Crime encontrado com sucesso.", data: crime });
            } else {
                return res
                    .status(404)
                    .json({ success: false, msg: "Crime não encontrado." });
            }
        } catch (error) {
            console.error("Erro ao buscar crime:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro interno ao buscar informações do crime." });
        }
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        const updates = req.body;
        try {
            const crime = await db.crime.update({
                where: { id },
                data: updates,
            });
            return res
                .status(200)
                .json({ success: true, msg: "Crime atualizado com sucesso.", data: crime });
        } catch (error) {
            console.error("Erro ao atualizar crime:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Falha interna ao atualizar o crime." });
        }
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await db.crime.delete({
                where: { id },
            });
            return res
                .status(204)
                .json({ success: true, msg: "Crime excluído com sucesso." });
        } catch (error) {
            console.error("Erro ao deletar crime:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro interno ao tentar deletar o crime." });
        }
    }
}

export default CrimeController;
