import { MidtermType } from '@prisma/client'

export type midtermFilterParams = {
  midtermId?: string[]
  acYear?: string[]
  classGroupName?: string[]
  midtermType?: MidtermType[]
  studentId?: string[]
}
