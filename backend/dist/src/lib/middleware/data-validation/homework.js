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
exports.homeworkPointsValidation = void 0
const homeworkPointsValidation = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const homeworkData = Array.isArray(req.body)
      ? req.body
      : Array.from(req.body)
    homeworkData.map(homework =>
      __awaiter(void 0, void 0, void 0, function* () {
        if (homework.points > 1 || homework.points < 0) {
          res.status(400).send({
            message: `Bodovi moraju biti u rasponu [0,1]. Vaš unos: ${homework.points}`,
          })
        }
      }),
    )
    next()
  })
exports.homeworkPointsValidation = homeworkPointsValidation
