import { ExamType } from "@prisma/client";

export type examFilterParams ={
    examId?: string[];
    acYear?: string[];
    classGroupName?: string[];
    examType?:ExamType[];
    studentId?: string[];
}