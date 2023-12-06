const dotenv = require('dotenv');
const express = require('express');
const connection = require('./config');


dotenv.config();
//console.log(connection);
const app = express();
const PORT = process.env.PORT;
app.set('trust proxy', 1);

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Route GET /health pour renvoyer "status: ok"
app.get('/health', (req, res) => {
  // sql attendu
  res.json({ status: 'ok' });
});

// Route GET /get pour renvoyer "status: ok" et un itérateur "value"
app.get('/get', async (req, res) => {
  res.setHeader('Content-Type', 'text/json');
  let response = connection.query("SELECT * FROM interator ORDER BY state DESC LIMIT 0, 1", (err, rows, fields) => {
    if (err) {
      console.log(err);
    }
    if (rows.length == 1 && rows[0].state) {
      res.json({status: "ok", result: rows[0].state})
    }
  });

});

// Route POST /add pour ajouter une valeur booléenne et renvoyer "status: ok"
app.post('/add', async (req, res) => {
  const { value } = req.body;
  // Vérifie si la valeur booléenne est présente dans le corps de la requête
  if (typeof value === 'boolean') {
    
    connection.query("INSERT INTO `iterator-db`.interator (state) VALUES(?);", [value], (err, rows, fields) => {
      if (err) {
        res.status(500).json({error: err});
        throw err;
      }
      if (rows.affectedRows) {
        res.json({status: "OK", message: "Iterator value update successfully"});
      } 
    });

  } else {
    // Si aucune valeur n'est fournie ou si ce n'est pas un booléen, renvoie une erreur
    res.status(400).json({ error: 'Value boolean attempt' });
  }
});

// Port d'écoute du serveur

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
