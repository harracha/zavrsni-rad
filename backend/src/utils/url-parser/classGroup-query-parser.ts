import { ExamType } from '@prisma/client'
import { examFilterParams } from '../../types/exam-flter'
import { classGroupFilter } from '../../types/classGroup-filter'

export const parseClassGroupFilterParams = (url: string) => {
  const filter: classGroupFilter = {}
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
          filter.groupId = !['undefined', '------'].includes(split_parameter[1])
            ? split_parameter[1]
            : undefined
          break
        case 'teacherId':
          filter.teacherId = !['undefined', '------'].includes(
            split_parameter[1],
          )
            ? split_parameter[1]
            : undefined
          break
        case 'studentId':
          filter.studentId = !['undefined', '------'].includes(
            split_parameter[1],
          )
            ? split_parameter[1]
            : undefined
          break
        case 'acYear':
          filter.acYear = !['undefined', '------'].includes(split_parameter[1])
            ? split_parameter[1]
            : undefined
          console.log(filter.acYear)
          break
        default:
        // console.log(`error parameter -> ${split_parameter[0]}`)
      }
    }
  })

  return filter
}
