'use strict'
// TODO -> setup ADMIN / PROFESSOR / ASSISTANT authentication middleware
Object.defineProperty(exports, '__esModule', { value: true })
exports.userHasRole = void 0
const userHasRole = role => {
  return (req, res, next) => {
    if (!role.includes(req.session.user.role)) {
      return res.status(401).send('User not authorized to access content')
    } else {
      next()
    }
  }
}
exports.userHasRole = userHasRole
