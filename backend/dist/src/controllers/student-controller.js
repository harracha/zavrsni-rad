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
exports.getStudent = exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.list = exports.listStudentsByLabGroup = exports.listStudentsByClassGroup = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const listStudentsByClassGroup = (classGroupId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield prisma_1.default.student.findMany({
            where: {
                classGroupId: classGroupId,
            },
        });
        return students;
    }
    catch (error) {
        return error;
    }
});
exports.listStudentsByClassGroup = listStudentsByClassGroup;
const listStudentsByLabGroup = (labGroupId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield prisma_1.default.student.findMany({
            where: {
                labGroupId: labGroupId,
            },
        });
        return students;
    }
    catch (error) {
        return error;
    }
});
exports.listStudentsByLabGroup = listStudentsByLabGroup;
const list = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield prisma_1.default.student.findMany();
        return students;
    }
    catch (error) {
        return error;
    }
});
exports.list = list;
const createStudent = (info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield prisma_1.default.student.create({
            data: info,
        });
        return student;
    }
    catch (error) {
        return error;
    }
});
exports.createStudent = createStudent;
const updateStudent = (id, info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedStudent = yield prisma_1.default.student.update({
            where: {
                studentId: id,
            },
            data: info,
        });
        return updatedStudent;
    }
    catch (error) {
        return error;
    }
});
exports.updateStudent = updateStudent;
const deleteStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedStudent = yield prisma_1.default.student.delete({
            where: {
                studentId: id,
            },
        });
        return deletedStudent;
    }
    catch (error) {
        return error;
    }
});
exports.deleteStudent = deleteStudent;
const getStudent = (param) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield prisma_1.default.student.findUnique({
            where: {
                studentId: param,
                OR: [{ email: param }, { JMBAG: param }],
            },
        });
        return student;
    }
    catch (error) {
        return error;
    }
});
exports.getStudent = getStudent;
