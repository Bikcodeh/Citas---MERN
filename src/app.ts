import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.get('/data', (req, res) => {
    res.send('KHA');
  });

app.listen(port, () => {
    console.info(`Ready on port ${port}`);
});
