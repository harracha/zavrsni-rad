import { Prisma } from '@prisma/client'
import prisma from '../lib/prisma'

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
