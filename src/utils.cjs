const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio'); // Аналог DOMParser для сервера
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/parse-yadonor', async (req, res) => {
  try {
    const response = await axios.get('https://yadonor.ru/donorstvo/gde-sdat/where/');
    const $ = cheerio.load(response.data);
    
    const data = [];
    $('/api/donor-points').each((i, el) => { // Пример: парсим элементы с классом .donor-point
      data.push({
        title: $(el).text().trim(),
        link: $(el).find('a').attr('href')
      });
    });
    console.log(data);
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));