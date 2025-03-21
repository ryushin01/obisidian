FROM node:21-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat && \
    corepack enable

# 1. Install dependencies only when needed
FROM base AS deps

RUN corepack enable
WORKDIR /app

# 애플리케이션 종속성 복사
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prod

# 2. Rebuild the source code only when needed
FROM base AS builder

RUN corepack enable
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .

# This will do the trick, use the corresponding env file for each environment.
COPY .env.production ./
RUN pnpm run build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# nodejs 그룹 생성 (-g:그룹의 숫자 ID, -S:그룹을 시스템 그룹으로)
# nextjs라는 이름의 사용자 생성 (-S:사용자를 시스템 사용자로, -S:사용자 ID 할당)
# nextjs 전역 설치
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 && \
    pnpm install -g next

# Update PATH to include 'next'
ENV PATH /app/node_modules/.bin:$PATH

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME 0.0.0.0

CMD ["next", "start"]
