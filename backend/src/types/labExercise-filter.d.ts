import { LabName } from '@prisma/client'

export type labExerciseFilterParams = {
  exerciseId?: string[]
  labName?: LabName[]
  acYear?: string[]
  studentId?: string[]
}
