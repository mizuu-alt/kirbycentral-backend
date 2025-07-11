const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let posts = [];

app.get('/', (req, res) => {
  res.send('Welcome to KirbyCentral backend! Go to /posts to see posts.');
});

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

