require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const ScrapingRoutes = require('./routes/ScrapingRoutes');
const UserRoutes = require('./routes/UserRoutes');
const ContactRoutes = require('./routes/ContactRoutes');

const app = express();

const allowedOrigins = ['http://localhost:5173', 'http://localhost:1234']

app.use(express.json());
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(cookieParser());

require('./db/db');

app.get('/', (req, res) => {
	res.send('Hello Vercel Again');
});

app.use(ScrapingRoutes);

app.use(UserRoutes);

app.use(ContactRoutes);

app.listen(3000);

module.exports = app;
