const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let posts = []; // In-memory posts storage
let users = [{ username: 'kirbyfan', password: 'pinkstar' }]; // Example user for sign-in

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to KirbyCentral backend! Go to /posts to see posts.');
});

// Get all posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// Add a new post
app.post('/posts', (req, res) => {
  const { username, content } = req.body;
  if (!username || !content) {
    return res.status(400).json({ error: 'Username and content required!' });
  }
  const newPost = {
    id: posts.length + 1,
    username,
    content,
    timestamp: new Date().toISOString(),
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Classic simple sign-in
app.post('/signin', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.json({ success: true, message: 'Signed in!', username });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
