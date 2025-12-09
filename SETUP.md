# HealthChat Assist - Setup Guide

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API Key

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   ```bash
   copy .env.example .env
   ```
   - Open `.env` and add your Google Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it in your `.env` file

## Troubleshooting

- If you get API errors, ensure your `.env` file is properly configured
- Make sure you're using Node.js v18 or higher
- Clear browser cache if styles don't load properly

## Features

✅ Fully responsive design (mobile, tablet, desktop)
✅ AI-powered symptom analysis
✅ Interactive pain scale selector
✅ Real medication suggestions
✅ Safety disclaimers and precautionary tips
