# Указываем конкретную версию Node.js
FROM node:18-alpine

WORKDIR /app

# Копируем package файлы для кэширования слоев
COPY package*.json ./

RUN npm install

# Копируем остальные файлы, но лучше использовать .dockerignore
COPY . .

EXPOSE 3000

ENV NODE_ENV=development

CMD ["npm", "run", "dev"]