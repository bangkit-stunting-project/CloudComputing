# Backend Stunting Project

## **How to Run this Project**

1. First make sure Docker is installed. For windows, you can install Docker Desktop. For Linux, you can install Docker and Docker compose
2. Copy env.example and rename it to .env
3. Then in the root folder type the command `docker-compose up --build`
4. If Access Denied occurs add `sudo` before command up and build
5. If it has been successfully deployed, the container will run and be visible on the Docker Desktop or can be checked using `docker-compose ps`

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
- [ ] Configure Seeder for :
  - [X] Default Username and Password for Login
  - [ ] AKG Tabel based on Kemenkes Standard
- [ ] Init JWT Auth
- [ ] Making middleware
  - [ ] JWT verification time handling -> Reject if Expired to Login Page
- [ ] Making Authentication API
  - [ ] Login API with token -> auth.ts
  - [ ] Change Password API -> auth.ts
- [ ] User API
  - [ ] Register API -> user.ts
  - [ ] Return detail profile
- [ ] Adding ERD for Nutrition each classes in ERD and Prisma
