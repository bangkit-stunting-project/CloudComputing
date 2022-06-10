import { Prisma } from "@prisma/client"


const StandardStuntingList : Prisma.StandardStuntingCreateInput[] = [
    {
        gender : 'M',
        umur : 0,
        SDMinus3 : 0,
        SDMinus2 : 0,
        SDMinus1 : 0,
        Median : 0, 
        SDPlus1 : 1,
        SDPlus2 : 1,
        SDPlus3 : 1,
    }
]