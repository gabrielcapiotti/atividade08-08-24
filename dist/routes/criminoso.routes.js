"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const criminoso_controller_1 = __importDefault(require("../controllers/criminoso.controller"));
const crimeRoutes = () => {
    const router = (0, express_1.Router)();
    const controller = new criminoso_controller_1.default();
    router.get("/", controller.list);
    router.post("/", controller.create);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);
    return router;
};
exports.default = crimeRoutes;
