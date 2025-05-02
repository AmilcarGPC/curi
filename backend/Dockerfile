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
ENV PORT=5000
ENV HOST=0.0.0.0

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["npm", "start"]