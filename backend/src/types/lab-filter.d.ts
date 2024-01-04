import { LabName } from '@prisma/client'

export type labFilterParams = {
  labId?: string[]
  labName?: LabName[]
  acYear?: string[]
  labGroupName?: string[]
  studentId?: string[]
}
