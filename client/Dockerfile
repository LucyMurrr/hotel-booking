FROM node:22-alpine AS development-dependencies-env
COPY client ./
WORKDIR /app
RUN npm ci

FROM node:22-alpine AS production-dependencies-env
COPY client/package.json client/package-lock.json ./
WORKDIR /app
RUN npm ci --omit=dev

FROM node:22-alpine AS build-env
COPY client ./
COPY api/dist/client ./client
COPY --from=development-dependencies-env ./node_modules ./node_modules
WORKDIR /app
RUN npm run build

FROM node:22-alpine
COPY client/package.json client/package-lock.json ./
COPY --from=production-dependencies-env ./node_modules ./node_modules
COPY --from=build-env ./build ./build
WORKDIR /app
CMD ["npm", "run", "start"]