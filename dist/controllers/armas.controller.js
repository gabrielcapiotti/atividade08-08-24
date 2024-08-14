"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_connection_1 = __importDefault(require("../database/prisma.connection"));
class ArmasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const armas = yield prisma_connection_1.default.arma.findMany({
                    include: { crime: true }
                });
                return res
                    .status(200)
                    .json({ success: true, msg: "Listagem completa de armas!", data: armas });
            }
            catch (error) {
                console.error("Erro ao listar armas:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro ao listar as armas devido a erro do banco de dados." });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tipo, crimeId } = req.body;
            if (!tipo || !crimeId) {
                return res
                    .status(400)
                    .json({ success: false, msg: "Tipo e crimeId são obrigatórios." });
            }
            try {
                const arma = yield prisma_connection_1.default.arma.create({
                    data: {
                        tipo,
                        crimeId
                    }
                });
                return res
                    .status(201)
                    .json({ success: true, msg: "Arma criada com sucesso!", data: arma });
            }
            catch (error) {
                console.error("Erro ao criar uma arma:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Falha ao criar arma, erro interno do servidor." });
            }
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const arma = yield prisma_connection_1.default.arma.findUnique({
                    where: { id },
                    include: { crime: true }
                });
                if (arma) {
                    return res
                        .status(200)
                        .json({ success: true, msg: "Arma encontrada", data: arma });
                }
                else {
                    return res
                        .status(404)
                        .json({ success: false, msg: "Arma não encontrada" });
                }
            }
            catch (error) {
                console.error("Erro ao encontrar arma:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Falha ao encontrar arma devido a erro interno do servidor." });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const updates = req.body;
            try {
                const arma = yield prisma_connection_1.default.arma.update({
                    where: { id },
                    data: updates,
                });
                return res
                    .status(200)
                    .json({ success: true, msg: "Arma atualizada com sucesso", data: arma });
            }
            catch (error) {
                console.error("Erro ao atualizar arma:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Falha ao atualizar arma devido a erro interno do servidor." });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield prisma_connection_1.default.arma.delete({
                    where: { id },
                });
                return res
                    .status(204)
                    .json({ success: true, msg: "Arma deletada com sucesso" });
            }
            catch (error) {
                console.error("Erro ao deletar arma:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Falha ao deletar arma devido a erro interno do servidor." });
            }
        });
    }
}
exports.default = ArmasController;
