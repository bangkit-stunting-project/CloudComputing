FROM node:lts-alpine3.14

WORKDIR /app/backend

COPY . .

RUN yarn 

EXPOSE 3000

# Command buat ngerun backend 
# CMD [ "/bin/ash", "-c", "yarn run prisma migrate deploy && yarn run ts-node ./prisma/seed.ts && yarn run dev"]
CMD [ "/bin/ash", "-c", "yarn run prisma migrate deploy && yarn run dev"]