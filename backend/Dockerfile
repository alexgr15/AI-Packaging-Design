FROM node:18-alpine

WORKDIR /app

# Install system dependencies for Prisma (OpenSSL)
RUN apk -U add --no-cache openssl

COPY package*.json ./

RUN npm install

COPY . .

# Generate Prisma Client
# RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
