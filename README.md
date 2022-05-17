# Backend Stunting Project

## **How to Run this Project**

1. First make sure Docker is installed. For windows, you can install Docker Desktop. For Linux, you can install Docker and Docker compose
2. Copy env.example and rename it to .env
3. Then in the root folder type the command `docker-compose up --build`
4. If Access Denied occurs add `sudo` before command up and build
5. If it has been successfully deployed, the container will run and be visible on the Docker Desktop or can be checked using `docker-compose ps`

## **Todo List**

- [X] Generate ERD Diagram
- [X] Express Initialize
- [X] Docker Init
- [X] TypeScript Init and configure
- [X] Init Prisma
- [X] Translate ERD into Prisma code
- [ ] Configure Seeder for :
  - [ ] Default Username and Password for Login
  - [ ] AKG Tabel based on Kemenkes Standard
- [ ] Init JWT Auth
- [ ] Init OAuth
- [ ] Making middleware
  - [ ] JWT verification time handling -> Reject if Expired to Login Page
- [ ] Making Authentication API
  - [ ] Login API with token -> auth.ts
  - [ ] Change Password API -> auth.ts
- [ ] User API
  - [ ] Register API -> user.ts
  - [ ] Return detail profile
- [ ] Adding ERD for Nutrition each classes in ERD and Prisma