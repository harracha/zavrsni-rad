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
const express_1 = require('express')
const user_role_middleware_1 = require('../lib/middleware/user-role-middleware')
const student_controller_1 = require('../controllers/student-controller')
const session_middleware_1 = require('../lib/middleware/session-middleware')
const prisma_1 = __importDefault(require('../lib/prisma'))
const studentRouter = (0, express_1.Router)()
// ADMIN / TEACHER / ASSISTANT FUNCTION -> list students (list by class groupId optional)
studentRouter.get(
  '/list/:classGroupId',
  session_middleware_1.sessionUserExists,
  (0, user_role_middleware_1.userHasRole)(['ADMIN', 'PROFESSOR', 'ASSISTANT']),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const groupId = req.params.classGroupId
      if (groupId) {
        const students = yield (0,
        student_controller_1.listStudentsByClassGroup)(groupId).catch(error => {
          res
            .status(500)
            .send({ message: 'Failed connecting to database', error: error })
        })
        res.status(200).send(students)
      } else {
        res.status(400).send('Class group id not defined properly')
      }
    }),
)
// ADMIN / TEACHER FUNCTION -> list students for certain lab group
studentRouter.get(
  '/list/:labGroupId',
  session_middleware_1.sessionUserExists,
  (0, user_role_middleware_1.userHasRole)(['ADMIN', 'PROFESSOR', 'ASSISTANT']),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const groupId = req.params.labGroupId
      if (!groupId) {
        res.status(400).send('Class group id not defined properly')
      }
      try {
        const students = yield (0, student_controller_1.listStudentsByLabGroup)(
          groupId,
        )
        res.status(200).send(students)
      } catch (error) {
        res
          .status(500)
          .send({ message: 'Failed connecting to database', error: error })
      }
      res.send('Hello teacher')
    }),
)
studentRouter.get(
  '/list',
  session_middleware_1.sessionUserExists,
  (0, user_role_middleware_1.userHasRole)(['ADMIN', 'PROFESSOR', 'ASSISTANT']),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        const students = yield (0, student_controller_1.list)()
        res.status(200).send(students)
      } catch (error) {
        res
          .status(500)
          .send({ message: 'Failed connecting to database', error: error })
      }
    }),
)
studentRouter.get(
  '/:uniqueParam',
  session_middleware_1.sessionUserExists,
  (0, user_role_middleware_1.userHasRole)([
    'ADMIN',
    'ASSISTANT',
    'PROFESSOR',
    'STUDENT',
  ]),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      var _a
      const studentId = req.params.uniqueParam
      if (
        ((_a = req.session.user) === null || _a === void 0
          ? void 0
          : _a.role) === 'STUDENT'
      ) {
        const student = yield prisma_1.default.student.findUnique({
          where: {
            email: req.session.user.email,
          },
          select: {
            studentId: true,
          },
        })
        if (
          (student === null || student === void 0
            ? void 0
            : student.studentId) !== studentId
        ) {
          res
            .status(403)
            .send({
              message: 'Ne možete pristupiti podatcima drugih studenata.',
            })
        }
      }
      try {
        const student = yield (0, student_controller_1.getStudent)(studentId)
        res.status(200).send(student)
      } catch (error) {
        res.status(500).send({
          message: 'Greška pri spajanju na bazu podataka.',
          error: error,
        })
      }
    }),
)
studentRouter.post(
  '/create',
  session_middleware_1.sessionUserExists,
  (0, user_role_middleware_1.userHasRole)(['ADMIN', 'PROFESSOR', 'ASSISTANT']),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const studentInfo = req.body
      try {
        const newStudent = yield (0, student_controller_1.createStudent)(
          studentInfo,
        )
        res.status(200).send(newStudent)
      } catch (error) {
        res.status(500).send({
          message: 'Greška pri spajanju na bazu podataka.',
          error: error,
        })
      }
    }),
)
studentRouter.put(
  '/update/:studentId',
  session_middleware_1.sessionUserExists,
  (0, user_role_middleware_1.userHasRole)(['ADMIN', 'PROFESSOR', 'STUDENT']),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      var _b
      const studentId = req.params.studentId
      const updateData = req.body
      if (
        ((_b = req.session.user) === null || _b === void 0
          ? void 0
          : _b.role) == 'STUDENT'
      ) {
        const student = yield prisma_1.default.student.findUnique({
          where: {
            email: req.session.user.email,
          },
          select: {
            studentId: true,
          },
        })
        if (
          (student === null || student === void 0
            ? void 0
            : student.studentId) !== studentId
        ) {
          res
            .status(403)
            .send({ message: 'Ne možete mijenjati podatke drugih studenata.' })
        }
      }
      try {
        const updatedStudent = yield (0, student_controller_1.updateStudent)(
          studentId,
          updateData,
        )
        res.status(200).send(updatedStudent)
      } catch (error) {
        res.status(500).send({
          message: 'Greška pri spajanju na bazu podataka.',
          error: error,
        })
      }
    }),
)
studentRouter.delete(
  '/delete/:studentId',
  session_middleware_1.sessionUserExists,
  (0, user_role_middleware_1.userHasRole)(['ADMIN', 'PROFESSOR']),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const studentId = req.params.studentId
      try {
        const deletedStudent = yield (0, student_controller_1.deleteStudent)(
          studentId,
        )
        res.status(200).send(deletedStudent)
      } catch (error) {
        res.status(500).send({
          message: 'Greška pri spajanju na bazu podataka.',
          error: error,
        })
      }
    }),
)
exports.default = studentRouter
