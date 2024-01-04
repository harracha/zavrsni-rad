import { ExamType, LabName } from '@prisma/client'
import { examFilterParams } from '../../types/exam-flter'
import { labFilterParams } from '../../types/lab-filter'

export const parseLabExerciseFilterParams = (url: string) => {
  const filter: labFilterParams = {}
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
          filter.labName = split_parameter[1].split(',') as LabName[]
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
