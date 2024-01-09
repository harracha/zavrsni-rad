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
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const authRouter = (0, express_1.Router)();
authRouter.post('/teacher/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginEmail = req.body.email;
    const loginPassword = req.body.password;
    if (!loginEmail || !loginPassword) {
        res.status(400).send('User data not defined correctly');
    }
    yield prisma_1.default.teacher
        .findUnique({
        where: {
            email: loginEmail,
        },
        select: {
            email: true,
            password: true,
            Role: true,
        },
    })
        .then(response => {
        if (!response) {
            res.status(401).send('Incorrect email or password');
        }
        else {
            if (response.password !== loginPassword) {
                res.status(401).send('Incorrect email or password');
            }
            req.session.user = { email: response.email, role: response.Role };
        }
        res.status(200).send(req.session.user);
    })
        .catch(error => {
        res
            .status(500)
            .send({ error: error, message: 'Failed connecting to database' });
    });
}));
authRouter.post('/student/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginEmail = req.body.email;
    const loginPassword = req.body.password;
    if (!loginEmail || !loginPassword) {
        res.status(400).send('User data not defined correctly');
    }
    yield prisma_1.default.student
        .findUnique({
        where: {
            email: loginEmail,
        },
        select: {
            email: true,
            password: true,
            Role: true,
        },
    })
        .then(response => {
        if (!response) {
            res.status(401).send('Incorrect email or password');
        }
        else {
            if (response.password !== loginPassword) {
                res.status(401).send('Incorrect email or password');
            }
            req.session.user = { email: response.email, role: response.Role };
        }
        res.status(200).send(req.session.user);
    })
        .catch(error => {
        res
            .status(500)
            .send({ error: error, message: 'Failed connecting to database' });
    });
}));
authRouter.post('/logout', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    delete req.session.user;
}));
exports.default = authRouter;
