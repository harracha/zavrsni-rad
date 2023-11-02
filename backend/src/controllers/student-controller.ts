import prisma from "../lib/prisma"

export const listStudentsByClassGroup = async (classGroupId: string) => {
    try {
        const students = await prisma.student.findMany({
            where:{
                classGroupId: classGroupId
            }
        })
        return students
    } catch(error){
        return error
    }
}