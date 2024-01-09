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

export const updateLabExercises = async (
  updateData: Prisma.LabExerciseUncheckedUpdateManyInput,
) => {
  try {
    const labs = await prisma.labExercise.updateMany({
      data: updateData,
    })
    return labs
  } catch (error) {
    throw error
  }
}

export const deleteLabExercises = async (
  deleteParams: labExerciseFilterParams,
) => {
  try {
    const deletedLabs = await prisma.labExercise.deleteMany({
      where: {
        exerciseId: { in: deleteParams.exerciseId },
        acyear: { in: deleteParams.acYear },
        labName: { in: deleteParams.labName },
        studentId: { in: deleteParams.studentId },
      },
    })
    return deletedLabs
  } catch (error) {
    throw error
  }
}
