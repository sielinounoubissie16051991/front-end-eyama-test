# Étape de build : installation des dépendances et compilation de l'application Next.js
FROM node:22-alpine AS build
WORKDIR /app

# Installation des dépendances du projet
COPY package.json ./
RUN npm install

# Copie du code source puis génération du build de production
COPY . .
RUN npm run build

# Étape d'exécution : lancement de l'application en mode production
FROM node:22-alpine AS runtime
WORKDIR /app

# Variables d'environnement nécessaires au conteneur Next.js
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Copie des fichiers nécessaires au runtime depuis l'étape de build
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

# Port exposé par le conteneur
EXPOSE 3000

# Démarrage du serveur Next.js compilé
CMD ["node", "/app/server.js"]
