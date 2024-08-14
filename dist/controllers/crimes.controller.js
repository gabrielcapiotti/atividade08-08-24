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
class CrimeController {
    lista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const crimes = yield prisma_connection_1.default.crime.findMany({
                    include: {
                        criminoso: true,
                        armas: true
                    }
                });
                return res
                    .status(200)
                    .json({ success: true, msg: "Listagem completa de crimes realizada com sucesso.", data: crimes });
            }
            catch (error) {
                console.error("Erro ao listar crimes:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro ao acessar o banco de dados para listar os crimes." });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { descricao, data, criminosoId, armas } = req.body;
            try {
                const crime = yield prisma_connection_1.default.crime.create({
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
            }
            catch (error) {
                console.error("Erro ao criar crime:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Falha interna ao tentar registrar o crime." });
            }
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const crime = yield prisma_connection_1.default.crime.findUnique({
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
                }
                else {
                    return res
                        .status(404)
                        .json({ success: false, msg: "Crime não encontrado." });
                }
            }
            catch (error) {
                console.error("Erro ao buscar crime:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro interno ao buscar informações do crime." });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const updates = req.body;
            try {
                const crime = yield prisma_connection_1.default.crime.update({
                    where: { id },
                    data: updates,
                });
                return res
                    .status(200)
                    .json({ success: true, msg: "Crime atualizado com sucesso.", data: crime });
            }
            catch (error) {
                console.error("Erro ao atualizar crime:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Falha interna ao atualizar o crime." });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield prisma_connection_1.default.crime.delete({
                    where: { id },
                });
                return res
                    .status(204)
                    .json({ success: true, msg: "Crime excluído com sucesso." });
            }
            catch (error) {
                console.error("Erro ao deletar crime:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro interno ao tentar deletar o crime." });
            }
        });
    }
}
exports.default = CrimeController;
