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
const labExercise_controller_1 = require("../controllers/labExercise-controller");
const labExercise_query_parser_1 = require("../utils/url-parser/labExercise-query-parser");
const student_controller_1 = require("../controllers/student-controller");
const labExerciseRouter = (0, express_1.Router)();
labExerciseRouter.post('/create', session_middleware_1.sessionUserExists, (0, user_role_middleware_1.userHasRole)(['ADMIN', 'PROFESSOR', 'ASSISTANT']), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const exerciseData = req.body;
    try {
        const labs = yield (0, labExercise_controller_1.createLabExercises)(exerciseData);
        res.status(200).send(labs);
    }
    catch (error) {
        res
            .status(500)
            .send({
            message: 'Greška pri spajanju na bazu podataka. Molimo pokušajte kasnije.',
            error: error,
        });
    }
}));
labExerciseRouter.get('/list', session_middleware_1.sessionUserExists, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const params = (0, labExercise_query_parser_1.parseLabExerciseFilterParams)(req.url);
    if (((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.role) === 'STUDENT') {
        const student = (yield (0, student_controller_1.getStudent)((_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email));
        params.studentId = [student.studentId];
    }
    try {
        const labs = yield (0, labExercise_controller_1.getLabExercises)(params);
        res.status(200).send(labs);
    }
    catch (error) {
        res
            .status(500)
            .send({
            message: 'Greška pri spajanju na bazu podataka. Molimo pokušajte kasnije.',
            error: error,
        });
    }
}));
labExerciseRouter.put('/update', session_middleware_1.sessionUserExists, (0, user_role_middleware_1.userHasRole)(['ADMIN', 'ASSISTANT', 'PROFESSOR']), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updateData = req.body;
    try {
        const updatedLabs = yield (0, labExercise_controller_1.updateLabExercises)(updateData);
        res.status(200).send(updatedLabs);
    }
    catch (error) {
        res
            .status(500)
            .send({
            message: 'Greška pri spajanju na bazu podataka. Molimo pokušajte kasnije.',
            error: error,
        });
    }
}));
labExerciseRouter.delete('/delete', session_middleware_1.sessionUserExists, (0, user_role_middleware_1.userHasRole)(['ADMIN', 'ASSISTANT', 'PROFESSOR']), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = (0, labExercise_query_parser_1.parseLabExerciseFilterParams)(req.url);
    try {
        const deletedLabs = yield (0, labExercise_controller_1.deleteLabExercises)(params);
        return deletedLabs;
    }
    catch (error) {
        res
            .status(500)
            .send({
            message: 'Greška pri spajanju na bazu podataka. Molimo pokušajte kasnije.',
            error: error,
        });
    }
}));
exports.default = labExerciseRouter;
