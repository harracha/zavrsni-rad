'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.list = exports.deleteTeacher = exports.update = exports.create = void 0
const prisma_1 = __importDefault(require('../lib/prisma'))
const create = inputData =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const newTeacher = yield prisma_1.default.teacher.create({
        data: {
          email: inputData.email,
          firstName: inputData.firstName,
          lastName: inputData.lastName,
          password: inputData.password,
          classGroup: inputData.classGroup,
          labGroup: inputData.labGroup,
          profilePicture: inputData.profilePicture,
          Role: inputData.Role,
        },
      })
      return newTeacher
    } catch (error) {
      throw new Error(`Error while creating teacher\nError message: ${error}`)
    }
  })
exports.create = create
const update = (teacherId, updateData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const updatedTeacher = yield prisma_1.default.teacher.update({
        where: {
          teacherId: teacherId,
        },
        data: updateData,
      })
      return updatedTeacher
    } catch (error) {
      throw new Error(
        `Error while updating teacher with id ${teacherId}.\nError message: ${error}`,
      )
    }
  })
exports.update = update
const deleteTeacher = teacherId =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const deletedTeacher = yield prisma_1.default.teacher.delete({
        where: {
          teacherId: teacherId,
        },
      })
      return deletedTeacher
    } catch (error) {
      throw new Error(`Error while deleting teacher.\nError message: ${error}`)
    }
  })
exports.deleteTeacher = deleteTeacher
const list = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const teachers = yield prisma_1.default.teacher.findMany({
        where: {
          Role: 'PROFESSOR',
        },
      })
      return teachers
    } catch (error) {
      return error
    }
  })
exports.list = list
