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
DB_HOST=localhost
DB_PORT=3306
DB_NAME=netflim_auth
DB_USER=root
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
- **JWT** : Authentification par tokens
- **Bcrypt** : Hash des mots de passe
- **Joi** : Validation de données
- **Swagger** : Documentation API
- **Nodemon** : Rechargement automatique en développement

