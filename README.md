# Backend Stunting Project

## **How to Run this Project**

1. Pertama pastingan Docker sudah terinstall. Untuk windows bisa install Docker Desktop. Untuk Linux bisa menginstall Docker dan dacker compose
2. Copy `env.example` dan rename menjadi `.env`
3. Kemudian pada root folder ketikkan command `docker-compose up --build`
4. Apabila terjadi Acces Denied tambahkan `sudo` sebelum command up dan build
5. Apabila sudah berhasil di deplay maka container akan berjalan dan terlihat di Docker Desktop atau dapat di cek menggunakan `docker-compose ps`

## **Todo List**

- [X] Generate ERD Diagram
- [X] Express Initialize
- [X] Docker Init
- [X] TypeScript Init and configure
- [X] Init Prisma
- [X] Translate ERD into Prisma code
- [ ] Init JWT Auth 
- [ ] Init OAuth 
- [ ] Making middleware 
- [ ] Making Authentication API
