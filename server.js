const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.get('/get', (req, res) => {
    res.json({ status: 'Get OK' });
});

app.post('/add', (req, res) => {
  // Logic to add a value to the iterator
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
