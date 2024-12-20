// fichier index.ts
import express from 'express';
import pokemonRoutes from './routes/pokemonRoutes';
import typeRoutes from './routes/typeRoutes';
import logger from '../logger';
import connection from '../connectToBase';
const app = express()
const port = 8080
const path = require("path");


app.use(express.urlencoded({ extended: true }));
app.use(express.json())
//définit également EJS comme moteur d'affichage pour l'application Express
app.set('view engine', 'ejs');
// Définir le répertoire des vues
app.set("views", path.join(__dirname, "views"));


// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

app.use('/', pokemonRoutes)
app.use('/', typeRoutes)

app.use((req, res) => {
  const message = "Impossible de trouver la ressource demandé ! Vous pouvez essayer un autre URL."
  res.status(404).json({ message })
});


app.listen(port, () => {
  logger.info(`Serveur démarré sur http://localhost:${port}`);

  connection.connect((err: Error) => {
    if (err) {
      // Si l'erreur existe, la connexion a échoué
      logger.error(`Connexion à la base de données échouée ! - ${err.message}`);
    } else {
      // Connexion réussie
      logger.info("Connexion réussie à la base de données MySQL");
    }
  });
});

