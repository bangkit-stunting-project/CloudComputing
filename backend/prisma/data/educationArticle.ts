import { Prisma } from "@prisma/client";

export const educationArticleList : Prisma.EducationArticleCreateInput[] = [
    {
        author : "Rian ",
        content : 'isi berita',
        desc : 'Ringkasan Berita',
        publishedAt : "tanggal Asal Aja",
        title : "Nasi Padang Babi Enak YgY",
        urlToImage : "link cambarnya copas ke sini "
    }
]