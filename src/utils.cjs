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
    // const deptTitle = $('title').text();

    const links = []; //link 
    $('.maps-content__points-link').each((index, element) => {
      
      links.push('https://yadonor.ru' + $(element).find('a').attr('href')

      //   {
      //   id: counter++,
      //   name: $(element).find('a').text().trim(),
      //   link: $(element).find('a').attr('href'),
      // }
    );
    });

    // const depts1 = []

    // const depts1 = {
    //   id: counter++,
    //   name: $('title').text(),
    //   donorTraficlighter: []
    // }

    // $('.spk-lights__item').each((index, element) => {

    //   depts.push(
    //     {
    //       groupOfBlood: $(element).find('.spk-lights__head').text().trim(),
    //       rhesus:  $(element).find('.spk-lights__group-item').map((i, el) => 
    //           $(el).attr('class')?.match(/\bspk-lights__group-item--[\w-]*\b/g)
    //         ).get().flat().filter(Boolean)
    //     })
      
    // });

    // const donorTraficlighter = $('.spk-lights__group-item').map((i, el) => 
    //   $(el).attr('class')?.match(/\bspk-lights__group-item--[\w-]*\b/g)
    // ).get().flat().filter(Boolean);

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
      links,
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




// Добавляем новый эндпоинт для массового парсинга
app.get('/api/parse-multiple', async (req, res) => {
  try {
    const urls = JSON.parse(req.query.urls); // Получаем массив URL
    
    // Ограничиваем количество параллельных запросов
    const MAX_CONCURRENT = 5;
    const results = [];
    
    // Разбиваем на группы по MAX_CONCURRENT
    for (let i = 0; i < urls.length; i += MAX_CONCURRENT) {
      const chunk = urls.slice(i, i + MAX_CONCURRENT);
      const chunkResults = await Promise.all(chunk.map(parseSingleUrl));
      results.push(...chunkResults);
    }
    
    res.json({
      success: true,
      results,
      total: results.length
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Выносим логику парсинга в отдельную функцию
async function parseSingleUrl(url) {
  try {
    const { data } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    
    const $ = cheerio.load(data);
    
    // Ваша логика парсинга
    const parsedData = {
      title: $('title').text(),
      donorTraficlighter: $('.spk-lights__item').map((i, el) => ({
        group: $(el).find('.spk-lights__head').text().trim(),
        rhesus: $(el).find('.spk-lights__group-item').map((i, el) => 
          $(el).attr('class')?.match(/\bspk-lights__group-item--[\w-]*\b/g)
        ).get().flat().filter(Boolean)
      })).get(),
      url: url,
      address: $('.spk-box__elem-content-item:contains("Адрес:")').text().replace('Адрес:', '').trim(),
      phone: $('.spk-box__elem-content-item:contains("Телефон:")').first().text().replace('Телефон:', '').trim(),
      workHours: $('.spk-box__elem-content-item:contains("Время работы:")').text().replace('Время работы:', '').trim()
    };
    
    return { success: true, url, data: parsedData };
    // return parsedData
  } catch (error) {
    return { success: false, url, error: error.message };
  }
}


// Запуск сервера
app.listen(PORT, () => {
  console.log(`Прокси-сервер для парсинга запущен на http://localhost:${PORT}`);
});