FROM node:20-alpine AS base

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración
COPY package*.json ./

# Instalar dependencias (con --force como requerido)
RUN npm install --force

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Configuración de producción
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3006

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3006

# Comando para iniciar la aplicación
CMD ["npm", "start"]