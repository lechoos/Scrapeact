require('dotenv').config();

const express = require('express');
const cors = require('cors');
const ScrapeController = require('./controllers/ScrapeController');

const app = express();

app.use(express.json());
app.use(cors());

require('./db/db');

app.post('/scrape', ScrapeController);

app.listen(3000, () => {
	console.log('Serwer słucha na porcie 3000...');
});
