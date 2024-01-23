'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.parseLabExerciseFilterParams = void 0
const parseLabExerciseFilterParams = url => {
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
        case 'exerciseId':
          filter.labId = split_parameter[1].split(',')
          break
        case 'labName':
          filter.labName = split_parameter[1].split(',')
          break
        case 'acYear':
          filter.acYear = split_parameter[1].split(',')
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
exports.parseLabExerciseFilterParams = parseLabExerciseFilterParams
