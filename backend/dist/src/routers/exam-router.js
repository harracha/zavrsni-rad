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
const session_middleware_1 = require('../lib/middleware/session-middleware')
const user_role_middleware_1 = require('../lib/middleware/user-role-middleware')
const exam_controller_1 = require('../controllers/exam-controller')
const exam_query_parser_1 = require('../utils/url-parser/exam-query-parser')
const exam_1 = require('../lib/middleware/data-validation/exam')
const examRouter = (0, express_1.Router)()
examRouter.post(
  '/createMany',
  session_middleware_1.sessionUserExists,
  exam_1.examPointsValidation,
  (0, user_role_middleware_1.userHasRole)(['ADMIN', 'PROFESSOR']),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const examData = req.body
      try {
        const exams = yield (0, exam_controller_1.createMany)(examData)
        res.status(200).send(exams)
      } catch (error) {
        res.status(500).send({
          message: 'Greška pri spajanju na bazu podataka.',
          error: error,
        })
      }
    }),
)
// POTENCIJALNO SE NECE KORISTITI
examRouter.post(
  '/create',
  session_middleware_1.sessionUserExists,
  (0, user_role_middleware_1.userHasRole)(['ADMIN', 'PROFESSOR']),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const examData = req.body
      try {
        const exam = yield (0, exam_controller_1.create)(examData)
        res.status(200).send(exam)
      } catch (error) {
        res.status(500).send({
          message: 'Greška pri spajanju na bazu podataka.',
          error: error,
        })
      }
    }),
)
examRouter.put(
  '/update/:examId',
  session_middleware_1.sessionUserExists,
  exam_1.examPointsValidation,
  (0, user_role_middleware_1.userHasRole)(['ADMIN', 'PROFESSOR']),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const examId = req.params.examId
      const updateData = req.body
      try {
        const updatedExam = yield (0, exam_controller_1.updateExam)(
          examId,
          updateData,
        )
        res.status(200).send(updatedExam)
      } catch (error) {
        res.status(500).send({
          message: 'Greška pri spajanju na bazu podataka.',
          error: error,
        })
      }
    }),
)
examRouter.delete(
  '/delete/:examId',
  session_middleware_1.sessionUserExists,
  (0, user_role_middleware_1.userHasRole)(['ADMIN', 'PROFESSOR']),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const examId = req.params.examId
      try {
        const deletedExam = yield (0, exam_controller_1.deleteExam)(examId)
        res.status(200).send(deletedExam)
      } catch (error) {
        res.status(500).send({
          message: 'Greška pri spajanju na bazu podataka.',
          error: error,
        })
      }
    }),
)
examRouter.delete(
  '/delete',
  session_middleware_1.sessionUserExists,
  (0, user_role_middleware_1.userHasRole)(['ADMIN', 'PROFESSOR']),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const deleteFilter = req.body
      try {
        const deletedExams = yield (0, exam_controller_1.deleteExams)(
          deleteFilter,
        )
        res.status(200).send(deletedExams)
      } catch (error) {
        res.status(500).send({
          message: 'Greška pri spajanju na bazu podataka.',
          error: error,
        })
      }
    }),
)
examRouter.get(
  '/list',
  session_middleware_1.sessionUserExists,
  (0, user_role_middleware_1.userHasRole)(['ADMIN', 'PROFESSOR']),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const filter = (0, exam_query_parser_1.parseExamFilterParams)(req.url)
      try {
        const exams = yield (0, exam_controller_1.list)(filter)
        res.status(200).send(exams)
      } catch (error) {
        res.status(500).send({
          message: 'Greška pri spajanju na bazu podataka.',
          error: error,
        })
      }
    }),
)
exports.default = examRouter
