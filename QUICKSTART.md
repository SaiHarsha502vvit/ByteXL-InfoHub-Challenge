# 🚀 Quick Start Guide - InfoHub

## Step 1: Install Dependencies

### Backend

```bash
cd server
npm install
```

### Frontend

```bash
cd client
npm install
```

## Step 2: Get Your API Key

1. Go to https://openweathermap.org/api
2. Sign up for a free account
3. Generate an API key
4. Copy your API key

## Step 3: Configure Backend

1. Open `server/.env` file
2. Replace `YOUR_OPENWEATHERMAP_API_KEY_HERE` with your actual API key:
   ```env
   WEATHER_API_KEY=your_actual_api_key_here
   PORT=3001
   ```

## Step 4: Run the Application

### Terminal 1 - Start Backend

```bash
cd server
npm start
```

You should see: "Server is running on http://localhost:3001"

### Terminal 2 - Start Frontend

```bash
cd client
npm run dev
```

You should see: "Local: http://localhost:5173"

## Step 5: Open in Browser

Open your browser and go to: http://localhost:5173

## ✅ Testing Checklist

- [ ] Weather Module loads with London weather
- [ ] Search for a different city (e.g., "New York")
- [ ] Currency Converter shows conversions for ₹100
- [ ] Try converting a different amount
- [ ] Quote Generator displays a random quote
- [ ] Click "Get New Quote" to refresh
- [ ] All three tabs work without page reload
- [ ] Loading states appear during API calls
- [ ] Error handling works (try an invalid city name)

## 🎯 Production Deployment

### Vercel Deployment (Recommended)

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Deploy frontend and backend separately
5. Add environment variables in Vercel dashboard

### Alternative: Render, Railway, or Heroku

Follow similar deployment steps for your chosen platform.

## 📞 Support

If you encounter any issues:

1. Check that both servers are running
2. Verify your API key is correctly set
3. Clear browser cache and reload
4. Check console for error messages

---

Happy coding! 🎉
