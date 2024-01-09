import { ExamType, Prisma } from '@prisma/client'
import prisma from '../lib/prisma'
import { testFilter } from '../types/testFilter'
import { examFilterParams } from '../types/exam-flter'

export const createMany = async (data: Prisma.ExamCreateManyInput) => {
  try {
    const exams = await prisma.exam.createMany({
      data: data,
    })
    return exams
  } catch (error) {
    return error
  }
}

export const create = async (data: Prisma.ExamCreateInput) => {
  try {
    const exam = await prisma.exam.create({
      data: data,
    })
    return exam
  } catch (error) {
    return error
  }
}

export const updateExam = async (
  examId: string,
  data: Prisma.ExamUpdateInput,
) => {
  try {
    const updatedexam = await prisma.exam.update({
      where: {
        examId: examId,
      },
      data: data,
    })
    return updatedexam
  } catch (error) {
    return error
  }
}

export const deleteExam = async (examId: string) => {
  try {
    const exam = await prisma.exam.delete({
      where: {
        examId: examId,
      },
    })
    return exam
  } catch (error) {
    return error
  }
}

export const deleteExams = async (filter: examFilterParams) => {
  try {
    const exams = await prisma.exam.deleteMany({
      where: {
        examId: {in: filter.examId},
        acYear: {in: filter.acYear},
        Student: {
          classGroup: {
            groupName: {in: filter.classGroupName}
          }
        }, 
        ExamType: {in: filter.examType}, 
        studentId: {in: filter.studentId}
      }
    })
    return exams;
  } catch (error) {
    throw error
  }
}

export const list = async (filter: examFilterParams) => {
  try {
    const exams = await prisma.exam.findMany({
      where: {
        examId: { in: filter.examId },
        acYear: { in: filter.acYear },
        ExamType: { in: filter.examType },
        studentId: { in: filter.studentId },
        Student: {
          classGroup: {
            groupName: { in: filter.classGroupName },
          },
        },
      },
    })
    return exams
  } catch (error) {
    return error
  }
}
