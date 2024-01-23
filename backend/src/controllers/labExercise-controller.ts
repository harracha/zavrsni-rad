import { LabName, Prisma } from '@prisma/client'
import prisma from '../lib/prisma'
import { labExerciseFilterParams } from '../types/labExercise-filter'

export const createLabExercise = async (
  data: Prisma.LabExerciseUncheckedCreateInput,
) => {
  try {
    const transaction = await prisma.$transaction(async transactionPrisma => {
      const lab = await transactionPrisma.labExercise.upsert({
        where: {
          labName_acyear_studentId: {
            studentId: data.studentId,
            acyear: data.acyear as string,
            labName: data.labName,
          },
        },
        update: {
          labPoints: data.labPoints || undefined,
          kpzPoints: data.kpzPoints || undefined,
        },
        create: data,
      })

      // prijasnji bodovi
      const enrollment = await transactionPrisma.enrollment.findUnique({
        where: {
          studentId_acYear_labGroupId: {
            studentId: data.studentId,
            acYear: data.acyear as string,
            labGroupId: data.labGroupId,
          },
        },
        select: {
          enrollmentId: true,
          acYear: true,
        },
      })

      const newPoints: { labPoints: number; kpzPoints: number } =
        await transactionPrisma.labExercise
          .findMany({
            where: {
              acyear: lab.acyear,
              studentId: lab.studentId,
              labGroupId: lab.labGroupId,
            },
          })
          .then(response => {
            return {
              labPoints: response.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.labPoints
              }, 0),
              kpzPoints: response.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.kpzPoints
              }, 0),
            }
          })

      await transactionPrisma.results.update({
        where: {
          enrollmentId: enrollment?.enrollmentId,
        },
        data: {
          lab_points: newPoints.labPoints,
          kpz_points: newPoints.kpzPoints,
        },
      })
      // provjeri ispunjava li student uvjet sto se tice labosa
      if (data.labName === 'NINTH') {
        const labs = await transactionPrisma.labExercise
          .findMany({
            where: {
              studentId: data.studentId,
            },
            select: {
              labName: true,
            },
          })
          .then(response => {
            return response.map(lab => lab.labName)
          })

        if (labs.length === 9) {
          await transactionPrisma.results.update({
            where: {
              enrollmentId: enrollment?.enrollmentId,
            },
            data: {
              lab_condition: true,
            },
          })
        }
      }
      return lab
    })
    return transaction
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

export const updateLabExercise = async (
  updateData: Prisma.LabExerciseUncheckedUpdateInput,
) => {
  try {
    // const labs = await prisma.labExercise.updateMany({
    //   data: updateData,
    // })

    const transaction = await prisma.$transaction(async transactionPrisma => {
      const lab = await transactionPrisma.labExercise.update({
        where: {
          exerciseId: updateData.exerciseId as string,
        },
        data: updateData,
      })

      const enrollment = await transactionPrisma.enrollment.findUnique({
        where: {
          studentId_acYear_labGroupId: {
            studentId: lab.studentId,
            acYear: lab.acyear as string,
            labGroupId: lab.labGroupId,
          },
        },
        select: {
          enrollmentId: true,
        },
      })

      if (updateData.labPoints || updateData.kpzPoints) {
        const newPoints: { labPoints: number; kpzPoints: number } =
          await transactionPrisma.labExercise
            .findMany({
              where: {
                acyear: lab.acyear,
                studentId: lab.studentId,
                labGroupId: lab.labGroupId,
              },
            })
            .then(response => {
              return {
                labPoints: response.reduce((accumulator, currentValue) => {
                  return accumulator + currentValue.labPoints
                }, 0),
                kpzPoints: response.reduce((accumulator, currentValue) => {
                  return accumulator + currentValue.kpzPoints
                }, 0),
              }
            })

        await transactionPrisma.results.update({
          where: {
            enrollmentId: enrollment?.enrollmentId,
          },
          data: {
            lab_points: newPoints.labPoints,
            kpz_points: newPoints.kpzPoints,
          },
        })
      }
      return lab
    })
    return transaction
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

export const deleteLabExercise = async (labId: string) => {
  try {
    const transaction = await prisma.$transaction(async transactionPrisma => {
      const lab = await transactionPrisma.labExercise.delete({
        where: {
          exerciseId: labId,
        },
      })

      const enrollment = await transactionPrisma.enrollment.findUnique({
        where: {
          studentId_acYear_labGroupId: {
            studentId: lab.studentId,
            acYear: lab.acyear as string,
            labGroupId: lab.exerciseId,
          },
        },
      })

      const newPoints: { labPoints: number; kpzPoints: number } =
        await transactionPrisma.labExercise
          .findMany({
            where: {
              acyear: lab.acyear,
              studentId: lab.studentId,
              labGroupId: lab.labGroupId,
            },
          })
          .then(response => {
            return {
              labPoints: response.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.labPoints
              }, 0),
              kpzPoints: response.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.kpzPoints
              }, 0),
            }
          })

      await transactionPrisma.results.update({
        where: {
          enrollmentId: enrollment?.enrollmentId,
        },
        data: {
          lab_points: newPoints.labPoints,
          kpz_points: newPoints.kpzPoints,
        },
      })

      return lab
    })
    return transaction
  } catch (error) {
    throw error
  }
}
