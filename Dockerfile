# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Construa a aplicação
RUN npm run build

# Instale o servidor HTTP estático
RUN npm install -g serve

# Exponha a porta que a aplicação irá rodar
EXPOSE 5174

# Comando para rodar a aplicação
CMD ["serve", "-s", "dist"]