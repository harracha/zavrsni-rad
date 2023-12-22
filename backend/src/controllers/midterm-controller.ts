import { MidtermType, Prisma } from "@prisma/client";
import prisma from "../lib/prisma";
import { testFilter } from "../types/testFilter";
import { midtermFilterParams } from "../types/midterm-filter";

export const createMany = async (data: any) => {
    try {
        const midterms = await prisma.midterm.createMany({
            data: data
        })
        return midterms
    } catch(error){
        return error;
    }
}

export const create = async (data: Prisma.MidtermCreateInput) => {

    try{
        const midterm = await prisma.midterm.create({
            data: data
        })
        return midterm
    } catch(error){
        throw new Error(`${error}`)
    }

}

export const updateMidterm = async (midtermId: string, data: Prisma.MidtermUpdateInput) => {

    try{
        const updatedMidterm = await prisma.midterm.update({
            where: {
                midtermId: midtermId
            },
            data: data
        })
        return updatedMidterm
    } catch(error){
        return error;
    }

}

export const deleteMidterm = async (midtermId: string) => {

    try {
        const midterm = await prisma.midterm.delete({
            where: {
                midtermId: midtermId
            }
        })
        return midterm
    } catch(error){
        return error;
    }
}

export const list = async (filter: midtermFilterParams) => {

    try {
        const midterms = await prisma.midterm.findMany({
            where: {
                midtermId: {in: filter.midtermId}, 
                acYear: {in: filter.acYear},
                MidtermType: {in: filter.midtermType}, 
                studentId: {in: filter.studentId}, 
                Student: {
                    classGroup: {
                        groupName: {in: filter.classGroupName}
                    }
                }
            }
        })
        return midterms
    } catch(error) {
        return error
    }
}