import { Prisma } from '@prisma/client'
import prisma from '../lib/prisma'

export const getDropdownData = async (acYear: string) => {
  try {
    const data = await prisma.enrollment.findMany({
      where: {
        acYear: acYear,
      },
      distinct: ['classGroupId', 'labGroupId'],
      select: {
        classGroup: {
          select: {
            groupName: true,
          },
        },
        labGroup: {
          select: {
            groupName: true,
          },
        },
      },
    })

    const cgNames = data
      .map(e => e.classGroup.groupName)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort()
    const labNames = data
      .map(e => e.labGroup.groupName)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort()

    return {
      classGroups: ['------', ...cgNames],
      labGroups: ['------', ...labNames],
    }
  } catch (error) {
    throw error
  }
}

export const getAcYears = async () => {
  try {
    const data = await prisma.enrollment.findMany({
      distinct: ['acYear'],
      select: {
        acYear: true,
      },
    })
    const acYearsArray = data.map(e => e.acYear)
    return { acYears: acYearsArray }
  } catch (error) {
    throw error
  }
}

export const create = async (data: Prisma.EnrollmentUncheckedCreateInput) => {
  try {
    const transaction = prisma.$transaction(async transactionPrisma => {
      const enrollment = await transactionPrisma.enrollment.create({
        data: data,
      })

      const result = await transactionPrisma.results.create({
        data: {
          enrollmentId: enrollment.enrollmentId,
        },
      })

      return enrollment
    })

    return transaction
  } catch (error) {
    throw error
  }
}
