# Profile Optimizer Chrome Extension - Implementation Plan

Based on analysis of the `tars2` project, here's a detailed plan for creating a similar Chrome extension.

---

## 🔄 Main Extension Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  1. INITIALIZE                                                          │
│     └── Gather initial info (API key, profile data)                     │
│                                                                         │
│  2. READY STATE                                                         │
│     └── Show popup with "Generate Recommendation" button                │
│                                                                         │
│  3. GENERATE                                                            │
│     └── Click button → Send API request to OpenAI                       │
│                                                                         │
│  4. SHOW RESULTS                                                        │
│     └── Display results in modal window                                 │
│         ├── Show recommendation output                                  │
│         ├── Input field for additional request/refinement               │
│         └── "Update Recommendation" button                              │
│                                                                         │
│  5. REFINE (Loop)                                                       │
│     └── Click "Update Recommendation" → Send API request → Show results │
│         └── Repeat as needed                                            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ Architecture Overview

| Component          | Purpose                                                  |
| ------------------ | -------------------------------------------------------- |
| **Popup**          | Extension popup UI with "Generate Recommendation" button |
| **Content Script** | Injects React components into web pages                  |
| **Dialog System**  | Modal dialogs for setup and displaying results           |
| **API Layer**      | OpenAI API integration                                   |
| **Data/Storage**   | LocalStorage for persisting user data                    |

---

## 📁 Project Structure

```
profile_optimizer/
├── package.json                    # Dependencies (React, MUI, Vite, etc.)
├── vite.config.js                  # Vite config with chrome extension plugin
├── index.html                      # Dev entry point
├── eslint.config.js                # ESLint configuration
├── public/                         # Static assets
│   └── icon.png
├── src/
│   ├── manifest.json               # Chrome extension manifest (v3)
│   ├── icon.png                    # Extension icon
│   │
│   ├── popup/                      # Popup UI
│   │   ├── index.html              # Popup HTML entry
│   │   ├── main.jsx                # React mount point
│   │   ├── App.jsx                 # Main popup component
│   │   └── components/
│   │       ├── Header.jsx
│   │       └── GenerateButton.jsx
│   │
│   ├── content-script/             # Content script for page injection
│   │   ├── index.js                # Main content script entry
│   │   ├── initContent.jsx         # React root injection
│   │   ├── dialogContext.jsx       # Dialog state management
│   │   └── gatherInitialInfo.jsx   # Initial info gathering logic
│   │
│   ├── dialogs/                    # Dialog components
│   │   ├── CustomDialog.jsx        # Main dialog wrapper
│   │   ├── InitialSetup.jsx        # API key & initial setup
│   │   └── ResultDialog.jsx        # Display results + refinement input
│   │
│   ├── data/                       # Static data definitions
│   │   └── InitialQuestions.js     # Setup questions (API key, profile)
│   │
│   ├── prompts/                    # GPT prompt templates
│   │   └── optimizeProfilePrompt.js
│   │
│   └── utils/                      # Utility functions
│       ├── apiRequest.js           # OpenAI API wrapper
│       ├── chromeHelper.js         # Chrome messaging helpers
│       ├── showModal.js            # Modal trigger utility
│       └── saveData.js             # LocalStorage helpers
```

---

## 📝 Implementation Steps

### Phase 1: Project Setup

1. Initialize npm project with `package.json`
2. Configure Vite with `vite-plugin-chrome-extension`
3. Create `manifest.json` (Manifest V3)
4. Set up ESLint configuration
5. Install dependencies:
   - React, React DOM
   - MUI (Material UI)
   - styled-components
   - Vite + chrome extension plugin

### Phase 2: Popup UI

1. Create `popup/index.html` and `popup/main.jsx`
2. Build `App.jsx` with:
   - "Generate Recommendation" button
   - Loading state indicator
3. Create components:
   - `Header.jsx` - Extension title
   - `GenerateButton.jsx` - Main action button

### Phase 3: Content Script & Dialog System

1. Create `content-script/index.js` - message listener
2. Implement `initContent.jsx` - inject React root into page
3. Build `dialogContext.jsx` with dialog types:
   - `SETUP` - Initial setup (API key, profile data)
   - `RESULT` - Display results with refinement controls
4. Create `CustomDialog.jsx` wrapper component

### Phase 4: Dialog Components

1. `InitialSetup.jsx` - Collect:
   - OpenAI API key
   - Profile data to optimize
   - Target role/industry
2. `ResultDialog.jsx` - Display:
   - Recommendation output
   - Input field for additional request/refinement
   - "Update Recommendation" button
   - Copy to clipboard functionality

### Phase 5: API Integration

1. Implement `apiRequest.js` - OpenAI API wrapper
2. Create `optimizeProfilePrompt.js` - Prompt template for profile optimization
3. Handle refinement requests (append user feedback to context)

### Phase 6: Data & Storage

1. Define initial questions in `data/InitialQuestions.js`
2. Implement `saveData.js` for localStorage operations
3. Create `chromeHelper.js` for popup-content script communication

---

## 🔄 Detailed Flow

### Step 1: Initialize

```
User clicks extension icon
    ↓
Check if initial setup completed (localStorage)
    ↓
If not → Show InitialSetup dialog
    ├── Collect OpenAI API key
    ├── Collect profile data
    └── Save to localStorage
    ↓
Show popup with "Generate Recommendation" button
```

### Step 2: Generate Recommendation

```
User clicks "Generate Recommendation"
    ↓
Send message to content script
    ↓
Content script calls OpenAI API
    ├── Use optimizeProfilePrompt.js template
    └── Include profile data from localStorage
    ↓
Show ResultDialog modal with response
```

### Step 3: Refine (Loop)

```
User sees results in modal
    ↓
User enters additional request in input field
    ↓
User clicks "Update Recommendation"
    ↓
Send API request with:
    ├── Original context
    └── User's refinement request
    ↓
Update ResultDialog with new response
    ↓
Repeat as needed
```

---

## 🛠️ Tech Stack

- **Build Tool**: Vite with `vite-plugin-chrome-extension`
- **Frontend**: React 18
- **UI Library**: MUI (Material UI) v6
- **Styling**: styled-components + Emotion
- **API**: OpenAI GPT-4o
- **Storage**: Chrome LocalStorage
- **Manifest**: Chrome Extension Manifest V3

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@fontsource/roboto": "^5.1.1",
    "@mui/icons-material": "^6.4.0",
    "@mui/material": "^6.3.0",
    "@mui/styled-engine-sc": "^6.3.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "styled-components": "^6.1.13"
  },
  "devDependencies": {
    "@eslint/js": "^9.15.0",
    "@types/chrome": "^0.0.248",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.15.0",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.14",
    "globals": "^15.12.0",
    "vite": "^6.0.1",
    "vite-plugin-chrome-extension": "^0.0.7"
  }
}
```

---

## 🚀 Getting Started

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
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the `dist` folder from the project

---

## 📋 Implementation Checklist

- [ ] Phase 1: Project Setup

  - [ ] package.json
  - [ ] vite.config.js
  - [ ] manifest.json
  - [ ] eslint.config.js
  - [ ] Install dependencies

- [ ] Phase 2: Popup UI

  - [ ] popup/index.html
  - [ ] popup/main.jsx
  - [ ] popup/App.jsx
  - [ ] Header, GenerateButton components

- [ ] Phase 3: Content Script & Dialog System

  - [ ] content-script/index.js
  - [ ] initContent.jsx
  - [ ] dialogContext.jsx
  - [ ] CustomDialog.jsx

- [ ] Phase 4: Dialog Components

  - [ ] InitialSetup.jsx
  - [ ] ResultDialog.jsx (with refinement input + update button)

- [ ] Phase 5: API Integration

  - [ ] apiRequest.js
  - [ ] optimizeProfilePrompt.js

- [ ] Phase 6: Data & Storage

  - [ ] InitialQuestions.js
  - [ ] saveData.js
  - [ ] chromeHelper.js
