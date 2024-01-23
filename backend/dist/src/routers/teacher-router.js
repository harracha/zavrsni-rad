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
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = require('express')
const teacher_controller_1 = require('../controllers/teacher-controller')
const user_role_middleware_1 = require('../lib/middleware/user-role-middleware')
const session_middleware_1 = require('../lib/middleware/session-middleware')
const teacherRouter = (0, express_1.Router)()
// ADMIN FUNCTION -> list all teachers in the database
teacherRouter.get(
  '/list',
  session_middleware_1.sessionUserExists,
  (0, user_role_middleware_1.userHasRole)(['ADMIN']),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        const teachers = yield (0, teacher_controller_1.list)()
        res.status(200).send(teachers)
      } catch (error) {
        res.status(500).send(error)
      }
    }),
)
// ADMIN FUNCTION -> list teachers by class group, MIGHT NEED TO BE CLASS GROUP NAME
teacherRouter.get(
  '/list/:classGroupId',
  session_middleware_1.sessionUserExists,
  (0, user_role_middleware_1.userHasRole)(['ADMIN']),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        const teachers = yield (0, teacher_controller_1.list)()
        res.status(200).send(teachers)
      } catch (error) {
        res.status(500).send(error)
      }
    }),
)
teacherRouter.post(
  '/create',
  session_middleware_1.sessionUserExists,
  (0, user_role_middleware_1.userHasRole)(['ADMIN']),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const inputData = req.body
      try {
        const newTeacher = yield (0, teacher_controller_1.create)(inputData)
        res.status(200).send(newTeacher)
      } catch (error) {
        throw new Error(error)
      }
    }),
)
teacherRouter.put(
  '/update/:teacherId',
  session_middleware_1.sessionUserExists,
  (0, user_role_middleware_1.userHasRole)(['ADMIN']),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const teacherId = req.params.teacherId
      const updateData = req.body
      try {
        const updatedTeacher = yield (0, teacher_controller_1.update)(
          teacherId,
          updateData,
        )
        res.status(200).send(updatedTeacher)
      } catch (error) {
        throw new Error(error)
      }
    }),
)
teacherRouter.delete(
  '/delete/:teacherId',
  session_middleware_1.sessionUserExists,
  (0, user_role_middleware_1.userHasRole)(['ADMIN']),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const teacherId = req.params.teacherId
      try {
        const deletedTeacher = yield (0, teacher_controller_1.deleteTeacher)(
          teacherId,
        )
        res.status(200).send(deletedTeacher)
      } catch (error) {
        throw new Error(error)
      }
    }),
)
exports.default = teacherRouter
