const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

app.get('/api/search', async (req, res) => {
  try {
    const { query = '', page = 1 } = req.query;
    const response = await axios.get(`${process.env.TMDB_URL}/search/multi`, {
      params: { api_key: process.env.TMDB_API_KEY, query, page, language: 'fr-FR' }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/popular', async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const response = await axios.get(`${process.env.TMDB_URL}/movie/popular`, {
      params: { api_key: process.env.TMDB_API_KEY, page, language: 'fr-FR' }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/export', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.TMDB_URL}/movie/popular`, {
      params: { api_key: process.env.TMDB_API_KEY, language: 'fr-FR' }
    });
    res.json({
      exportDate: new Date().toISOString(),
      totalItems: response.data.total_results,
      topResults: response.data.results.slice(0, 5)
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));