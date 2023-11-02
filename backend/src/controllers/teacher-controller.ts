import { Prisma } from "@prisma/client";
import prisma from '../lib/prisma';


export const create = async (inputData:  Prisma.TeacherCreateInput) => {
    try{
        const newTeacher = await prisma.teacher.create({
            data: {
                email: inputData.email, 
                firstName: inputData.firstName, 
                lastName: inputData.lastName, 
                password: inputData.password,
                classGroup: inputData.classGroup,
                labGroup: inputData.labGroup,
                profilePicture: inputData.profilePicture,
                Role: inputData.Role
            }
        })

        return newTeacher;
    } catch (error) {
        throw new Error(`Error while creating teacher\nError message: ${error}`)
    }
}

export const update = async (teacherId: string, updateData: Prisma.TeacherUpdateInput) => {
    try{
        const updatedTeacher = await prisma.teacher.update({
            where:{
                teacherId: teacherId
            },
            data: updateData
        })

        return updatedTeacher;
    } catch (error) {
        throw new Error(`Error while updating teacher with id ${teacherId}.\nError message: ${error}`)
    }
}

export const deleteTeacher = async (teacherId: string) => {
    try {
        const deletedTeacher = await prisma.teacher.delete({
            where: {
                teacherId: teacherId
            }
        })
        return deletedTeacher
    } catch(error) {
        throw new Error(`Error while deleting teacher.\nError message: ${error}`)
    }
}

export const list = async () => {
    try{
        const teachers = await prisma.teacher.findMany({
            where: {
                Role: "PROFESSOR"
            }
        })
        return teachers
    } catch(error) {
        return error
    }   
}

/* export const listByClassGroup = async (classG) => {
    try{
        const teachers = await prisma.teacher.findMany({
            where: {
                Role: "PROFESSOR"
            }
        })
        return teachers
    } catch(error) {
        return error
    }   
} */



