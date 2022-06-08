FROM node:14.17.2-buster

WORKDIR /app/backend

COPY . .

RUN yarn 

RUN apk update && apk add bash

EXPOSE 8080

# Command buat ngerun backend 
# CMD [ "/bin/ash", "-c", "yarn run prisma migrate deploy && yarn run ts-node ./prisma/seed.ts && yarn run dev"]
# CMD [ "/bin/ash", "-c", "yarn run prisma migrate deploy && yarn seed  && yarn run dev"]
CMD [ "/bin/ash", "-c", "yarn && yarn prisma generate && yarn run prisma migrate deploy && yarn run ts-node ./prisma/seed.ts && yarn run dev"]