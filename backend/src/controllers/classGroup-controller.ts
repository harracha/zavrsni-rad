import { Prisma } from '@prisma/client'
import prisma from '../lib/prisma'

export const list = async () => {
  try {
    const classGroups = await prisma.classGroup.findMany()
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
