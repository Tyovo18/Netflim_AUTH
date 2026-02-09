# Netflim_AUTH

Microservice d'authentification pour la plateforme Netflim.

## Groupe : 
* Clément BAS
* Emi LIM
* Clémentin LY

##  Prérequis

- **Node.js** (v18 ou supérieur)
- **npm** (v9 ou supérieur)
- **MySQL** (v5.7 ou supérieur)

##  Installation

### 1. Cloner le repository
```bash
git clone https://github.com/Tyovo18/Netflim_AUTH.git
cd Netflim_AUTH
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer les variables d'environnement

Créer un fichier .env à la racine du projet avec les variables suivantes :

```env
PORT=4000
NODE_ENV=development

# Configuration MySQL
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

# JWT
JWT_SECRET=<your_jwt_secret_key>
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=<your_refresh_secret_key>
JWT_REFRESH_EXPIRES_IN=7d

# Service Auth Token
AUTH_SERVICE_TOKEN=token-connexion
```

### 4. Créer la base de données MySQL

```bash
mysql -u root -p
```

```sql
CREATE DATABASE netflim_auth;
```

#### Note :

Décommenter <code style="color: green;">await sequelize.sync({ alter: true });</code> dans le fichier `database.js` la première fois afin de créer les tables de la bases de données.

##  Lancement

### Mode développement (avec nodemon)
```bash
npm run dev
```

Le serveur redémarrera automatiquement à chaque modification de fichier.

### Mode production
```bash
npm start
```

Le serveur démarrera sur http://localhost:4000

##  Documentation API

Une fois le serveur lancé, vous pouvez accéder à la documentation Swagger :

`
http://localhost:4000/api-docs
`

##  Endpoints principales

- **Authentication** : /api/auth/
- **Users** : /api/users/
- **Documentation** : /api-docs

##  Dépendances principales

- **Express** : Framework web
- **Sequelize** : ORM pour MySQL
- **MySQL2** : Driver MySQL utilisé par Sequelize
- **JWT (jsonwebtoken)** : Authentification par tokens (access & refresh)
- **Bcrypt** : Hash des mots de passe
- **Joi** : Validation des données
- **Zod** : Validation et définition de schémas de données
- **Swagger (swagger-jsdoc / swagger-ui-express)** : Documentation API
- **Axios** : Communication avec les autres microservices
- **Dotenv** : Gestion des variables d’environnement
- **Cors** : Gestion des requêtes cross-origin
- **Helmet** : Sécurisation des en-têtes HTTP
- **Express-rate-limit** : Protection contre les attaques par force brute
- **Nodemailer** : Envoi d’e-mails (confirmation, réinitialisation de mot de passe)
- **Handlebars** : Templates pour les e-mails
- **Nodemon** : Rechargement automatique en développement
