mon-projet-express
Application full-stack Node.js avec Express, PostgreSQL et EJS
Node.js	Express 5	PostgreSQL	EJS

Aperçu du projet
Application web CRUD légère permettant de gérer une liste d'utilisateurs. Elle repose sur Express pour le serveur, PostgreSQL comme base de données relationnelle et EJS pour le rendu des vues côté serveur.

Runtime	Node.js (ESModules)
Framework	Express
Base de données	PostgreSQL via pg (pool)
Moteur de vues	EJS avec partials
Styles	CSS personnalisé (Inter, design card)
Sécurité	Requêtes paramétrées + express-validator

Vidéo de démonstration
Comment insérer votre vidéo de démo
Option 1 — Lien vers la vidéo hébergée :
Remplacez l'URL ci-dessous par le lien de votre vidéo (YouTube, Loom, etc.) :
https://www.youtube.com/watch?v=VOTRE_ID_VIDEO
Option 2 — Fichier local (si Word supporte la lecture) :
Placez demo.mp4 à la racine du projet puis insérez-la via Insertion > Objet > Vidéo dans Word.
Option 3 — GIF animé :
Générez un GIF depuis votre enregistrement (ex. : via Giphy Capture ou ffmpeg) et insérez-le en tant qu'image.

[  INSÉRER ICI LA CAPTURE / GIF / VIGNETTE DE LA VIDÉO  ]

Arborescence du projet
mon-projet-express/
├── config/
│   └── db.js            # Pool PostgreSQL
├── public/
│   ├── css/
│   │   └── style.css    # Styles Inter / card design
│   └── js/
│       └── main.js      # Scripts frontend (placeholder)
├── routes/
│   └── index.js         # Routes CRUD
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   └── pages/
│       └── home.ejs     # Vue principale
├── .env                 # Variables d'environnement
├── app.js               # Point d'entrée
└── package.json

Prérequis
•	Node.js v18 ou supérieur
•	npm v9 ou supérieur
•	PostgreSQL 14 ou supérieur (serveur local ou distant)

Installation
1. Cloner le dépôt
git clone https://github.com/votre-utilisateur/mon-projet-express.git
cd mon-projet-express

2. Installer les dépendances
npm install

3. Configurer les variables d'environnement
Copiez le fichier exemple et renseignez vos valeurs :
cp .env.example .env

DB_USER=mon_user
DB_PASSWORD=mon_password
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=ma_base
PORT=3000

4. Créer la table en base
psql -U mon_user -d ma_base -c \
  "CREATE TABLE IF NOT EXISTS utilisateurs (
     id     SERIAL PRIMARY KEY,
     nom    VARCHAR(100) NOT NULL,
     prenom VARCHAR(100) NOT NULL,
     email  VARCHAR(255) UNIQUE NOT NULL
   );"

Lancement
Développement (rechargement automatique)
npx nodemon app.js

Production
node app.js

L'application est accessible sur http://localhost:3000

Routes disponibles
GET  /	Affiche la liste des 10 derniers utilisateurs
POST /users	Crée un nouvel utilisateur
POST /users/:id/edit	Met à jour un utilisateur existant
POST /users/:id/delete	Supprime un utilisateur

Détail du CRUD
Create	Formulaire d'ajout → POST /users → INSERT INTO utilisateurs
Read	Chargement de la page → GET / → SELECT ... LIMIT 10
Update	Formulaire inline → POST /users/:id/edit → UPDATE utilisateurs
Delete	Bouton icône → POST /users/:id/delete → DELETE utilisateurs

Sécurité
Requêtes paramétrées
Toutes les requêtes SQL utilisent des paramètres ($1, $2, ...) pour prévenir les injections SQL.

Validation serveur
Installer express-validator :
npm install express-validator

Exemple de middleware de validation :
import { body, validationResult } from 'express-validator';

const validateUser = [
  body('nom').isLength({ min: 2 }).trim(),
  body('email').isEmail().normalizeEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('pages/home', {
        title: 'Erreur', users: [],
        error: errors.array().map(e => e.msg).join(', ')
      });
    }
    next();
  }
];

Styles — Design System
Le fichier public/css/style.css implémente un design card moderne avec la police Inter.

Police	Inter (system-ui fallback)
Couleur primaire	#1e3c72 / #2b4c7c (dégradé header)
Fond	#f4f7fc
Cartes	border-radius 24px, ombre légère
Champs	border-radius 16px, focus ring bleu
Boutons	border-radius 40px, hover scale
Responsive	grille auto-fill, flex-direction column < 640px

Structure de app.js
Le point d'entrée configure dans l'ordre :
•	dotenv.config() — lecture du .env
•	app.set('view engine', 'ejs') — moteur de vues
•	express.json() + urlencoded() — parsing des corps de requête
•	express.static() — fichiers CSS/JS publics
•	app.use('/', indexRoutes) — branchement des routes
•	Middleware 404 — page d'erreur générique
•	app.listen() — démarrage du serveur

Bonnes pratiques et évolutions
•	Séparer la logique métier dans des modules services/
•	Externaliser les requêtes SQL dans un dossier queries/
•	Mettre en place winston pour la journalisation
•	Utiliser un outil de migrations (Knex, Flyway)
•	Ajouter des tests unitaires (Jest, Supertest)
•	Configurer un environnement Docker pour la base de données

Dépendances principales
express	Framework web Node.js
pg	Client PostgreSQL avec pool de connexions
ejs	Moteur de templates HTML
dotenv	Chargement des variables d'environnement
express-validator	Validation et assainissement des entrées
nodemon	Rechargement automatique en développement



