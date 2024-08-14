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
class CriminosoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const criminosos = yield prisma_connection_1.default.criminoso.findMany({
                    include: { crimes: true }
                });
                return res
                    .status(200)
                    .json({ success: true, msg: "Listagem completa de criminosos realizada com sucesso.", data: criminosos });
            }
            catch (error) {
                console.error("Erro ao listar criminosos:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro ao acessar o banco de dados para listar os criminosos." });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, idade } = req.body;
            if (!nome) {
                return res
                    .status(400)
                    .json({ success: false, msg: "Nome é obrigatório." });
            }
            try {
                const criminoso = yield prisma_connection_1.default.criminoso.create({
                    data: { nome, idade }
                });
                return res
                    .status(201)
                    .json({ success: true, msg: "Criminoso criado com sucesso!", data: criminoso });
            }
            catch (error) {
                console.error("Erro ao criar criminoso:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro interno ao tentar registrar o criminoso." });
            }
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const criminoso = yield prisma_connection_1.default.criminoso.findUnique({
                    where: { id },
                    include: { crimes: true }
                });
                if (criminoso) {
                    return res
                        .status(200)
                        .json({ success: true, msg: "Criminoso encontrado com sucesso.", data: criminoso });
                }
                else {
                    return res
                        .status(404)
                        .json({ success: false, msg: "Criminoso não encontrado." });
                }
            }
            catch (error) {
                console.error("Erro ao encontrar criminoso:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro interno ao buscar informações do criminoso." });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const updates = req.body;
            try {
                const existingCriminoso = yield prisma_connection_1.default.criminoso.findUnique({ where: { id } });
                if (!existingCriminoso) {
                    return res
                        .status(404)
                        .json({ success: false, msg: "Criminoso não encontrado." });
                }
                const criminoso = yield prisma_connection_1.default.criminoso.update({
                    where: { id },
                    data: updates,
                });
                return res
                    .status(200)
                    .json({ success: true, msg: "Criminoso atualizado com sucesso.", data: criminoso });
            }
            catch (error) {
                console.error("Erro ao atualizar criminoso:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro interno ao atualizar o criminoso." });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const existingCriminoso = yield prisma_connection_1.default.criminoso.findUnique({ where: { id } });
                if (!existingCriminoso) {
                    return res
                        .status(404)
                        .json({ success: false, msg: "Criminoso não encontrado para deletar." });
                }
                yield prisma_connection_1.default.criminoso.delete({
                    where: { id },
                });
                return res
                    .status(204)
                    .json({ success: true, msg: "Criminoso deletado com sucesso." });
            }
            catch (error) {
                console.error("Erro ao deletar criminoso:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro interno ao tentar deletar o criminoso." });
            }
        });
    }
}
exports.default = CriminosoController;
