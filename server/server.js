const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for quotes (Beginner Tip approach)
const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs"
  },
  {
    text: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
  {
    text: "Act as if what you do makes a difference. It does.",
    author: "William James"
  },
  {
    text: "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau"
  }
];

// Route 1: Quote API - Returns a random motivational quote
app.get('/api/quote', (req, res) => {
  try {
    // Select a random quote from the array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    res.json({
      success: true,
      quote: randomQuote.text,
      author: randomQuote.author
    });
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).json({
      success: false,
      error: 'Could not fetch quote data.'
    });
  }
});

// Route 2: Weather API - Returns current weather for a location
app.get('/api/weather', async (req, res) => {
  try {
    const { city, lat, lon, units = 'metric', lang } = req.query;
    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey || apiKey === 'YOUR_OPENWEATHERMAP_API_KEY_HERE') {
      return res.status(500).json({
        success: false,
        error: 'Weather API key not configured. Please add your OpenWeatherMap API key to the .env file.'
      });
    }

    if ((!lat || !lon) && !city) {
      return res.status(400).json({
        success: false,
        error: 'Provide either a city name or latitude and longitude.'
      });
    }

    const params = {
      appid: apiKey,
      units,
    };

    if (lang) {
      params.lang = lang;
    }

    if (lat && lon) {
      params.lat = lat;
      params.lon = lon;
    } else {
      params.q = city;
    }

    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params,
    });

    const { data } = response;

    const weatherData = {
      success: true,
      city: data.name,
      country: data.sys.country,
      coordinates: {
        lat: data.coord.lat,
        lon: data.coord.lon,
      },
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      feelsLike: Math.round(data.main.feels_like),
      pressure: data.main.pressure,
      visibility: data.visibility,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      timezone: data.timezone,
      provider: {
        base: data.base,
        id: data.id,
        timestamp: data.dt,
      },
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather:', error.message);

    if (error.response) {
      if (error.response.status === 404) {
        return res.status(404).json({
          success: false,
          error: 'Location not found. Please try another query.'
        });
      }

      return res.status(error.response.status).json({
        success: false,
        error: 'Weather provider returned an error.',
        details: error.response.data,
      });
    }

    res.status(500).json({
      success: false,
      error: 'Could not fetch weather data.'
    });
  }
});

// Route 3: Currency API - Converts INR to USD and EUR
app.get('/api/currency', async (req, res) => {
  try {
  const parsedAmount = Number.parseFloat(req.query.amount);
  const amount = Number.isNaN(parsedAmount) ? 100 : parsedAmount;
    const exchangeApiKey = process.env.EXCHANGE_API_KEY;
    const baseCurrency = 'INR';

  if (Number.isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid amount. Please provide a positive number.'
      });
    }

    if (!exchangeApiKey || exchangeApiKey === 'YOUR_EXCHANGE_API_KEY_HERE') {
      return res.status(500).json({
        success: false,
        error: 'ExchangeRate API key not configured. Please set EXCHANGE_API_KEY in the server .env file.'
      });
    }

    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${exchangeApiKey}/latest/${baseCurrency}`
    );

    const payload = response.data;

    if (payload.result !== 'success') {
      const apiError = payload['error-type'] || 'unknown-error';
      const statusCode = apiError === 'unsupported-code' ? 400 : 502;

      return res.status(statusCode).json({
        success: false,
        error: 'Exchange rate provider returned an error.',
        providerError: apiError
      });
    }

    const rates = payload.conversion_rates;

    if (!rates?.USD || !rates?.EUR) {
      return res.status(500).json({
        success: false,
        error: 'Currency data incomplete. Please try again later.'
      });
    }

    const usd = (amount * rates.USD).toFixed(2);
    const eur = (amount * rates.EUR).toFixed(2);

    res.json({
      success: true,
      amount,
      currency: baseCurrency,
      conversions: {
        usd: Number.parseFloat(usd),
        eur: Number.parseFloat(eur)
      },
      rates: {
        usd: rates.USD.toFixed(4),
        eur: rates.EUR.toFixed(4)
      },
      provider: {
        lastUpdated: payload.time_last_update_utc,
        nextUpdate: payload.time_next_update_utc,
        baseCode: payload.base_code,
        termsOfUse: payload.terms_of_use,
        documentation: payload.documentation
      }
    });
  } catch (error) {
    console.error('Error fetching currency rates:', error.message);

    if (error.response?.data) {
      return res.status(error.response.status || 502).json({
        success: false,
        error: 'Currency provider request failed.',
        details: error.response.data
      });
    }

    res.status(500).json({
      success: false,
      error: 'Could not fetch currency data.'
    });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
