import {Prisma} from '@prisma/client'

const standardGiziList : Prisma.StandarGiziCreateInput[] = [
    {
        kelompok : 'Bayi / Anak',
        awalRentang : 0,
        akhirRentang : 5,
        satuan : 'bulan',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 6,
                tinggiBadan : 60,
                Energi : 550,
                Protein : 9,
                Lemak : 31,
                Karbohidrat : 59,
                Serat : 0,
                Air : 700,
                // Vitamin
                VitA : 375,
                VitB1 : 0.2,
                VitB2 : 0.3,
                VitB3 : 2,
                VitC : 40,
                // Mineral
                Ca : 200,
                F : 100,
                Fe2 : 0.3,
                Zn2 : 1.1,
                Ka : 400,
                Cu : 200,
                Na : 120
            }
        }
    },
    {
        kelompok : 'Bayi / Anak',
        awalRentang : 6,
        akhirRentang : 11,
        satuan : 'bulan',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 9,
                tinggiBadan : 72,
                Energi : 800,
                Protein : 15,
                Lemak : 35,
                Karbohidrat : 105,
                Serat : 11,
                Air : 900,
                // Vitamin
                VitA : 400,
                VitB1 : 0.3,
                VitB2 : 0.4,
                VitB3 : 4,
                VitC : 50,
                // Mineral
                Ca : 270,
                F : 275,
                Fe2 : 11,
                Zn2 : 3,
                Ka : 700,
                Cu : 220,
                Na : 370
            }
        }
    },

]

export default standardGiziList