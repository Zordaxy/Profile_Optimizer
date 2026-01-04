# Profile Optimizer Chrome Extension

AI-powered profile optimization tool that uses OpenAI's GPT-4o to enhance your professional profile/bio.

## Features

- **Easy Setup**: Enter your OpenAI API key and profile data once
- **Smart Optimization**: Get AI-powered suggestions to improve your profile
- **Refinement Loop**: Iteratively refine recommendations with additional requests
- **Copy to Clipboard**: Easily copy optimized text to use anywhere

## Installation

### Development

```bash
# Install dependencies
npm install

# Development mode (with hot reload)
npm run dev

# Build for production
npm run build

# Watch mode (rebuild on changes)
npm run watch
```

### Loading the Extension in Chrome

1. Run `npm run build`
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the `dist` folder from the project

## Usage

1. Click the extension icon in Chrome toolbar
2. On first use, enter your OpenAI API key and profile data
3. Click "Generate Recommendation"
4. View the optimized profile in the modal
5. Optionally, enter additional requests and click "Update Recommendation" to refine

## Project Structure

```
src/
├── popup/                  # Extension popup UI
├── content-script/         # Page injection & dialog system
├── dialogs/                # Modal dialog components
├── data/                   # Data definitions
├── prompts/                # GPT prompt templates
└── utils/                  # Utility functions
```

## Tech Stack

- React 18
- Material UI v6
- Vite + vite-plugin-chrome-extension
- OpenAI GPT-4o API

## Requirements

- OpenAI API key with GPT-4o access
- Chrome browser

## License

MIT
