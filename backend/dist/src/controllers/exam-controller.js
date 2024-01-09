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
exports.list = exports.deleteExams = exports.deleteExam = exports.updateExam = exports.create = exports.createMany = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const createMany = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exams = yield prisma_1.default.exam.createMany({
            data: data,
        });
        return exams;
    }
    catch (error) {
        return error;
    }
});
exports.createMany = createMany;
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exam = yield prisma_1.default.exam.create({
            data: data,
        });
        return exam;
    }
    catch (error) {
        return error;
    }
});
exports.create = create;
const updateExam = (examId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedexam = yield prisma_1.default.exam.update({
            where: {
                examId: examId,
            },
            data: data,
        });
        return updatedexam;
    }
    catch (error) {
        return error;
    }
});
exports.updateExam = updateExam;
const deleteExam = (examId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exam = yield prisma_1.default.exam.delete({
            where: {
                examId: examId,
            },
        });
        return exam;
    }
    catch (error) {
        return error;
    }
});
exports.deleteExam = deleteExam;
const deleteExams = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exams = yield prisma_1.default.exam.deleteMany({
            where: {
                examId: { in: filter.examId },
                acYear: { in: filter.acYear },
                Student: {
                    classGroup: {
                        groupName: { in: filter.classGroupName }
                    }
                },
                ExamType: { in: filter.examType },
                studentId: { in: filter.studentId }
            }
        });
        return exams;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteExams = deleteExams;
const list = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exams = yield prisma_1.default.exam.findMany({
            where: {
                examId: { in: filter.examId },
                acYear: { in: filter.acYear },
                ExamType: { in: filter.examType },
                studentId: { in: filter.studentId },
                Student: {
                    classGroup: {
                        groupName: { in: filter.classGroupName },
                    },
                },
            },
        });
        return exams;
    }
    catch (error) {
        return error;
    }
});
exports.list = list;
