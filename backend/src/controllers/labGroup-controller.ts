import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma"

export const list = async () => {
    try {
        const labGroups = await prisma.labGroup.findMany();
        return labGroups
    } catch (error) {
        return error
    }
}

export const getlabGroup = async (id: string) => { 
    try {
        const labGroup = await prisma.labGroup.findUnique({
            where: {
                groupId: id
            }
        })
        return labGroup
    } catch(error){
        return error
    }
}

export const createlabGroup = async (info: Prisma.LabGroupCreateInput) => {
    try{
        const labGroup = await prisma.labGroup.create({
            data: info
        })
        return labGroup;

    } catch(error){
        return error
    }
}

export const updatelabGroup = async(id: string, updateInfo: Prisma.LabGroupUpdateInput) => {
    try {
        const updatedGroup = await prisma.labGroup.update({
            where: {
                groupId: id
            }, 
            data:updateInfo
        })
        return updatedGroup
    } catch(error){
        return error
    }
}

export const deletelabGroup = async (id: string) => {
    try {
        const deletedGroup = await prisma.labGroup.delete({
            where: {
                groupId: id
            }
        })
        return deletedGroup
    } catch (error) {
        return error;
    }
}