FROM node:22-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN npm ci

FROM node:22-alpine AS production-dependencies-env
COPY ./client/package.json ./client/package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM node:22-alpine AS build-env
COPY . ./
COPY ../api/dist/client ../api/dist/client
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
#COPY client/app ./
#COPY api/dist/client/src ./src
RUN npm run build

FROM node:22-alpine
COPY ./client/package.json ./client/package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["npm", "run", "start"]