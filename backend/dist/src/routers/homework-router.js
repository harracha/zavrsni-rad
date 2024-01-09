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
const homework_controller_1 = require("../controllers/homework-controller");
const homework_1 = require("../lib/middleware/data-validation/homework");
const homework_query_parser_1 = require("../utils/url-parser/homework-query-parser");
const student_controller_1 = require("../controllers/student-controller");
const homeworkRouter = (0, express_1.Router)();
homeworkRouter.post('/create', session_middleware_1.sessionUserExists, (0, user_role_middleware_1.userHasRole)(['ADMIN', 'PROFESSOR', 'ASSISTANT']), homework_1.homeworkPointsValidation, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const homeworkData = req.body;
    try {
        const homework = yield (0, homework_controller_1.filterExistingHomeworks)(homeworkData);
        res.status(200).send(homework);
    }
    catch (error) {
        res.status(500).send({
            message: 'Greška pri spajanju na bazu podataka, molimo pokušajte kasnije.',
            error,
        });
    }
}));
homeworkRouter.get('/list', session_middleware_1.sessionUserExists, (0, user_role_middleware_1.userHasRole)(['ADMIN', 'PROFESSOR', 'ASSISTANT', 'STUDENT']), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const queryParams = (0, homework_query_parser_1.parseHomeworkFilterParams)(req.url);
    if (((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.role) === 'STUDENT') {
        const student = (yield (0, student_controller_1.getStudent)((_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email));
        queryParams.studentId = [student.studentId];
    }
    try {
        const homework = yield (0, homework_controller_1.listHomeworks)(queryParams);
        res.status(200).send(homework);
    }
    catch (error) {
        res.status(500).send({
            message: 'Greška pri spajanju na bazu podataka, molimo pokušajte kasnije.',
            error,
        });
    }
}));
// za azuriranje vise zadaca odjednom
homeworkRouter.put('/update', session_middleware_1.sessionUserExists, (0, user_role_middleware_1.userHasRole)(['ADMIN', 'ASSISTANT', 'PROFESSOR']), homework_1.homeworkPointsValidation, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updateData = req.body;
    try {
        const updatedHomeworks = yield (0, homework_controller_1.updateHomeworks)(updateData);
        res.status(200).send(updatedHomeworks);
    }
    catch (error) {
        res.status(500).send({
            message: 'Greška pri spajanju na bazu podataka, molimo pokušajte kasnije.',
            error: error
        });
    }
}));
homeworkRouter.put('/update/:homeworkId', session_middleware_1.sessionUserExists, (0, user_role_middleware_1.userHasRole)(['ADMIN', 'ASSISTANT', 'PROFESSOR']), homework_1.homeworkPointsValidation, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const homeworkId = req.params.homeworkId;
    const updateData = req.body;
    try {
        const updatedHomework = yield (0, homework_controller_1.updateHomework)(homeworkId, updateData);
        res.status(200).send(updatedHomework);
    }
    catch (error) {
        res.status(500).send({
            message: 'Greška pri spajanju na bazu podataka, molimo pokušajte kasnije.',
            error: error
        });
    }
}));
homeworkRouter.delete('/delete', session_middleware_1.sessionUserExists, (0, user_role_middleware_1.userHasRole)(['ADMIN', 'ASSISTANT', 'PROFESSOR']), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteData = req.body;
    try {
        const deletedHomeworks = yield (0, homework_controller_1.deleteHomework)(deleteData);
        res.status(200).send(deletedHomeworks);
    }
    catch (error) {
        res.status(500).send({
            message: 'Greška pri spajanju na bazu podataka, molimo pokušajte kasnije.',
            error,
        });
    }
}));
exports.default = homeworkRouter;
