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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_middleware_1 = require("../lib/middleware/session-middleware");
const user_role_middleware_1 = require("../lib/middleware/user-role-middleware");
const midterm_controller_1 = require("../controllers/midterm-controller");
const midterm_query_parser_1 = require("../utils/url-parser/midterm-query-parser");
const midterm_1 = require("../lib/middleware/data-validation/midterm");
const midtermRouter = (0, express_1.Router)();
midtermRouter.post('/createMany', session_middleware_1.sessionUserExists, midterm_1.midtermPointsValidation, (0, user_role_middleware_1.userHasRole)(['ADMIN', 'PROFESSOR']), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const midtermData = req.body;
    try {
        const midterms = yield (0, midterm_controller_1.createMany)(midtermData);
        res.status(200).send(midterms);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Greška pri spajanju na bazu podataka.',
            error: error,
        });
    }
}));
midtermRouter.post('/create', session_middleware_1.sessionUserExists, midterm_1.midtermPointsValidation, (0, user_role_middleware_1.userHasRole)(['ADMIN', 'PROFESSOR']), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const midtermData = req.body;
    try {
        const midterm = yield (0, midterm_controller_1.create)(midtermData);
        res.status(200).send(midterm);
    }
    catch (error) {
        res.status(500).send({
            message: 'Greška pri spajanju na bazu podataka.',
            error: error,
        });
    }
}));
midtermRouter.put('/update/:midtermId', session_middleware_1.sessionUserExists, (0, user_role_middleware_1.userHasRole)(['ADMIN', 'PROFESSOR']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const midtermId = req.params.midtermId;
    const updateData = req.body;
    try {
        const updatedMidterm = yield (0, midterm_controller_1.updateMidterm)(midtermId, updateData);
        res.status(200).send(updatedMidterm);
    }
    catch (error) {
        res.status(500).send({
            message: 'Greška pri spajanju na bazu podataka.',
            error: error,
        });
    }
}));
midtermRouter.delete('/delete/:midtermId', session_middleware_1.sessionUserExists, (0, user_role_middleware_1.userHasRole)(['ADMIN', 'PROFESSOR']), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const midtermId = req.params.midtermId;
    try {
        const deletedMidterm = yield (0, midterm_controller_1.deleteMidterm)(midtermId);
        res.status(200).send(deletedMidterm);
    }
    catch (error) {
        res.status(500).send({
            message: 'Greška pri spajanju na bazu podataka.',
            error: error,
        });
    }
}));
midtermRouter.get('/list', session_middleware_1.sessionUserExists, (0, user_role_middleware_1.userHasRole)(['ADMIN', 'PROFESSOR']), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, midterm_query_parser_1.parseMidtermFilterParams)(req.url);
    try {
        const midterms = yield (0, midterm_controller_1.list)(filter);
        res.status(200).send(midterms);
    }
    catch (error) {
        res.status(500).send({
            message: 'Greška pri spajanju na bazu podataka.',
            error: error,
        });
    }
}));
exports.default = midtermRouter;
