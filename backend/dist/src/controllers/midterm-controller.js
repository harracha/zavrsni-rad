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
exports.list =
  exports.deleteMidterm =
  exports.updateMidterm =
  exports.create =
  exports.createMany =
    void 0
const prisma_1 = __importDefault(require('../lib/prisma'))
const createMany = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const midterms = yield prisma_1.default.midterm.createMany({
        data: data,
      })
      return midterms
    } catch (error) {
      return error
    }
  })
exports.createMany = createMany
const create = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const midterm = yield prisma_1.default.midterm.create({
        data: data,
      })
      return midterm
    } catch (error) {
      throw new Error(`${error}`)
    }
  })
exports.create = create
const updateMidterm = (midtermId, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const updatedMidterm = yield prisma_1.default.midterm.update({
        where: {
          midtermId: midtermId,
        },
        data: data,
      })
      return updatedMidterm
    } catch (error) {
      return error
    }
  })
exports.updateMidterm = updateMidterm
const deleteMidterm = midtermId =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const midterm = yield prisma_1.default.midterm.delete({
        where: {
          midtermId: midtermId,
        },
      })
      return midterm
    } catch (error) {
      return error
    }
  })
exports.deleteMidterm = deleteMidterm
const list = filter =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const midterms = yield prisma_1.default.midterm.findMany({
        where: {
          midtermId: { in: filter.midtermId },
          acYear: { in: filter.acYear },
          MidtermType: { in: filter.midtermType },
          studentId: { in: filter.studentId },
          Student: {
            classGroup: {
              groupName: { in: filter.classGroupName },
            },
          },
        },
      })
      return midterms
    } catch (error) {
      return error
    }
  })
exports.list = list
