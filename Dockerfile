FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV HOST=0.0.0.0
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]