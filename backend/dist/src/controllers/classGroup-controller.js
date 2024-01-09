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
exports.deleteClassGroup = exports.updateClassGroup = exports.createClassGroup = exports.getClassGroup = exports.list = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const list = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classGroups = yield prisma_1.default.classGroup.findMany({
            where: {
                groupId: { in: params.groupId },
                teacher: {
                    every: {
                        teacherId: { in: params.teacherId }
                    }
                },
                Students: {
                    every: {
                        studentId: { in: params.studentId }
                    }
                }
            }
        });
        return classGroups;
    }
    catch (error) {
        return error;
    }
});
exports.list = list;
const getClassGroup = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classGroup = yield prisma_1.default.classGroup.findUnique({
            where: {
                groupId: id,
            },
        });
        return classGroup;
    }
    catch (error) {
        return error;
    }
});
exports.getClassGroup = getClassGroup;
const createClassGroup = (info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classGroup = yield prisma_1.default.classGroup.create({
            data: info,
        });
        return classGroup;
    }
    catch (error) {
        return error;
    }
});
exports.createClassGroup = createClassGroup;
const updateClassGroup = (id, updateInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedGroup = yield prisma_1.default.classGroup.update({
            where: {
                groupId: id,
            },
            data: updateInfo,
        });
        return updatedGroup;
    }
    catch (error) {
        return error;
    }
});
exports.updateClassGroup = updateClassGroup;
const deleteClassGroup = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedGroup = yield prisma_1.default.classGroup.delete({
            where: {
                groupId: id,
            },
        });
        return deletedGroup;
    }
    catch (error) {
        return error;
    }
});
exports.deleteClassGroup = deleteClassGroup;
