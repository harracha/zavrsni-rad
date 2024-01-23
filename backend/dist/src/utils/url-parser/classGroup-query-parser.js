'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.parseClassGroupFilterParams = void 0
const parseClassGroupFilterParams = url => {
  const filter = {}
  const splitUrl = url.split('?')
  if (splitUrl.length === 1) {
    return filter
  }
  const paramsString = splitUrl[1]
  const paramsArray = paramsString.split('&')
  paramsArray.forEach(param => {
    var split_parameter = param.split('=')
    if (split_parameter.length !== 1) {
      switch (split_parameter[0]) {
        case 'groupId':
          filter.groupId = split_parameter[1].split(',')
          break
        case 'teacherId':
          filter.teacherId = split_parameter[1].split(',')
          break
        case 'studentId':
          filter.studentId = split_parameter[1].split(',')
          break
        default:
          console.log(`error parameter -> ${split_parameter[0]}`)
      }
    }
  })
  return filter
}
exports.parseClassGroupFilterParams = parseClassGroupFilterParams
