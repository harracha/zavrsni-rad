import { Prisma, Version, MidtermType, ExamType } from "@prisma/client";

export type testFilter = {
    acYear?: string;
    version?: Version, 
    examType?: MidtermType | ExamType
}