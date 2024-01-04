import { ExamType, MidtermType } from '@prisma/client'
import { examFilterParams } from '../../types/exam-flter'
import { midtermFilterParams } from '../../types/midterm-filter'

export const parseMidtermFilterParams = (url: string) => {
  const filter: midtermFilterParams = {}
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
        case 'midtermId':
          filter.midtermId = split_parameter[1].split(',')
          break
        case 'classGroupName':
          filter.classGroupName = split_parameter[1].split(',')
          break
        case 'midtermType':
          filter.midtermType = split_parameter[1].split(',') as MidtermType[]
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
