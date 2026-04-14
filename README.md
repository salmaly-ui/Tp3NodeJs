
#  mon-projet-express

## 🚀 Application full-stack Node.js (Express + PostgreSQL + EJS)

Application web CRUD simple permettant de gérer une liste d’utilisateurs.  
Le projet utilise **Express.js**, **PostgreSQL** et **EJS** pour le rendu côté serveur.

---

## 🧰 Stack technique

- Runtime : Node.js (ESModules)
- Framework : Express 5
- Base de données : PostgreSQL (pg pool)
- Template engine : EJS
- Frontend : HTML / CSS (design moderne)
- Sécurité : requêtes paramétrées + express-validator

---

## 🎥 Démonstration

🔗 Vidéo :



https://github.com/user-attachments/assets/ea4b1d8c-be85-4777-ac5e-20fe75f25dd1

---

## 📁 Structure du projet
```
mon-projet-express/
├── config/
│   └── db.js
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── routes/
│   └── index.js
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   └── pages/
│       └── home.ejs
├── .env
├── app.js
└── package.json
```
---

## ⚙️ Prérequis

- Node.js ≥ 18
- npm ≥ 9
- PostgreSQL ≥ 14

---

## 📥 Installation

### 1. Cloner le projet

git clone [https://github.com/votre-utilisateur/mon-projet-express.git](https://github.com/salmaly-ui/Tp3NodeJs.git)



cd mon-projet-express

### 2. Installer les dépendances
npm install

### 3. Créer le fichier .env

DB_USER=mon_user  
DB_PASSWORD=mon_password  
DB_HOST=localhost  
DB_PORT=5432  
DB_DATABASE=ma_base  
PORT=3000  

---

### 4. Créer la table PostgreSQL

CREATE TABLE IF NOT EXISTS utilisateurs (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);

---

## ▶️ Lancement du projet

### Mode développement
npx nodemon app.js

### Mode production
node app.js

Application disponible sur :
http://localhost:3000

---

## 🌐 Routes

GET     /                 → Liste des utilisateurs  
POST    /users            → Créer utilisateur  
POST    /users/:id/edit   → Modifier utilisateur  
POST    /users/:id/delete → Supprimer utilisateur  

---

## 🔄 CRUD

Create → INSERT INTO utilisateurs  
Read   → SELECT * LIMIT 10  
Update → UPDATE utilisateurs  
Delete → DELETE FROM utilisateurs  

---

## 🔐 Sécurité

✔ Requêtes paramétrées ($1, $2, $3)  
✔ Protection contre injection SQL  

### Validation (express-validator)

npm install express-validator

import { body, validationResult } from "express-validator";

const validateUser = [
  body("nom").isLength({ min: 2 }).trim(),
  body("email").isEmail().normalizeEmail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("pages/home", {
        error: errors.array().map(e => e.msg).join(", "),
        users: []
      });
    }
    next();
  }
];

---

## 🎨 UI / Design

- Police : Inter
- Style : cartes modernes
- Couleur : bleu gradient (#1e3c72 → #2b4c7c)
- Responsive design
- Inputs arrondis + hover effects

---

## 🧠 Architecture app.js

1. dotenv.config()
2. express.json()
3. express.urlencoded()
4. static files (public/)
5. view engine EJS
6. routes
7. middleware 404
8. listen()

---

## 🚀 Améliorations possibles

- Architecture MVC
- Services layer
- Migrations (Prisma / Knex)
- Logs (Winston)
- Tests (Jest)
- Docker

---

## 📦 Dépendances

express  
pg  
ejs  
dotenv  
express-validator  
nodemon  

---

## 👨‍💻 Auteur

Projet full-stack Node.js + Express + PostgreSQL
