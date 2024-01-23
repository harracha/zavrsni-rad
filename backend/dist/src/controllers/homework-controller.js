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
exports.filterExistingHomeworks =
  exports.deleteHomework =
  exports.updateHomework =
  exports.updateHomeworks =
  exports.listHomeworks =
  exports.getBatchHomeworks =
  exports.listStudentHomeworks =
  exports.createHomework =
    void 0
const client_1 = require('@prisma/client')
const prisma_1 = __importDefault(require('../lib/prisma'))
const createHomework = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const homework = yield prisma_1.default.homework.createMany({
        data: data,
      })
      return homework
    } catch (error) {
      throw error
    }
  })
exports.createHomework = createHomework
const listStudentHomeworks = student =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const homeworks = yield prisma_1.default.homework.findMany({
        where: {
          OR: [
            {
              studentId: student,
            },
            {
              Student: student,
            },
          ],
        },
      })
      return homeworks
    } catch (error) {
      throw error
    }
  })
exports.listStudentHomeworks = listStudentHomeworks
const getBatchHomeworks = studentIds =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const homeworks = yield prisma_1.default.homework.findMany({
        where: {
          studentId: { in: studentIds },
        },
      })
      return homeworks
    } catch (error) {
      throw error
    }
  })
exports.getBatchHomeworks = getBatchHomeworks
const listHomeworks = queryParams =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const homeworks = yield prisma_1.default.homework.findMany({
        where: {
          homeworkId: { in: queryParams.homeworkId },
          name: { in: queryParams.homeworkName },
          acYear: { in: queryParams.acYear },
          studentId: { in: queryParams.studentId },
          Student: {
            classGroup: {
              groupName: { in: queryParams.classGroupName },
            },
          },
        },
      })
      return homeworks
    } catch (error) {
      if (error instanceof client_1.Prisma.PrismaClientValidationError) {
        console.error(error.message)
      }
      throw error
    }
  })
exports.listHomeworks = listHomeworks
const updateHomeworks = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const updatedHomework = yield prisma_1.default.homework.updateMany({
        data: data,
      })
      return updatedHomework
    } catch (error) {
      throw new Error(error)
    }
  })
exports.updateHomeworks = updateHomeworks
const updateHomework = (id, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const updatedHomework = yield prisma_1.default.homework.update({
        where: {
          homeworkId: id,
        },
        data: data,
      })
      return updatedHomework
    } catch (error) {
      throw error
    }
  })
exports.updateHomework = updateHomework
const deleteHomework = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const deletedHomeworks = yield prisma_1.default.homework.deleteMany({
        where: {
          homeworkId: { in: data.homeworkId },
          name: { in: data.homeworkName },
          acYear: { in: data.acYear },
          studentId: { in: data.studentId },
          Student: {
            classGroup: {
              groupName: { in: data.classGroupName },
            },
          },
        },
      })
      return deletedHomeworks
    } catch (error) {
      throw new Error(error)
    }
  })
exports.deleteHomework = deleteHomework
const filterExistingHomeworks = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const studentIds = data.map(homework => homework.studentId)
      const homeworks = yield (0, exports.getBatchHomeworks)(studentIds)
      const homeworksCopy = homeworks
      let existingHomeworks = []
      homeworksCopy.map(homework => {
        const studentHomeworks = homeworks.filter(
          prismaHomework => prismaHomework.studentId === homework.studentId,
        )
        const existingHomework = studentHomeworks.find(
          studentHomework =>
            studentHomework.acYear === homework.acYear &&
            studentHomework.name === homework.name &&
            studentHomework.studentId === homework.studentId,
        )
        if (existingHomework) {
          existingHomework.points = homework.points
          existingHomeworks.push(existingHomework)
          homeworks.splice(homeworks.indexOf(homework), 1)
        }
      })
      return yield Promise.all([
        (0, exports.createHomework)(homeworks),
        (0, exports.updateHomeworks)(existingHomeworks),
      ])
    } catch (error) {
      throw error
    }
  })
exports.filterExistingHomeworks = filterExistingHomeworks
