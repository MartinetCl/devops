const dotenv = require('dotenv');
const express = require('express');
const connection = require('./config').connection;


dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Route GET /health pour renvoyer "status: ok"
app.get('/health', (req, res) => {
  // sql attendu
  res.json({ status: 'ok' });
});

// Route GET /get pour renvoyer "status: ok" et un itérateur "value"
let iterator = 0;
app.get('/get', (req, res) => {
  iterator++;
 // sql attendu

  res.json({ status: 'ok', value: iterator });
});

// Route POST /add pour ajouter une valeur booléenne et renvoyer "status: ok"
app.post('/add', async (req, res) => {
  const { value } = req.body;
  // Vérifie si la valeur booléenne est présente dans le corps de la requête
  if (typeof value === 'boolean') {
    // sql attendu
    // Pour cet exemple, on renvoie simplement "status: ok"
    let response = await connection.query("INSERT INTO `iterator-db`.interator (state) VALUES("+ value +");");

    if (response.affectedRows) { 

      res.status(200).json({ status: 'ok' });
    } else {
      res.status(500).json({error: "Error when we interact with database"})  
    }

  } else {
    // Si aucune valeur n'est fournie ou si ce n'est pas un booléen, renvoie une erreur
    res.status(400).json({ error: 'Value boolean attempt' });
  }
});

// Port d'écoute du serveur

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
