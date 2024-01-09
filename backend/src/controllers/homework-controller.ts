import { Homework, Prisma, Student } from '@prisma/client'
import prisma from '../lib/prisma'
import { homeworkFilterParams } from '../types/homeworkFilter'

export const createHomework = async (data: Prisma.HomeworkCreateManyInput) => {
  try {
    const homework = await prisma.homework.createMany({
      data: data,
    })
    return homework
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
        Student: {
          classGroup: {
            groupName: { in: queryParams.classGroupName },
          },
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

export const updateHomework = async (id:string,data: Prisma.HomeworkUncheckedUpdateInput) => {
  try {
    const updatedHomework = await prisma.homework.update({
      where: {
        homeworkId: id
      },
      data: data
    })
    return updatedHomework
  } catch (error) {
    throw error
  }
}

export const deleteHomework = async (data: homeworkFilterParams) => {
  try {
    const deletedHomeworks = await prisma.homework.deleteMany({
      where: {
        homeworkId: { in: data.homeworkId },
        name: { in: data.homeworkName },
        acYear: { in: data.acYear },
        studentId: { in: data.studentId },
        Student: {
          classGroup: {
            groupName: { in: data.classGroupName },
          },
        },
      },
    })
    return deletedHomeworks
  } catch (error) {
    throw new Error(error as string)
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
      createHomework(homeworks as unknown as Prisma.HomeworkCreateManyInput),
      updateHomeworks(
        existingHomeworks as unknown as Prisma.HomeworkUncheckedUpdateManyInput,
      ),
    ])
  } catch (error) {
    throw error
  }
}
