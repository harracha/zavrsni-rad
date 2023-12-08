import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";

export const createMany = async (data: Prisma.MidtermCreateManyInput) => {
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
        return error
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