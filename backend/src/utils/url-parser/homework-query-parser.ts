import { HomeworkName } from '@prisma/client'
import { homeworkFilterParams } from '../../types/homeworkFilter'

export const parseHomeworkFilterParams = (url: string) => {
  const filter: homeworkFilterParams = {}
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
          filter.homeworkName = split_parameter[1].split(',') as HomeworkName[]
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
