# 🏥 HealthChat Assist

> AI-powered health assistant providing preliminary symptom analysis, medication suggestions, and health guidance.

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC.svg)](https://tailwindcss.com/)

## 📋 Overview

HealthChat Assist is a modern Single Page Application (SPA) that acts as an intelligent, first-line digital health assistant. It leverages Google's Generative AI (Gemini 2.5 Flash) to analyze user-reported symptoms and provide structured, preliminary health guidance.

### ✨ Key Features

- 🤖 **AI-Powered Analysis** - Uses Google Gemini 2.5 Flash for intelligent symptom analysis
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- 🎯 **Interactive Pain Scale** - Visual pain intensity selector (Low, Normal, High)
- 💊 **Real Medication Suggestions** - Provides actual OTC brand names and generic alternatives
- ⚡ **Real-time Chat Interface** - Conversational UI with instant feedback
- 🛡️ **Safety First** - Built-in disclaimers and professional consultation prompts

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

```bash
# Clone the repository
git clone https://github.com/MD-Abdul-Raheem/AI_Health_Checkup_Bot.git
cd AI_Health_Checkup_Bot

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# Add your Gemini API key to .env
# GEMINI_API_KEY=your_api_key_here

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|----------|
| **React 19** | UI framework with latest features |
| **TypeScript** | Type-safe development |
| **Vite** | Fast build tool and dev server |
| **Tailwind CSS** | Utility-first styling |
| **Google Gemini API** | AI-powered symptom analysis |
| **React Router DOM** | Client-side routing |

## 📁 Project Structure

```
├── components/
│   ├── Button.tsx          # Reusable button component
│   └── Header.tsx          # Navigation header with mobile menu
├── pages/
│   ├── Home.tsx            # Landing page
│   ├── Chat.tsx            # Main chat interface
│   └── About.tsx           # About page
├── services/
│   └── genaiService.ts     # Gemini API integration
├── App.tsx                 # Main app component
├── index.tsx               # Entry point
├── types.ts                # TypeScript type definitions
└── vite.config.ts          # Vite configuration
```

## 🎯 How It Works

### 1. Symptom Intake
User describes symptoms in natural language, then selects pain intensity using an interactive visual scale.

### 2. AI Processing
The app sends symptoms and pain level to Google Gemini API with specific instructions to:
- Analyze symptoms as a "Clinical Pharmacist"
- Suggest only real, commercially available OTC medications
- Provide safety disclaimers
- Recommend professional consultation when needed

### 3. Response Display
Results are displayed in a structured, easy-to-read format:
- **Possible Conditions** - Preliminary assessment
- **Medication Suggestions** - OTC options with brand names
- **Precautionary Tips** - Home care recommendations

## 📱 Responsive Design

Optimized for all screen sizes:
- 📱 Mobile: < 640px
- 📱 Tablet: 640px - 768px
- 💻 Laptop: 768px - 1024px
- 🖥️ Desktop: 1024px+

## 🔧 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

## 🚨 Important Disclaimer

⚠️ **This application is for demonstration purposes only.**

- NOT a replacement for professional medical advice
- NOT for emergency medical situations
- Always consult qualified healthcare providers for diagnoses and treatment
- Call emergency services immediately for medical emergencies

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨💻 Author

**MD Abdul Raheem**
- GitHub: [@MD-Abdul-Raheem](https://github.com/MD-Abdul-Raheem)

## 🙏 Acknowledgments

- Google Gemini AI for powering the intelligence
- React team for the amazing framework
- Tailwind CSS for the styling system

---

**Made with ❤️ for better health information accessibility**
