import { Prisma } from '@prisma/client'
import prisma from '../lib/prisma'
import { labExerciseFilterParams } from '../types/labExercise-filter'

export const createLabExercises = async (
  data: Prisma.LabExerciseCreateManyInput,
) => {
  try {
    const labs = await prisma.labExercise.createMany({
      data: data,
    })
    return labs
  } catch (error) {
    throw error
  }
}

export const getLabExercises = async (params: labExerciseFilterParams) => {
  try {
    const labs = await prisma.labExercise.findMany({
      where: {
        exerciseId: { in: params.exerciseId },
        acyear: { in: params.acYear },
        labName: { in: params.labName },
        studentId: { in: params.studentId },
      },
    })
    return labs
  } catch (error) {
    throw error
  }
}
