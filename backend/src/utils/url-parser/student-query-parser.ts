import { ExamType, MidtermType } from '@prisma/client'
import { examFilterParams } from '../../types/exam-flter'
import { midtermFilterParams } from '../../types/midterm-filter'
import { studentFilterParams } from '../../types/student-filter'

export const parseStudentFilterParams = (url: string) => {
  const filter: studentFilterParams = {}
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
        case 'uniqueParam':
          filter.uniqueParam = !['undefined', '------'].includes(
            split_parameter[1],
          )
            ? split_parameter[1]
            : undefined
          break
        case 'classGroupName':
          filter.classGroupName = !['undefined', '------'].includes(
            split_parameter[1],
          )
            ? split_parameter[1]
            : undefined
          console.log(filter.classGroupName)
          break
        case 'labGroupName':
          filter.labGroupName = !['undefined', '------'].includes(
            split_parameter[1],
          )
            ? split_parameter[1]
            : undefined
          console.log(filter.labGroupName)
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
