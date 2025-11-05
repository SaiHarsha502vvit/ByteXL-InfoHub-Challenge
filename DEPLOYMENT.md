# 🚀 InfoHub Deployment Guide

## Prerequisites

✅ Git repository initialized and pushed to GitHub
✅ Vercel CLI installed
✅ OpenWeatherMap API key

---

## Deployment Steps

### Method 1: Using Vercel CLI (Quick Deploy)

#### 1. Login to Vercel
```bash
vercel login
```

#### 2. Deploy from project root
```bash
cd /e/Assignment-ByteXL/InfoHub-Challenge
vercel
```

Follow the prompts:
- **Set up and deploy**: Yes
- **Which scope**: Select your account
- **Link to existing project**: No
- **Project name**: infohub-challenge (or your preferred name)
- **Directory**: ./ (root directory)
- **Want to override settings**: No

#### 3. Add Environment Variables

After first deployment, add your environment variable:
```bash
vercel env add WEATHER_API_KEY
```

Then paste your OpenWeatherMap API key when prompted.

Select:
- **Production**: Yes
- **Preview**: Yes
- **Development**: Yes

#### 4. Redeploy with Environment Variables
```bash
vercel --prod
```

---

### Method 2: Using Vercel Dashboard (Recommended for Beginners)

#### Step 1: Push to GitHub

Make sure all changes are committed:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

#### Step 2: Import Project to Vercel

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: Leave default or blank
   - **Output Directory**: Leave default
   - Click **"Deploy"**

#### Step 3: Add Environment Variables

1. Go to your project settings in Vercel
2. Navigate to **"Environment Variables"**
3. Add the following:
   - **Key**: `WEATHER_API_KEY`
   - **Value**: Your OpenWeatherMap API key
   - **Environments**: Check all (Production, Preview, Development)
4. Click **"Save"**

#### Step 4: Redeploy

1. Go to **"Deployments"** tab
2. Click the three dots on the latest deployment
3. Select **"Redeploy"**

---

## Post-Deployment

### Verify Your Deployment

Your app will be available at:
- **Production**: `https://your-project-name.vercel.app`

Test all features:
1. ✅ Weather search functionality
2. ✅ Currency conversion
3. ✅ Quote generator

### Update API URLs (If Needed)

The current setup uses relative URLs (`/api`), which will work automatically with Vercel's routing.

---

## Alternative Deployment Options

### Option A: Deploy Frontend and Backend Separately

#### Frontend (Netlify/Vercel)
- Deploy only the `client` folder
- Set build command: `npm run build`
- Set publish directory: `dist`

#### Backend (Render/Railway/Heroku)
- Deploy only the `server` folder
- Set start command: `npm start`
- Add `WEATHER_API_KEY` environment variable

Then update `client/src/lib/apiClient.js`:
```javascript
const apiClient = axios.create({
  baseURL: import.meta.env.PROD 
    ? "https://your-backend-url.com/api" 
    : "/api",
  timeout: 10000,
});
```

### Option B: Deploy on Render

1. Create a new Web Service on https://render.com
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `npm install && npm run build --prefix client && npm install --prefix server`
   - **Start Command**: `cd server && npm start`
4. Add environment variables in Render dashboard

---

## Troubleshooting

### Common Issues

**1. API Not Working After Deployment**
- Verify `WEATHER_API_KEY` is set in Vercel environment variables
- Check Vercel function logs for errors

**2. 404 Errors on Page Refresh**
- Ensure `vercel.json` routing is configured correctly (already done ✅)

**3. Build Failures**
- Check Node.js version compatibility
- Verify all dependencies are in `package.json` (not just `devDependencies`)

**4. CORS Errors**
- The backend already has CORS configured
- Make sure API routes use `/api` prefix

---

## Environment Variables Needed

### Production
- `WEATHER_API_KEY`: Your OpenWeatherMap API key

---

## Useful Commands

```bash
# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Remove a deployment
vercel rm [deployment-url]

# View project info
vercel inspect
```

---

## Next Steps

1. ✅ Set up custom domain (optional)
   - Go to Vercel Project Settings → Domains
   - Add your custom domain

2. ✅ Enable analytics
   - Vercel provides built-in analytics

3. ✅ Set up monitoring
   - Use Vercel's built-in error tracking

4. ✅ Configure CI/CD
   - Automatic deployments on git push (enabled by default)

---

## Support

- **Vercel Documentation**: https://vercel.com/docs
- **Deployment Issues**: Check Vercel function logs
- **API Issues**: Check browser console and network tab

---

## Quick Deploy Now! 🚀

Run these commands in order:

```bash
# 1. Make sure everything is committed
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel

# 4. Add environment variable
vercel env add WEATHER_API_KEY

# 5. Deploy to production
vercel --prod
```

Your app will be live in minutes! 🎉
