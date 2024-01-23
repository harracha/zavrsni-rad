import { Prisma } from '@prisma/client'
import prisma from '../lib/prisma'
import { classGroupFilter } from '../types/classGroup-filter'
import { paginationInfo } from '../types/pagination'

export const list = async (
  params: classGroupFilter,
  paginationData: paginationInfo,
) => {
  try {
    const classGroups = await prisma.classGroup.findMany({
      where: {
        groupId: params.groupId,
        teacher: {
          every: {
            teacherId: params.teacherId,
          },
        },
        Enrollment: {
          every: {
            studentId: params.studentId,
            acYear: params.acYear,
          },
        },
      },
      include: {
        teacher: {
          select: {
            firstName: true,
            lastName: true,
            Role: true,
          },
        },
        Enrollment: {
          where: {
            acYear: params.acYear,
          },
        },
      },
    })

    const numOfRows = await prisma.classGroup.findMany({
      where: {
        groupId: params.groupId,
        teacher: {
          every: {
            teacherId: params.teacherId,
          },
        },
        Enrollment: {
          every: {
            studentId: params.studentId,
            acYear: params.acYear,
          },
        },
      },
    })

    let numOfPages: number | undefined = undefined
    if (paginationData.itemsPerPg) {
      numOfPages = Math.ceil(numOfRows.length / paginationData.itemsPerPg)
    }

    const classGroupArray: Array<any> = []
    classGroups.map(cg => {
      const completeData = {
        groupId: cg.groupId,
        groupName: cg.groupName,
        studentCount: cg.Enrollment.length,
        professors: cg.teacher
          .filter(t => t.Role === 'PROFESSOR')
          .map(professor => ({
            fullName: `${professor.firstName} ${professor.lastName}`,
          })),
        assistants: cg.teacher
          .filter(t => t.Role === 'ASSISTANT')
          .map(assistant => ({
            fullName: `${assistant.firstName} ${assistant.lastName}`,
          })),
      }

      const professorNames = completeData.professors.map(pr => pr.fullName)

      const assistantNames = completeData.assistants.map(as => as.fullName)

      // const professorNames = ''
      // const updatedProfessors = completeData.professors.map((fullname) => ({
      //   professorNames : professorNames + fullname + ','
      // }));

      // const assistantNames = ''

      // const updatedAssistants = completeData.assistants.map((fullname) => ({
      //   assistantNames : assistantNames + fullname + ','
      // }));

      return classGroupArray.push({
        ...completeData,
        professors: professorNames.join(','),
        assistants: assistantNames.join(','),
      })
      // return classGroupArray.push(completeData)
    })

    return { classGroups: classGroupArray, numOfPages: numOfPages }
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
