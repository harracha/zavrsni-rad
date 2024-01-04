import { ExamType } from '@prisma/client'
import { examFilterParams } from '../../types/exam-flter'

export const parseExamFilterParams = (url: string) => {
  const filter: examFilterParams = {}
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
        case 'examId':
          filter.examId = split_parameter[1].split(',')
          break
        case 'examType':
          filter.examType = split_parameter[1].split(',') as ExamType[]
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
          console.log(`error parameter -> ${split_parameter[0]}`)
      }
    }
  })

  return filter
}
