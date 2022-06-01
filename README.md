# Backend Stunting Project

## **How to Run this Project**

1. First make sure Docker is installed. For windows, you can install Docker Desktop. For Linux, you can install Docker and Docker compose
2. Copy env.example and rename it to .env
3. Then in the root folder type the command `docker compose up --build`
4. If Access Denied occurs add `sudo` before command up and build
5. If it has been successfully deployed, the container will run and be visible on the Docker Desktop or can be checked using `docker compose ps`

## **How to Deploy**

1. Install Docker and docker compose 
2. Change nginx.conf in folder nginx comment where code `server localhost` uncomment who contain real domain whom has purchased
3. Copy `env.example` in backend  to `.env` it `backend`
4. Dont forget to change container name into `stunting-postgres` to gain accos to database 
5. Make db user and pasword very secured 
6. in root folder run commond `docker compose up --build` 
7. Maybe we must setting same port to allow accesing from external. 
8. Here some port used : 
    - 80 : Landing Page 
    - 3000 : Rest / Backend -> can hover into subdomain for safety 
9. Check the connection using `curl db.localhost` or rest entry point in subdomain. it should return `{"message":"Welcome to Stunting Project Entry Point!"}%`


## **Usefull CLI Command for this project**

- `yarn prisma studio` -> for showing database like phpmyadmin
- `yarn prisma migrate reset` -> Reseting all table and inserted database to 0
- `yarn prisma migrate dev` -> commiting migrate database to migrate history
- `yarn prisma migrate deploy` -> deploying latest migrate to database schema
- `yarn db push` -> pushing changes in Schema to database
- `yarn db seed` -> running seeder
- `yarn run seed` -> Pushing changes in shcema and push seeder to database
- `yarn run dev` -> starting server
- `yarn run dev:server` -> Starting server with nodemon. So every changes will restart the server. Best for deploying when deveolpment begun

## **Todo List**

- [X] Generate ERD Diagram
- [X] Express Initialize
- [X] Docker Init
- [X] TypeScript Init and configure
- [X] Init Prisma
- [X] Translate ERD into Prisma code
- [ ] Adding tabel Gizi Makanan based on TKPI Dataset
  - [ ] Making Seeder for tabel Gizi
- [X] Testing Multer
- [ ] Configure Seeder for :
  - [X] Default Username and Password for Login
  - [X] AKG Tabel based on Kemenkes Standard
- [X] Init JWT Auth
- [X] Making middleware for JWT 
  - [X] JWT verification time handling -> Reject if Expired to Login Page
- [ ] Making Authentication API
  - [X] Login API with token -> auth.ts
  - [X] Change Password API -> auth.ts
- [X] User API
  - [X] Register API -> user.ts
  - [X] Return detail profile
  - [X] Update Profile Details
- [ ] Anak API
  - [X] Create Anak
  - [X] Update Anak
  - [ ] Delete Anak 
  - [X] Read Daftar Anak 
  - [ ] Read Anak Detail by Id
- [ ] History Stunting 
  - [ ] Input Data with OpenCV JS 
  - [ ] Input Data Manual 
  - [ ] Delete History
  - [ ] Read History Stunting All
  - [ ] Read History Stunting by Date
- [ ] History Gizi 
  - [ ] Input History Gizi with TFLite Model = input Picture 
  - [ ] Read History Gizi All 
  - [ ] Read History Gizi by Date 
  - [ ] Delete Histery Gizi by Id 
- [ ] Standard Gizi 
  - [ ] Read Standard Gizi by Umur 
  - [ ] Create Standard Gizi (Not include in app just for debugging purpose, in case needed in future)
  - [ ] Delete Standard Gizi (Not include in app just for debugging purpose, in case needed in future)
  - [ ] Update Standard Gizi (Not Include in app just for debugging purpose, in case needed in future)
- [ ] History Kehamilan 
  - [ ] Create Kehamilan
  - [ ] Update Kehamilan 
  - [ ] Delete Kehamilan 
  - [ ] Read All History Kehamilan List 
  - [ ] Read Kehamilan by Id 
- [ ] Adding ERD for Nutrition each classes in ERD and Prisma

## **Postman Documentation** 

<https://www.postman.com/avei20/workspace/project-anya/collection/13201462-a0cb52fe-0a1b-47d4-8eba-886ccb9d95eb?action=share&creator=13201462&ctx=documentation>