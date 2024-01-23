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
exports.deleteLabExercises =
  exports.updateLabExercises =
  exports.getLabExercises =
  exports.createLabExercises =
    void 0
const prisma_1 = __importDefault(require('../lib/prisma'))
const createLabExercises = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const labs = yield prisma_1.default.labExercise.createMany({
        data: data,
      })
      return labs
    } catch (error) {
      throw error
    }
  })
exports.createLabExercises = createLabExercises
const getLabExercises = params =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const labs = yield prisma_1.default.labExercise.findMany({
        where: {
          exerciseId: { in: params.exerciseId },
          acyear: { in: params.acYear },
          labName: { in: params.labName },
          studentId: { in: params.studentId },
        },
      })
      return labs
    } catch (error) {
      throw error
    }
  })
exports.getLabExercises = getLabExercises
const updateLabExercises = updateData =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const labs = yield prisma_1.default.labExercise.updateMany({
        data: updateData,
      })
      return labs
    } catch (error) {
      throw error
    }
  })
exports.updateLabExercises = updateLabExercises
const deleteLabExercises = deleteParams =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const deletedLabs = yield prisma_1.default.labExercise.deleteMany({
        where: {
          exerciseId: { in: deleteParams.exerciseId },
          acyear: { in: deleteParams.acYear },
          labName: { in: deleteParams.labName },
          studentId: { in: deleteParams.studentId },
        },
      })
      return deletedLabs
    } catch (error) {
      throw error
    }
  })
exports.deleteLabExercises = deleteLabExercises
