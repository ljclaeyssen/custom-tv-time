# Build Angular puis service statique nginx (+ proxy /api vers le backend).
FROM node:22-alpine AS build
WORKDIR /workspace
COPY package.json package-lock.json nx.json tsconfig.base.json ./
RUN npm ci
COPY apps/frontend ./apps/frontend
COPY packages ./packages
COPY eslint.config.mjs ./
ENV NX_DAEMON=false
RUN npx nx build frontend --configuration=production

FROM nginx:alpine
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /workspace/dist/apps/frontend/browser /usr/share/nginx/html
EXPOSE 80
