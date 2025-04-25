const express = require('express');
const axios = require('axios'); // Для HTTP-запросов
const cheerio = require('cheerio'); // Для парсинга HTML
const cors = require('cors'); // Для обработки CORS
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = 3001;
let counter = 0;
// Включение CORS для всех запросов
app.use(cors());

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 минута
  max: 10,
  message: 'Слишком много запросов. Пожалуйста, подождите.'
});

app.use('/api/parse', limiter);
// Маршрут для парсинга
app.get('/api/parse', async (req, res) => {
  try {
    // Получаем URL из параметров запроса
    const targetUrl = req.query.url || 'https://example.com';
    
    // 1. Загружаем HTML с целевого сайта
    const { data } = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    // 2. Загружаем HTML в Cheerio
    const $ = cheerio.load(data);
    
    // 3. Извлекаем нужные данные (пример)
    //const pageTitle = $('title').text();

    const nameOfDept = [];
    $('.maps-content__points-link').each((index, element) => {
      
      nameOfDept.push({
        id: counter++,
        name: $(element).find('a').text().trim(),
        link: $(element).find('a').attr('href'),
      });
    });

    const donorTraficlighter = $('.spk-lights__group-item').map((i, el) => 
      $(el).attr('class')?.match(/\bspk-lights__group-item--[\w-]*\b/g)
    ).get().flat().filter(Boolean);

    // $('article').each((index, element) => {
    //   articles.push({
    //     title: $(element).find('h2').text().trim(),
    //     description: $(element).find('p').first().text().trim(),
    //     link: $(element).find('a').attr('href')
    //   });
    // });
    
    // 4. Отправляем структурированные данные клиенту
    res.json({
      success: true,
      url: targetUrl,
      nameOfDept,
      donorTraficlighter,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Прокси-сервер для парсинга запущен на http://localhost:${PORT}`);
});