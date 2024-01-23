import { ExamType, Prisma } from '@prisma/client'
import prisma from '../lib/prisma'
import { testFilter } from '../types/testFilter'
import { examFilterParams } from '../types/exam-flter'
import { calculateTotalPoints } from './results-controller'

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

export const create = async (data: Prisma.ExamUncheckedCreateInput) => {
  try {
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        classGroupId: data.classGroupId,
        studentId: data.studentId,
        acYear: data.acYear,
      },
      select: {
        enrollmentId: true,
      },
    })

    const transaction = await prisma.$transaction(async transactionPrisma => {
      const exam = await transactionPrisma.exam.create({
        data: data,
      })

       await transactionPrisma.results.update({
        where: {
          enrollmentId: enrollment?.enrollmentId,
        },
        data: {
          written_points: exam.points_written,
          oral_points: exam.points_oral ? exam.points_oral : 0,
          exam: true,
        },
      })
      await calculateTotalPoints(enrollment?.enrollmentId)
      return exam
    })

    return transaction
  } catch (error) {
    return error
  }
}

export const updateExam = async (
  examId: string,
  data: Prisma.ExamUncheckedUpdateInput,
) => {
  try {
    if (data.points_written || data.points_oral) {
      const enrollment = await prisma.enrollment.findFirst({
        where: {
          classGroupId: data.classGroupId as string,
          studentId: data.studentId as string,
          acYear: data.acYear as string,
        },
        select: {
          enrollmentId: true,
        },
      })
      const transaction = await prisma.$transaction(async transactionPrisma => {
        const exam = await transactionPrisma.exam.update({
          where: {
            examId: examId,
          },
          data: data,
        })

        await transactionPrisma.results.update({
          where: {
            enrollmentId: enrollment?.enrollmentId,
          },
          data: {
            written_points: data.points_written
              ? data.points_written
              : undefined,
            oral_points: data.points_oral ? data.points_oral : undefined,
          },
        })

        await calculateTotalPoints(enrollment?.enrollmentId)

        return exam
      })
      return transaction
    } else {
      const updatedexam = await prisma.exam.update({
        where: {
          examId: examId,
        },
        data: data,
      })

      return updatedexam
    }
  } catch (error) {
    return error
  }
}

export const deleteExam = async (examId: string) => {
  try {
    const deletedExam = await prisma.exam.delete({
      where: {
        examId: examId,
      },
    })

    const pointObject: {
      points_written: number | null
      points_oral: number | null
    } = {
      points_written: null,
      points_oral: null,
    }

    // posto se obrisao ispit, potrebno je azurirati results tablicu sa vrijednostima starih ispita
    const oldExamScores = await prisma.exam
      .findMany({
        where: {
          studentId: deletedExam.studentId,
          acYear: deletedExam.acYear,
          classGroupId: deletedExam.classGroupId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
      .then(exams => {
        if (exams.length !== 0) {
          pointObject.points_written = exams[0].points_written
          pointObject.points_oral = exams[0].points_oral
        } else return undefined
      })

    // ako nije pronadjen nijedan ispit, trazi MI/ZI za studenta

    if (!oldExamScores) {
      await prisma.midterm
        .findMany({
          where: {
            studentId: deletedExam.studentId,
            acYear: deletedExam.acYear,
            classGroupId: deletedExam.classGroupId,
          },
          orderBy: {
            createdAt: 'desc',
          },
        })
        .then(midterms => {
          if (midterms.length !== 0) {
            pointObject.points_written = midterms[0].points_written
            pointObject.points_oral = midterms[0].points_oral
          } else return undefined
        })
    }

    // azuriranje rezultata za studenta, potreban zapis o upisu godine studenta
    const studentEnrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_acYear_classGroupId: {
          acYear: deletedExam.acYear,
          classGroupId: deletedExam.classGroupId,
          studentId: deletedExam.studentId,
        },
      },
      select: {
        enrollmentId: true,
      },
    })

    await prisma.results.update({
      where: {
        enrollmentId: studentEnrollment?.enrollmentId,
      },
      data: {
        written_points: pointObject.points_written || undefined,
        oral_points: pointObject.points_oral || undefined,
      },
    })

    await calculateTotalPoints(studentEnrollment?.enrollmentId)

    return deletedExam
  } catch (error) {
    return error
  }
}

export const deleteExams = async (filter: examFilterParams) => {
  try {
    const exams = await prisma.exam.deleteMany({
      where: {
        examId: { in: filter.examId },
        acYear: { in: filter.acYear },
        ClassGroup: {
          groupName: { in: filter.classGroupName },
        },
        ExamType: { in: filter.examType },
        studentId: { in: filter.studentId },
      },
    })
    return exams
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
        ClassGroup: {
          groupName: { in: filter.classGroupName },
        },
      },
    })
    return exams
  } catch (error) {
    return error
  }
}
