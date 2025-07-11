const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const POSTS_FILE = 'posts.json';

// Make sure posts.json exists
if (!fs.existsSync(POSTS_FILE)) fs.writeFileSync(POSTS_FILE, '[]');

// GET all posts
app.get('/posts', (req, res) => {
  const data = fs.readFileSync(POSTS_FILE);
  res.json(JSON.parse(data));
});

// POST a new post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = { title, content, timestamp: Date.now() };

  const data = JSON.parse(fs.readFileSync(POSTS_FILE));
  data.push(newPost);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(data, null, 2));

  res.status(201).json({ message: 'Post added' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

