import { Homework, HomeworkName, Prisma, Student } from '@prisma/client'
import prisma from '../lib/prisma'
import { homeworkFilterParams } from '../types/homeworkFilter'

export const createHomeworks = async (data: Prisma.HomeworkCreateManyInput) => {
  try {
    const homework = await prisma.homework.createMany({
      data: data,
    })

    return homework
  } catch (error) {
    throw error
  }
}

export const createHomework = async (
  data: Prisma.HomeworkUncheckedCreateInput,
) => {
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_acYear_classGroupId: {
          studentId: data.studentId,
          acYear: data.acYear as string,
          classGroupId: data.classGroupId,
        },
      },
      select: {
        enrollmentId: true,
      },
    })

    const transaction = await prisma.$transaction(async transactionPrisma => {
      const homework = await transactionPrisma.homework.upsert({
        where: {
          name_acYear_studentId: {
            studentId: data.studentId as string,
            acYear: data.acYear as string,
            name: data.name as HomeworkName,
          },
        },
        update: {
          points: data.points,
        },
        create: data,
      })

      // iz baze izvuci podatke o prijasnjim bodovima

      const results = await transactionPrisma.results.findUnique({
        where: {
          enrollmentId: enrollment?.enrollmentId,
        },
        select: {
          hw_points: true,
        },
      })
      let newPoints: number = data.points
      if (results && results.hw_points) {
        newPoints = newPoints + results.hw_points
      }

      await transactionPrisma.results.update({
        where: {
          enrollmentId: enrollment?.enrollmentId,
        },
        data: {
          hw_points: newPoints,
        },
      })
      return homework
    })

    return transaction
  } catch (error) {
    throw error
  }
}

export const listStudentHomeworks = async (
  student: string | Student,
): Promise<Homework[]> => {
  try {
    const homeworks = await prisma.homework.findMany({
      where: {
        OR: [
          {
            studentId: student as string,
          },
          {
            Student: student as Student,
          },
        ],
      },
    })
    return homeworks
  } catch (error) {
    throw error
  }
}

export const getBatchHomeworks = async (
  studentIds: string[],
): Promise<Homework[]> => {
  try {
    const homeworks = await prisma.homework.findMany({
      where: {
        studentId: { in: studentIds },
      },
    })
    return homeworks
  } catch (error) {
    throw error
  }
}

export const listHomeworks = async (
  queryParams: homeworkFilterParams,
): Promise<Homework[]> => {
  try {
    const homeworks = await prisma.homework.findMany({
      where: {
        homeworkId: { in: queryParams.homeworkId },
        name: { in: queryParams.homeworkName },
        acYear: { in: queryParams.acYear },
        studentId: { in: queryParams.studentId },
        ClassGroup: {
          groupName: { in: queryParams.classGroupName },
        },
      },
    })
    return homeworks
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      console.error(error.message)
    }
    throw error
  }
}

export const updateHomeworks = async (
  data: Prisma.HomeworkUncheckedUpdateManyInput,
) => {
  try {
    const updatedHomework = await prisma.homework.updateMany({
      data: data,
    })
    return updatedHomework
  } catch (error) {
    throw new Error(error as string)
  }
}

export const updateHomework = async (
  id: string,
  data: Prisma.HomeworkUncheckedUpdateInput,
) => {
  try {
    const updatedHomework = await prisma.homework.update({
      where: {
        homeworkId: id,
      },
      data: data,
    })
    return updatedHomework
  } catch (error) {
    throw error
  }
}

export const deleteHomeworks = async (data: homeworkFilterParams) => {
  try {
    const deletedHomeworks = await prisma.homework.deleteMany({
      where: {
        homeworkId: { in: data.homeworkId },
        name: { in: data.homeworkName },
        acYear: { in: data.acYear },
        studentId: { in: data.studentId },
        ClassGroup: {
          groupName: { in: data.classGroupName },
        },
      },
    })
    return deletedHomeworks
  } catch (error) {
    throw new Error(error as string)
  }
}

export const deleteHomework = async (homeworkId: string) => {
  try {
    const transaction = await prisma.$transaction(async transactionPrisma => {
      const homework = await transactionPrisma.homework.delete({
        where: {
          homeworkId: homeworkId,
        },
      })

      // nakon brisanja zadace, potrebno azurirati bodovno stanje
      const enrollment = await transactionPrisma.enrollment.findUnique({
        where: {
          studentId_acYear_classGroupId: {
            studentId: homework.studentId,
            acYear: homework.acYear as string,
            classGroupId: homework.classGroupId,
          },
        },
        select: {
          enrollmentId: true,
        },
      })

      const oldPoints = await transactionPrisma.results
        .findUnique({
          where: {
            enrollmentId: enrollment?.enrollmentId,
          },
        })
        .then(result => {
          if (result && result.hw_points) {
            return result.hw_points
          } else {
            return 0
          }
        })

      await transactionPrisma.results.update({
        where: {
          enrollmentId: enrollment?.enrollmentId,
        },
        data: {
          hw_points: oldPoints ? oldPoints - homework.points : undefined,
        },
      })
      return homework
    })
    return transaction
  } catch (error) {
    throw error
  }
}
export const filterExistingHomeworks = async (
  data: Prisma.HomeworkUncheckedCreateInput[],
) => {
  try {
    const studentIds = data.map(homework => homework.studentId)

    const homeworks = await getBatchHomeworks(studentIds)
    const homeworksCopy = homeworks

    let existingHomeworks: Homework[] = []

    homeworksCopy.map((homework: Homework) => {
      const studentHomeworks = homeworks!.filter(
        prismaHomework => prismaHomework.studentId === homework.studentId,
      )

      const existingHomework = studentHomeworks.find(
        studentHomework =>
          studentHomework.acYear === homework.acYear &&
          studentHomework.name === homework.name &&
          studentHomework.studentId === homework.studentId,
      )

      if (existingHomework) {
        existingHomework.points = homework.points
        existingHomeworks.push(existingHomework)
        homeworks.splice(homeworks.indexOf(homework), 1)
      }
    })

    return await Promise.all([
      createHomeworks(homeworks as unknown as Prisma.HomeworkCreateManyInput),
      updateHomeworks(
        existingHomeworks as unknown as Prisma.HomeworkUncheckedUpdateManyInput,
      ),
    ])
  } catch (error) {
    throw error
  }
}
