import { Prisma } from '@prisma/client'
import prisma from '../lib/prisma'
import { classGroupFilter } from '../types/classGroup-filter'

export const list = async (params: classGroupFilter) => {
  try {
    const classGroups = await prisma.classGroup.findMany({
      where: {
        groupId: {in: params.groupId}, 
        teacher: {
          every: {
            teacherId: {in: params.teacherId}
          }
        }, 
        Students: {
          every: {
            studentId: {in:params.studentId}
          }
        }
      }
    })
    return classGroups
  } catch (error) {
    return error
  }
}

export const getClassGroup = async (id: string) => {
  try {
    const classGroup = await prisma.classGroup.findUnique({
      where: {
        groupId: id,
      },
    })
    return classGroup
  } catch (error) {
    return error
  }
}

export const createClassGroup = async (info: Prisma.ClassGroupCreateInput) => {
  try {
    const classGroup = await prisma.classGroup.create({
      data: info,
    })
    return classGroup
  } catch (error) {
    return error
  }
}

export const updateClassGroup = async (
  id: string,
  updateInfo: Prisma.ClassGroupUpdateInput,
) => {
  try {
    const updatedGroup = await prisma.classGroup.update({
      where: {
        groupId: id,
      },
      data: updateInfo,
    })
    return updatedGroup
  } catch (error) {
    return error
  }
}

export const deleteClassGroup = async (id: string) => {
  try {
    const deletedGroup = await prisma.classGroup.delete({
      where: {
        groupId: id,
      },
    })
    return deletedGroup
  } catch (error) {
    return error
  }
}
