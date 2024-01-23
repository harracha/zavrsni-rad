import { Prisma, Student } from '@prisma/client'
import prisma from '../lib/prisma'
import { studentFilterParams } from '../types/student-filter'
import { paginationInfo } from '../types/pagination'

export const listStudentsByClassGroup = async (classGroupId: string) => {
  try {
    // const students = await prisma.student.findMany({
    //   where: {
    //     classGroupId: classGroupId,
    //   },
    // })
    return 'students'
  } catch (error) {
    return error
  }
}

export const listStudentsByLabGroup = async (labGroupId: string) => {
  try {
    // const students = await prisma.student.findMany({
    //   where: {
    //     labGroupId: labGroupId,
    //   },
    // })
    return 'students'
  } catch (error) {
    return error
  }
}

export const list = async (
  filter: studentFilterParams,
  paginationData: paginationInfo,
) => {
  try {
    const students = await prisma.enrollment.findMany({
      where: {
        acYear: filter.acYear,
        classGroup: {
          groupName: filter.classGroupName,
        },
        labGroup: {
          groupName: filter.labGroupName,
        },
      },
      skip:
        paginationData.pageNr && paginationData.itemsPerPg
          ? (paginationData.pageNr - 1) * paginationData.itemsPerPg
          : undefined,
      take: paginationData.itemsPerPg,
      select: {
        classGroup: {
          select: { groupName: true },
        },
        labGroup: {
          select: { groupName: true },
        },
        student: true,
      },
    })

    const numOfRows = await prisma.enrollment.findMany({
      where: {
        acYear: filter.acYear,
        classGroup: {
          groupName: filter.classGroupName,
        },
        labGroup: {
          groupName: filter.labGroupName,
        },
      },
    })

    let numOfPages: number | undefined = undefined
    if (paginationData.itemsPerPg) {
      numOfPages = Math.ceil(numOfRows.length / paginationData.itemsPerPg)
    }
    const studentArray: Array<any> = []
    students.map(s => {
      const completeData = {
        ...s.student,
        ClassGroupName: s.classGroup.groupName,
        LabGroupName: s.labGroup.groupName,
      }
      return studentArray.push(completeData)
    })
    return { studentArray: studentArray, numOfPages: numOfPages }
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
    const result = await prisma.$transaction(async transactionPrisma => {
      const deletedEnrollments = await transactionPrisma.enrollment.deleteMany({
        where: {
          studentId: id,
        },
      })
      const deletedStudent = await transactionPrisma.student.delete({
        where: {
          studentId: id,
        },
      })

      return deletedStudent
    })

    return result
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

// export const getStudentsByParam = async (param: string[]) => {
//   try {

//   } catch (error) {

//   }
// }

export const tempUpdate = async () => {
  const ids =[
    'clrjx5yik006313li2pgveg0s',
    'clrjx5ykm006913lilu15c9tv',
    'clrjx5ykm006713liyckf6tjx',
    'clrjx5ykm006813lirrc6c88b',
    'clrjx5ykn006b13likmm4271g',
    'clrjx5yml006j13liepm7c0fk',
    'clrjx5ymm006n13li027syb87',
    'clrjx5ymk006f13lieewl5pm5',
    'clrjx5yml006i13liuygv7g29',
    'clrjx5yml006l13li1u91uu0b',
    'clrjx5yo6006p13licj55i0ns',
    'clrjx5yob006v13lifrly4yk0',
    'clrjx5yo9006r13lixm9qj4n6',
    'clrjx5yob006u13lif2babid5',
    'clrjx5yom006x13lizxd04jq5',
    'clrjx5ypr006z13lix7mqg6km',
    'clrjx5yq8007113liegq59smu',
    'clrjx5yqb007513liwh9cscr4',
    'clrjx5yqb007413li7k5r22l0',
    'clrjx5yqq007713liatdlj9ga',
    'clrjx5yri007913lie11kkovj',
    'clrjx5ys0007b13lihz6jwnf0',
    'clrjx5ysh007d13licohgw3xl',
    'clrjx5ysk007g13li0o4rgzpu',
    'clrjx5ysk007h13li0kfvvxsn',
    'clrjx5yt8007j13liazata2h0',
    'clrjx5yui007l13liqx8vs18x',
    'clrjx5yuu007t13ligawvyfk9',
    'clrjx5yul007o13li9yixheus',
    'clrjx5yum007r13li2zv45g65',
    'clrjx5yul007p13lilv33p007',
    'clrjx5yw5007v13li05idva9f',
    'clrjx5ywd008113liva1zdkjb',
    'clrjx5ywd008213litwl5no0s',
    'clrjx5ywa007x13lixnvnc8iw',
    'clrjx5ywd008313lixplpgr55',
    'clrjx5yxy008713lia3u75lts',
    'clrjx5yy2008b13liwww20qoc',
    'clrjx5yxy008613liz4qum7be',
    'clrjx5z7p008l13lij4tohw1r',
    'clrjx5z9n008v13li2bcm4dwz',
    'clrjx5zbx009513lil1fw5xo5',
    'clrjx5ze7009h13li5aol1vdf',
    'clrjx5zg2009r13lilkz2gqj3',
    'clrjx5zql00af13lixqe8bv16',
    'clrjx5zsu00ap13lit7mr5bux',
    'clrjx5zuu00az13licnz1vz81',
    'clrjx5yya008d13li0zkleo78',
    'clrjx5z7q008n13limbekxg5u',
    'clrjx5z9n008u13li83kvzchm',
    'clrjx5zbu009313lic8jdjhqd',
    'clrjx5ze5009f13likchadki2',
    'clrjx5zg0009p13lip5wjw52r',
    'clrjx5zqn00ah13lilnehf0ne',
    'clrjx5zt300ar13liq6t8uvjl',
    'clrjx5z7m008f13li4ja0xbz0',
    'clrjx5z9n008r13liwzgwkvou',
    'clrjx5zbz009713lija6uq3vs',
    'clrjx5zdw009d13liwzkyip44',
    'clrjx5zfo009n13liak6dcg6n',
    'clrjx5zqj00ad13lib2f86l5v',
    'clrjx5zsh00an13lizviwl5up',
    'clrjx5zu600ax13lijm1sq6cj',
    'clrjx5zwo00b313lichl74pi3',
    'clrjx5z7p008j13li4o62x6vb',
    'clrjx5z9p008x13li7b1fl75l',
    'clrjx5zbj009113liq0qgx7rx',
    'clrjx5zdt009b13liihu9lql1',
    'clrjx5zff009l13lia4a51ebe',
    'clrjx5zhh009v13li9htkznv3',
    'clrjx5zk3009z13liasj4zs16',
    'clrjx5zlp00a313li21njx2i8',
    'clrjx5zna00a713lie11s4lna',
    'clrjx5zp600ab13lidzncusql',
    'clrjx5zqz00al13lihqikvzvz',
    'clrjx5ztf00av13li3h71hcej',
    'clrjx5zwo00b113lisqek1ef0',
    'clrjx5yy0008913li8chgeg4g',
    'clrjx5z7p008k13liqmy3t11s',
    'clrjx5z9n008q13liw47yav3q',
    'clrjx5zbc008z13li4iouudce',
    'clrjx5zdi009913lig4xhtijz',
    'clrjx5zf8009j13ligl0ydsec',
    'clrjx5zgx009t13liv8wg4s95',
    'clrjx5zj8009x13li9t5vqcxp',
    'clrjx5zl900a113litwa9rhgg',
    'clrjx5zmw00a513livqo5298k',
    'clrjx5zor00a913li53jqc7p1',
    'clrjx5zqt00aj13liykxiahys',
    'clrjx5zt500at13li2blhp02i'
  ]

  console.log((Math.floor(Math.random() * 7) + 1).toString())

  const promises = ids.map(async id => {
    await prisma.results.create({
      data: {
        enrollmentId: id
      },
    })
  })

  return await Promise.all(promises)
}
