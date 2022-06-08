FROM node:14.17.2-buster

WORKDIR /app/backend

COPY . .

RUN yarn 

EXPOSE 8080

# RUN yarn prisma generate 

# RUN yarn prisma migrate deploy 

# RUN yarn run seed 

# RUN yarn run dev 

RUN mkdir storage/{detect-gizi, detect-stunting, profile-picture, testing}




# Command buat ngerun backend 
# CMD [ "/bin/ash", "-c", "yarn run prisma migrate deploy && yarn run ts-node ./prisma/seed.ts && yarn run dev"]
# CMD [ "/bin/ash", "-c", "yarn run prisma migrate deploy && yarn seed  && yarn run dev"]
CMD [ "/bin/sh", "-c", "yarn && yarn prisma generate && yarn run prisma migrate deploy && yarn run ts-node ./prisma/seed.ts && yarn run dev"]