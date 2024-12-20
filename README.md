```
Hey There! 🙌 
Bienvenue dans Pokémon Society
```

[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](https://expressjs.com/)


# Contents

* [Global Requisites](#global-requisites)
* [App Structure](#app-structure)
* [Install, Configure & Run](#install-configure--run)
* [List of Routes](#list-of-routes)

# Global Requisites

* node (>= 10.5.0)
* express (>= 5.0.0)
* tsc (>= 3.0.1)
* typescript (>= 3.0.1)
* nodemon (^3.1.7)
* dotenv (16.4.5),
* jsonwebtoken: (^9.0.2),
* mysql2: (^3.11.4),
* winston" (^3.17.0)


# Install, Configure & Run

## Installing

Installer MariaDB :

* Suivre ce tuto: https://www.digitalocean.com/community/tutorials/how-to-install-mariadb-on-debian-11
```bash
sudo apt update
sudo apt install mariadb-server
sudo mysql_secure_installation
```

Accéder à MariaDB
```bash
mysql -u <DB_USER> -p
```

Créer une Base de Données
```bash
CREATE DATABASE <DB_DATABASE>;
```

Créer un utilisateur et accorder des privilèges :
```bash
CREATE USER '<DB_USER>'@'localhost' IDENTIFIED BY '<DB_PASSWORD>';
GRANT ALL PRIVILEGES ON <DB_DATABASE>.* TO '<DB_USER>'@'localhost';
FLUSH PRIVILEGES;
```

Importer la base de donnee
```bash
mysql -u <DB_USER> -p <DB_DATABASE> < pokedex.sql
```

- Tips 
```bash
SHOW DATABASES;
USE <DB_DATABASE>;
SHOW TABLES;
```

Installation des dépendances
```bash
 npm install 
```

Lancement de l'application
```bash
 npm run dev 
```


# App Structure

```bash

├──📂 src
│   ├── 📂 controllers
│   │   ├── pokemonControllers.ts
│   │   ├── typeControllers.ts
│   ├── 📂 middlewares
│   │   ├── middleware.ts
│   ├── 📂 models
│   │   └── pokemonModel.ts
│   │   └── typeModel.ts
│   ├── 📂 routes
│   │   ├── pokemonRoutes.ts
│   │   └── typeRoute.ts
│   ├── 📂 types
│   │   └── pokemonTypes.ts
│   ├── 📂 views
│   │   └──📂 pages
│   │   │   └──📂 pokemons
│   │   │   │  └── allpokemons.ejs
│   │   │   │  └── eggpokemon.ejs
│   │   │   │  └── movespokemon.ejs
│   │   │   │  └── showpokemon.ejs
│   │   │   │  └── typepokemon.ejs
│   │   │   └──📂 types
│   │   │   │   └── alltypes.ejs
│   │   │   │   └── showtypes.ejs
│   │   │   └── index.ejs
│   │   └──📂 partials
│   │   │   └── footer.ejs
│   │   │   └── head.ejs
│   │   │   └── header.ejs
│   └── index.ts
├── .env.example
├── .gitignore
├── connectToBase.ts
├── logger.ts
├── package.json
├── pokedex.sql
├── README.md
├── tsconfig.json
```
