FROM node:20-alpine AS base

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar dependencias (usando --force como requerido)
RUN npm install --force

# Copiar el resto del código fuente
COPY . .

# Variables de entorno de ejemplo (se sobrescribirán en Coolify)
ENV NODE_ENV=production
ENV PORT=3001

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "start"]