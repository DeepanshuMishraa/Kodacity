
FROM node:20-alpine AS build
ARG DATABASE_URL
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN DATABASE_URL=$DATABASE_URL npx prisma migrate dev
RUN DATABASE_URL=$DATABASE_URL npx prisma generate
RUN DATABASE_URL=$DATABASE_URL npm run build

FROM node:20-alpine AS production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/package.json ./package.json
CMD ["npm", "run", "start"]

EXPOSE 3000
