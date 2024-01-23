import { MidtermType, Prisma } from '@prisma/client'
import prisma from '../lib/prisma'
import { testFilter } from '../types/testFilter'
import { midtermFilterParams } from '../types/midterm-filter'

export const createMany = async (data: any) => {
  try {
    const midterms = await prisma.midterm.createMany({
      data: data,
    })
    return midterms
  } catch (error) {
    return error
  }
}

export const create = async (data: Prisma.MidtermUncheckedCreateInput) => {
  try {
    const transaction = await prisma.$transaction(async tp => {
      const midterm = await tp.midterm.upsert({
        where: {
          studentId_MidtermType_acYear: {
            studentId: data.studentId,
            MidtermType: data.MidtermType,
            acYear: data.acYear,
          },
        },
        update: {
          points_written: data.points_written || undefined,
          points_oral: data?.points_oral || undefined,
        },
        create: data,
        include: {
          ClassGroup: {
            select: {
              Enrollment: {
                where: {
                  studentId: data.studentId,
                  acYear: data.acYear,
                  classGroupId: data.classGroupId,
                },
                select: {
                  enrollmentId: true,
                },
              },
            },
          },
        },
      })

      const examFlag = await tp.results
        .findUnique({
          where: {
            enrollmentId: midterm.ClassGroup.Enrollment[0].enrollmentId,
          },
          select: {
            exam: true,
          },
        })
        .then(response => response?.exam)

      if (!examFlag) {
        const midtermPoints: { points_written: number; points_oral: number } =
          await tp.midterm
            .findMany({
              where: {
                studentId: data.studentId,
                acYear: data.acYear,
              },
              select: {
                points_oral: true,
                points_written: true,
              },
            })
            .then(response => {
              return {
                points_written: response.reduce((prevValue, accumulator) => {
                  return prevValue + accumulator.points_written
                }, 0),
                points_oral: response.reduce((prevValue, accumulator) => {
                  if (accumulator.points_oral) {
                    return prevValue + accumulator.points_oral
                  } else return prevValue
                }, 0),
              }
            })

        await tp.results.update({
          where: {
            enrollmentId: midterm.ClassGroup.Enrollment[0].enrollmentId,
          },
          data: {
            written_points: midtermPoints.points_written || undefined,
            oral_points: midtermPoints.points_oral || undefined,
          },
        })
      }
      return midterm
    })
    return transaction
  } catch (error) {
    throw new Error(`${error}`)
  }
}

export const updateMidterm = async (
  midtermId: string,
  data: Prisma.MidtermUncheckedUpdateInput,
) => {
  try {
    // const transaction = await prisma.$transaction(async(tp) => {

    // })
    const updatedMidterm = await prisma.midterm.update({
      where: {
        midtermId: midtermId,
      },
      data: data,
    })
    return updatedMidterm
  } catch (error) {
    return error
  }
}

export const deleteMidterm = async (midtermId: string) => {
  try {
    const midterm = await prisma.midterm.delete({
      where: {
        midtermId: midtermId,
      },
    })
    return midterm
  } catch (error) {
    return error
  }
}

export const list = async (filter: midtermFilterParams) => {
  try {
    const midterms = await prisma.midterm.findMany({
      where: {
        midtermId: { in: filter.midtermId },
        acYear: { in: filter.acYear },
        MidtermType: { in: filter.midtermType },
        studentId: { in: filter.studentId },
        ClassGroup: {
          groupName: { in: filter.classGroupName },
        },
      },
    })
    return midterms
  } catch (error) {
    return error
  }
}
