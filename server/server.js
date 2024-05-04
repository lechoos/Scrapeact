require('dotenv').config();

const express = require('express');

const app = express();

app.use(express.json());

require('./db/db');

app.listen(3000, () => {
  console.log('Serwer słucha na porcie 3000...')
})