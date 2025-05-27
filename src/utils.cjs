const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = 3001;
let counter = 0;

app.use(cors());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Слишком много запросов. Пожалуйста, подождите.",
});

app.use("/api/parse", limiter);
app.get("/api/parse", async (req, res) => {
  try {
    const targetUrl = req.query.url || "https://example.com";

    const { data } = await axios.get(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    const $ = cheerio.load(data);
    const links = [];
    $(".maps-content__points-link").each((index, element) => {
      links.push("https://yadonor.ru" + $(element).find("a").attr("href"));
    });

    res.json({
      success: true,
      url: targetUrl,
      links,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Добавляем новый эндпоинт для массового парсинга
app.get("/api/parse-multiple", async (req, res) => {
  try {
    const urls = JSON.parse(req.query.urls);
    const MAX_CONCURRENT = 5;
    const results = [];

    for (let i = 0; i < urls.length; i += MAX_CONCURRENT) {
      const chunk = urls.slice(i, i + MAX_CONCURRENT);
      const chunkResults = await Promise.all(chunk.map(parseSingleUrl));
      results.push(...chunkResults);
    }

    res.json({
      success: true,
      results,
      total: results.length,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

async function parseSingleUrl(url) {
  try {
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const $ = cheerio.load(data);
    const parsedData = {
      title: $("title").text(),
      donorTraficlighter: $(".spk-lights__item")
        .map((i, el) => ({
          group: $(el).find(".spk-lights__head").text().trim(),
          rhesus: $(el)
            .find(".spk-lights__group-item")
            .map((i, el) =>
              $(el)
                .attr("class")
                ?.match(/\bspk-lights__group-item--[\w-]*\b/g)
            )
            .get()
            .flat()
            .filter(Boolean),
        }))
        .get(),
      url: url,
      address: $('.spk-box__elem-content-item:contains("Адрес:")')
        .text()
        .replace("Адрес:", "")
        .trim(),
    };
    return { success: true, url, data: parsedData };
  } catch (error) {
    return { success: false, url, error: error.message };
  }
}

app.listen(PORT, () => {
  console.log(`Прокси-сервер для парсинга запущен на http://localhost:${PORT}`);
});
