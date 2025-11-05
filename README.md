# InfoHub - Full Stack Application

A modern single-page application (SPA) that integrates three everyday utilities: Weather Information, Currency Converter, and Motivational Quotes.

## 🚀 Features

- **Real-time Weather Display**: Get current weather information for any city worldwide
- **Currency Converter**: Convert Indian Rupees (INR) to USD and EUR with live exchange rates
- **Motivational Quote Generator**: Get inspired with random motivational quotes

## 🛠️ Tech Stack

### Frontend

- **React** (with Vite)
- **Axios** for HTTP requests
- **CSS3** for styling

### Backend

- **Node.js**
- **Express.js**
- **Axios** for external API calls
- **CORS** for cross-origin resource sharing

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (LTS version recommended)
- npm or yarn
- OpenWeatherMap API key (free tier available at https://openweathermap.org/api)

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd InfoHub-Challenge
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
WEATHER_API_KEY=your_openweathermap_api_key_here
PORT=3001
```

**Important**: Replace `your_openweathermap_api_key_here` with your actual API key from OpenWeatherMap.

Start the backend server:

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The server will run on `http://localhost:3001`

### 3. Frontend Setup

Open a new terminal and navigate to the client directory:

```bash
cd client
npm install
```

Start the development server:

```bash
npm run dev
```

The app will open at `http://localhost:5173` (or the port shown in your terminal)

## 🌐 API Endpoints

### Backend API Routes

- `GET /api/weather?city={cityName}` - Get weather data for a specific city
- `GET /api/currency?amount={amount}` - Convert INR to USD and EUR
- `GET /api/quote` - Get a random motivational quote
- `GET /api/health` - Health check endpoint

## 📱 Usage

1. **Weather Module**:

   - View weather for London (default)
   - Search for any city worldwide
   - See temperature, conditions, humidity, and wind speed

2. **Currency Converter**:

   - Enter amount in INR
   - Get instant conversion to USD and EUR
   - View current exchange rates

3. **Quote Generator**:
   - Get random motivational quotes
   - Click "Get New Quote" for fresh inspiration

## 🏗️ Project Structure

```
InfoHub-Challenge/
├── client/                      # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── WeatherModule.jsx
│   │   │   ├── WeatherModule.css
│   │   │   ├── CurrencyConverter.jsx
│   │   │   ├── CurrencyConverter.css
│   │   │   ├── QuoteGenerator.jsx
│   │   │   └── QuoteGenerator.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── server/                      # Node.js/Express Backend
    ├── .env
    ├── server.js
    └── package.json
```

## 🚀 Deployment

### Deploy to Vercel

1. **Prepare for deployment**:

   - Push your code to GitHub
   - Sign up for Vercel (https://vercel.com)

2. **Deploy Frontend**:

   - Connect your GitHub repository to Vercel
   - Set the root directory to `client`
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Deploy Backend**:

   - Create a new Vercel project for the backend
   - Set the root directory to `server`
   - Add environment variables in Vercel dashboard:
     - `WEATHER_API_KEY`: Your OpenWeatherMap API key

4. **Update API URLs**:
   - Update the frontend to use your deployed backend URL
   - Or use Vercel's proxy configuration

## 🔐 Environment Variables

### Backend (.env)

```env
WEATHER_API_KEY=your_openweathermap_api_key
PORT=3001
```

## 📝 Notes

- The Currency API uses ExchangeRate-API's free tier which doesn't require authentication
- The Quote Generator uses local mock data (easily replaceable with an external API)
- The app is fully responsive and mobile-friendly

## 🐛 Troubleshooting

### Common Issues

1. **Weather API not working**: Make sure you've added your OpenWeatherMap API key to the `.env` file
2. **CORS errors**: Ensure both frontend and backend are running on their respective ports
3. **Module not found**: Run `npm install` in both `client` and `server` directories

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created as part of the ByteXL Full Stack Developer Assessment

## 🙏 Acknowledgments

- OpenWeatherMap for weather data
- ExchangeRate-API for currency conversion rates
- ByteXL for the project requirements
