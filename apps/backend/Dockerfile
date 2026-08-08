# Cross-compile : l'étape de build tourne sur l'arch NATIVE du runner (rapide,
# TypeScript/Nx non émulé), l'image finale cible arm64 (le VPS Hetzner CAX21).
# Les dépendances runtime sont du pur JS (pg, nestjs…) → install arm64 trivial.
FROM --platform=$BUILDPLATFORM node:22-alpine AS build
WORKDIR /workspace
COPY package.json package-lock.json nx.json tsconfig.base.json ./
RUN npm ci
COPY apps/backend ./apps/backend
COPY packages ./packages
COPY eslint.config.mjs ./
ENV NX_DAEMON=false
RUN npx nx build backend --configuration=production \
    && npx nx run backend:prune-lockfile

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /workspace/dist/apps/backend/package.json /workspace/dist/apps/backend/package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /workspace/dist/apps/backend ./
EXPOSE 3000
CMD ["node", "main.js"]
