const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    // res.send('Hello World!');
    res.json({ info: 'Hello World from node, express and postgres!' });
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});