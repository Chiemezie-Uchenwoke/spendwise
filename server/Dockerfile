# 1. Base image
FROM node:18-alpine

# 2. Create app directory
WORKDIR /usr/src/app

# 3. Install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# 4. Copy source code
COPY . .

# 5. Expose backend port
EXPOSE 3000

# 6. Start the app
CMD ["node", "app.js"]
