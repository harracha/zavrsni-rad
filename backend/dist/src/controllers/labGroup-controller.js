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
exports.deletelabGroup =
  exports.updatelabGroup =
  exports.createlabGroup =
  exports.getlabGroup =
  exports.list =
    void 0
const prisma_1 = __importDefault(require('../lib/prisma'))
const list = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const labGroups = yield prisma_1.default.labGroup.findMany()
      return labGroups
    } catch (error) {
      return error
    }
  })
exports.list = list
const getlabGroup = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const labGroup = yield prisma_1.default.labGroup.findUnique({
        where: {
          groupId: id,
        },
      })
      return labGroup
    } catch (error) {
      return error
    }
  })
exports.getlabGroup = getlabGroup
const createlabGroup = info =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const labGroup = yield prisma_1.default.labGroup.create({
        data: info,
      })
      return labGroup
    } catch (error) {
      return error
    }
  })
exports.createlabGroup = createlabGroup
const updatelabGroup = (id, updateInfo) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const updatedGroup = yield prisma_1.default.labGroup.update({
        where: {
          groupId: id,
        },
        data: updateInfo,
      })
      return updatedGroup
    } catch (error) {
      return error
    }
  })
exports.updatelabGroup = updatelabGroup
const deletelabGroup = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const deletedGroup = yield prisma_1.default.labGroup.delete({
        where: {
          groupId: id,
        },
      })
      return deletedGroup
    } catch (error) {
      return error
    }
  })
exports.deletelabGroup = deletelabGroup
