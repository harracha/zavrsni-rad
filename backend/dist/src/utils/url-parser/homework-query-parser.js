'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.parseHomeworkFilterParams = void 0
const parseHomeworkFilterParams = url => {
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
        case 'homeworkId':
          filter.homeworkId = split_parameter[1].split(',')
          break
        case 'homeworkName':
          filter.homeworkName = split_parameter[1].split(',')
          break
        case 'classGroupName':
          filter.classGroupName = split_parameter[1].split(',')
          break
        case 'acYear':
          filter.acYear = split_parameter[1].split(',')
          break
        case 'studentId':
          filter.studentId = split_parameter[1].split(',')
          break
        default:
          console.log(`error parametar -> ${split_parameter[0]}`)
      }
    }
  })
  return filter
}
exports.parseHomeworkFilterParams = parseHomeworkFilterParams
