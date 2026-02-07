FROM node:lts AS base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
RUN npm install

FROM base AS dev
# Development image: installs dependencies and runs the dev server with live reload
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
# Bind to 0.0.0.0 so the dev server is reachable from the host
CMD ["npx", "astro", "dev", "--port", "8080", "--host", "0.0.0.0"]

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
