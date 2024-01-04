import { HomeworkName } from '@prisma/client'

export type homeworkFilterParams = {
  homeworkId?: string[]
  homeworkName?: HomeworkName[]
  classGroupName?: string[]
  acYear?: string[]
  studentId?: string[]
}
