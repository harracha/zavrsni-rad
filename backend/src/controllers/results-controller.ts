import prisma from '../lib/prisma'

export const getClassGroupsPoints = async (acYear: string) => {
  try {
    const classGroups = await prisma.classGroup.findMany({
      where: {
        Enrollment: {
          every: {
            acYear: acYear,
          },
        },
      },
      include: {
        Enrollment: true,
      },
    })

    const enrollmentIds: Array<any> = []
    classGroups.map(cg => {
      return cg.Enrollment.map(e => {
        return enrollmentIds.push(e.enrollmentId)
      })
    })

    const results = await prisma.results.findMany({
      where: {
        enrollmentId: { in: enrollmentIds },
      },
      select: {
        hw_points: true,
        total_points: true,
      },
    })

    const totalPointsSum = results.reduce((prev, acc) => {
        if(acc.total_points){
            return prev + acc.total_points
        }
        else return prev
    }, 0)

    const hwPointsSum = results.reduce((prev, acc) => {
        if(acc.hw_points){
            return prev + acc.hw_points
        }
        else return prev
    }, 0)

    return {totalAvg: totalPointsSum/results.length, homeworkAvg: hwPointsSum/results.length}


  } catch (error) {
    throw error
  }
}

export const calculateTotalPoints = async (enrollmentId: string | undefined) => {
  try {
    const transaction: any = await prisma.$transaction(async tp => {
      const results = await tp.results.findUnique({
        where: {
          enrollmentId: enrollmentId,
        },
        select: {
          hw_points: true,
          kpz_points: true,
          lab_points: true,
          oral_points: true,
          class_points: true,
          written_points: true,
        },
      })
      if (results) {
        const pointsArray = Object.values(results).map(value =>
          value !== null ? value : 0,
        )
        const total_points = pointsArray.reduce((prevValue, accumulator) => {
          return prevValue + accumulator
        }, 0)
        let grade: number | undefined = undefined
        switch (true) {
          case total_points < 50:
            grade = 1
            break
          case total_points >= 50 && total_points <= 64:
            grade = 2
            break
          case total_points >= 65 && total_points <= 74:
            grade = 3
            break
          case total_points >= 75 && total_points <= 84:
            grade = 4
            break
          case total_points >= 85:
            grade = 5
            break
          default:
            grade = undefined
            break
        }

        await tp.results.update({
          where: {
            enrollmentId: enrollmentId,
          },
          data: {
            total_points: total_points,
            grade: grade,
          },
        })
      }
      return transaction
    })
  } catch (error) {
    throw error
  }
}
