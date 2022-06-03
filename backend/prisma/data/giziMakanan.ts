import { Prisma } from "@prisma/client"

export const giziMakananList : Prisma.GiziMakananCreateInput[] = [
    {
        namaMakanan : 'Ayam Taliwang',
        Air : 57.5,
        Energi: 264,
        Protein : 18.2,
        Lemak : 20.1,
        Karbohidrat : 2.7,
        Serat : 0,
        Ca : 1.5,
        F : 94,
        Fe2 : 2.,
        Na : 507,
        Ka : 408.0,
        Cu : 0.40,
        Zn2 : 12.3,
        // Retinol -> Vit A
        VitA : 1067,
        // Thiamin -> B1
        VitB1 : 0,
        // Riboflamin -> B2
        VitB2 : 0,
        // Niasin -> B3
        VitB3 : 0,
        VitC : 0
    }
] 