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
const session_middleware_1 = require('../lib/middleware/session-middleware')
const labGroup_controller_1 = require('../controllers/labGroup-controller')
const user_role_middleware_1 = require('../lib/middleware/user-role-middleware')
const prisma_1 = __importDefault(require('../lib/prisma'))
const labGroupRouter = (0, express_1.Router)()
labGroupRouter.get(
  '/list',
  session_middleware_1.sessionUserExists,
  (0, user_role_middleware_1.userHasRole)(['ADMIN', 'PROFESSOR']),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        const labGroups = yield (0, labGroup_controller_1.list)()
        res.status(200).send(labGroups)
      } catch (error) {
        console.log(error)
        res
          .status(500)
          .send({ message: 'Failed connecting to database', error: error })
      }
    }),
)
labGroupRouter.get(
  '/get/:labGroupId',
  session_middleware_1.sessionUserExists,
  (0, user_role_middleware_1.userHasRole)(['ADMIN', 'ASSISTANT', 'PROFESSOR']),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      var _a, _b
      const id = req.params.labGroupId
      if (
        ((_a = req.session.user) === null || _a === void 0
          ? void 0
          : _a.role) === 'ASSISTANT'
      ) {
        const assistant = yield prisma_1.default.teacher.findUnique({
          where: {
            email: req.session.user.email,
          },
          select: {
            labGroup: true,
          },
        })
        if (
          ((_b =
            assistant === null || assistant === void 0
              ? void 0
              : assistant.labGroup) === null || _b === void 0
            ? void 0
            : _b.groupId) !== id
        ) {
          res.status(403).send({
            message: `Nemate pristup detaljima grupe predavanja koja Vam nije dodijeljena.`,
          })
        }
      }
      try {
        const labGroup = yield (0, labGroup_controller_1.getlabGroup)(id)
        res.status(200).send(labGroup)
      } catch (error) {
        res.send(500).send({
          message: 'Greška pri spajanju na bazu podataka.',
          error: error,
        })
      }
    }),
)
labGroupRouter.post(
  '/create',
  session_middleware_1.sessionUserExists,
  (0, user_role_middleware_1.userHasRole)(['ADMIN', 'PROFESSOR']),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const labGroupInfo = req.body
      try {
        const newlabGroup = yield (0, labGroup_controller_1.createlabGroup)(
          labGroupInfo,
        )
        res.status(200).send(newlabGroup)
      } catch (error) {
        res.status(500).send({
          message: 'Greška pri spajanju na bazu podataka.',
          error: error,
        })
      }
    }),
)
labGroupRouter.put(
  '/update/:labGroupId',
  session_middleware_1.sessionUserExists,
  (0, user_role_middleware_1.userHasRole)(['ADMIN', 'PROFESSOR']),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const id = req.params.labGroupId
      const updateInfo = req.body
      try {
        const updatedGroup = yield (0, labGroup_controller_1.updatelabGroup)(
          id,
          updateInfo,
        )
        res.status(200).send(updatedGroup)
      } catch (error) {
        res.status(500).send({
          message: 'Greška pri spajanju na bazu podataka.',
          error: error,
        })
      }
    }),
)
labGroupRouter.delete(
  '/delete/:labGroupId',
  session_middleware_1.sessionUserExists,
  (0, user_role_middleware_1.userHasRole)(['ADMIN', 'PROFESSOR']),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const id = req.params.labGroupId
      try {
        const deletedGroup = yield (0, labGroup_controller_1.deletelabGroup)(id)
        res.send(200).send(deletedGroup)
      } catch (error) {
        res.status(500).send({
          message: 'Greška pri spajanju na bazu podataka.',
          error: error,
        })
      }
    }),
)
exports.default = labGroupRouter
