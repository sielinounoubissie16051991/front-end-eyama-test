# Examen de DEV Heyama

> Ceci est le document officiel de l'examen pour rejoindre l'équipe Dev de Heyama.

## Général

Vous allez construire un petit système composé de :

- Une **application mobile** développée avec **React Native + Expo**
- Une **application web** développée avec **Next.js** et **shadcn/ui**
- Une **API REST** développée avec **NestJS**
- Une **base de données** utilisant **MongoDB**
- Un **upload d'images** géré via n'importe quel service de bucket S3 (sauf AMAZON ⚠️)

Toutes les applications doivent communiquer avec l'API.

Si vous ne parvenez pas à terminer une section, passez-la et concentrez-vous sur ce que vous pouvez livrer. Les solutions partielles sont acceptables.

> ⚠️ **Vous avez 24h MAX.** Si vous terminez plus tôt, c'est encore mieux, vous pouvez venir directement nous voir pour une revue.

## Détails du projet

Créez une application qui gère une collection d'« Objets ».

Un Objet possède :

- `title` (chaîne de caractères)
- `description` (chaîne de caractères)
- `imageUrl` (chaîne de caractères — stockée dans S3)
- `createdAt` (date)

### API

Créez une API REST simple :

**1. POST /objects**
- Accepte `title`, `description`, et un fichier image uploadé
- Upload l'image vers S3
- Enregistre la fiche dans MongoDB

**2. GET /objects**
- Retourne la liste des Objets

**3. GET /objects/:id**
- Retourne un seul Objet

**4. DELETE /objects/:id**
- Supprime l'entrée de MongoDB
- Supprime l'image de S3

### Application Mobile + Web

Créez une interface minimale permettant de :

**1. Créer un Objet**
- Champs de saisie pour le titre et la description
- Sélectionner une image depuis l'appareil
- L'uploader via l'API
- Quand un objet est créé, le changement doit se refléter en temps réel sur tous les écrans (SocketIO). Cela signifie que si j'ajoute un objet sur l'app mobile, je dois le voir apparaître en temps réel sur l'app web.

**2. Lister les Objets**
- Récupérer et afficher la liste depuis l'API
- Afficher les images en utilisant les URLs S3 retournées par l'API

**3. Voir un Objet unique**
- Un écran très simple montrant les détails d'un objet

## Notes générales

- Le design UI n'a pas d'importance. Assurez-vous simplement que c'est fonctionnel et cohérent.
- Aucun déploiement n'est nécessaire. Nous vérifierons votre code directement sur votre PC.
- Si vous pensez pouvoir améliorer le projet en ajoutant des fonctionnalités, allez-y. C'est un bonus supplémentaire.
- Poussez tout votre code sur Github au fur et à mesure de votre avancement.
- Si vous avez des questions, contactez-nous sur WhatsApp.

*Ici, vous allez construire une application mobile et une application web qui font essentiellement la même chose.*

Merci !
