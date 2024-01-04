import { Prisma, Student } from '@prisma/client'
import prisma from '../lib/prisma'

export const listStudentsByClassGroup = async (classGroupId: string) => {
  try {
    const students = await prisma.student.findMany({
      where: {
        classGroupId: classGroupId,
      },
    })
    return students
  } catch (error) {
    return error
  }
}

export const listStudentsByLabGroup = async (labGroupId: string) => {
  try {
    const students = await prisma.student.findMany({
      where: {
        labGroupId: labGroupId,
      },
    })
    return students
  } catch (error) {
    return error
  }
}

export const list = async () => {
  try {
    const students = await prisma.student.findMany()
    return students
  } catch (error) {
    return error
  }
}

export const createStudent = async (info: Prisma.StudentCreateInput) => {
  try {
    const student = await prisma.student.create({
      data: info,
    })
    return student
  } catch (error) {
    return error
  }
}

export const updateStudent = async (
  id: string,
  info: Prisma.StudentUpdateInput,
) => {
  try {
    const updatedStudent = await prisma.student.update({
      where: {
        studentId: id,
      },
      data: info,
    })
    return updatedStudent
  } catch (error) {
    return error
  }
}

export const deleteStudent = async (id: string) => {
  try {
    const deletedStudent = await prisma.student.delete({
      where: {
        studentId: id,
      },
    })
    return deletedStudent
  } catch (error) {
    return error
  }
}

export const getStudent = async (param: string) => {
  try {
    const student = await prisma.student.findUnique({
      where: {
        studentId: param,
        OR: [{ email: param }, { JMBAG: param }],
      },
    })
    return student
  } catch (error) {
    return error
  }
}
