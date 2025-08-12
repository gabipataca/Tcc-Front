
# Dockerfile for building and running a Node.js application
# This Dockerfile uses multi-stage builds to optimize the final image size.
FROM node:22.18.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build



FROM node:22.18.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app ./
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]
