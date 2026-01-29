# Profile Optimizer Chrome Extension

AI-powered LinkedIn profile optimization tool that uses OpenAI's GPT-4.1 to analyze your profile and generate actionable recommendations for improvement.

## What is this?

Profile Optimizer is a Chrome extension designed to help professionals enhance their LinkedIn presence. It reads your LinkedIn profile directly from the page, analyzes it using AI, and provides tailored suggestions to make your profile more compelling, relevant to your target role, and optimized for recruiters and opportunities.

Whether you're job hunting, building your personal brand, or simply want a more polished professional presence, this tool gives you AI-powered insights without leaving LinkedIn.

![Profile Optimization Result](screenshot.png)

## Features

- **LinkedIn Integration**: Automatically parses your profile, target role, and skills directly from LinkedIn pages
- **Smart Optimization**: Get AI-powered suggestions tailored to your target role and industry
- **Refinement Loop**: Iteratively refine recommendations with additional requests (e.g., "make it more concise")
- **Copy to Clipboard**: Easily copy optimized text to update your LinkedIn profile
- **Persistent Storage**: Your API key and preferences are saved locally for convenience

## Usage

### Step 1: Initial Setup

1. Install the extension (see [Starting the Project](#starting-the-project) below)
2. Navigate to any LinkedIn page
3. Click the **Profile Optimizer** extension icon in your Chrome toolbar
4. Click **Generate** — a setup dialog will appear
5. Enter your **OpenAI API key** (required)
6. Click **Save & Continue**

### Step 2: Parse LinkedIn Data

For each data type, navigate to the relevant LinkedIn page, click the extension icon, and click the parse button:

| Data    | Navigate To                             | Button      |
| ------- | --------------------------------------- | ----------- |
| Profile | Your LinkedIn profile page              | **Profile** |
| Role    | A job posting matching your target role | **Role**    |
| Skills  | A skills page or relevant profile       | **Skills**  |

A green checkmark indicates successfully parsed data.

### Step 3: Generate Recommendations

1. Once you've parsed your profile, role, and skills data, click **Generate**
2. The AI will analyze your profile against your target role and skills
3. A dialog will appear with personalized recommendations
4. Use the **Copy** button to copy recommendations to your clipboard
5. To refine suggestions, type additional requests (e.g., "focus more on leadership experience") and click **Update Recommendation**

## Contribution

#### Node.js

Ensure you have the latest Node.js installed: [Node.js Official Website](https://nodejs.org/).

> **Note:** Sometimes, running `node -v` might show version 22 (latest), but an older version could still be in use under the hood.  
> If you encounter build errors, verify your Node.js versions with `volta list node`.  
> If the versions differ, update Node.js as required (e.g., using `nvm use 22`).

#### IDE

While using **VS Code** is optional, it is highly recommended.

**Suggested Extensions:**

- **ESLint**
- **Prettier**

---

#### Starting the Project

- **git clone**
- **npm install**
- **npm run build**
- In Google Chrome go to **chrome://extensions/** -> click **Load unpacked** -> select **dist** folder in extension
- In chrome extensions Pin **Profile Optimizer**. Then click on it in top panel

## Tech Stack

- React 18
- Material UI v6
- Vite + vite-plugin-chrome-extension
- OpenAI GPT-4.1 API

## Requirements

- OpenAI API key with GPT-4.1 access
- Chrome browser

## License

MIT
