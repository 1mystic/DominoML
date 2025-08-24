# GlideML - ML Model Builder Tool

A modern, drag-and-drop machine learning pipeline builder with Firebase authentication, dark theme support, and comprehensive model management features.

[![Atharv Khare's Portfolio](https://og-playground.vercel.app/api/image?....)](https://glideml.vercel.app/)

## ✨ Features

### Core Features
- **Drag & Drop Interface**: Visual pipeline builder using ReactFlow
- **Component Library**: Extensive collection of ML components (data sources, preprocessing, models, evaluation)
- **Code Export**: Generate Python code from visual pipelines
- **Template Gallery**: Pre-built ML pipeline templates
- **Real-time Validation**: Model structure validation with detailed feedback

### New Enhanced Features
- **Firebase Authentication**: User login/signup with Google OAuth support
- **Cloud Storage**: Save and manage your models in the cloud
- **Dark Theme**: Full dark mode support with system preference detection
- **My Models Gallery**: View, load, and manage your saved models
- **Model Analytics**: Comprehensive model statistics and validation
- **Import/Export**: Export models as JSON and import them back
- **Improved UI**: Collapsible component categories with better organization

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- pnpm package manager
- Firebase project (for authentication and data storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ml-model-builder-tool/workspace/shadcn-ui
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with Email/Password and Google Sign-in
   - Enable Firestore Database
   - Copy your Firebase configuration

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. **Start the development server**
   ```bash
   pnpm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

##  Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Framework**: shadcn/ui + Tailwind CSS
- **Flow Editor**: ReactFlow
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Routing**: React Router Dom
- **State Management**: React Hooks
- **Form Handling**: React Hook Form + Zod
- **Notifications**: Sonner
- **Themes**: next-themes

##  Usage Guide

### Authentication
1. **Sign Up**: Create a new account with email/password or Google
2. **Sign In**: Log in to access your saved models and cloud storage
3. **Profile**: Manage your account from the user menu

### Building ML Pipelines
1. **Drag Components**: Drag components from the sidebar to the canvas
2. **Connect Components**: Click and drag between component handles to create connections
3. **Configure Properties**: Select a component to edit its parameters in the property panel
4. **Validate Model**: Use the validation tool to check for issues
5. **Save Model**: Save your pipeline to the cloud for later use

### Managing Models
- **Templates**: Browse and load pre-built templates
- **My Models**: Access your saved models from the cloud
- **Import/Export**: Share models by exporting to JSON files
- **Analytics**: View detailed statistics and validation results

### Component Categories
- **Data Sources**: CSV loaders, sample datasets, database connections
- **Preprocessing**: Data cleaning, feature engineering, scaling
- **Models**: Classification, regression, clustering algorithms
- **Evaluation**: Metrics, validation, performance analysis
- **Output**: Predictions, visualizations, export tools

##  Customization

### Themes
The app supports three theme modes:
- **Light Mode**: Default light theme
- **Dark Mode**: Full dark theme with proper contrast
- **System**: Automatically follows your system preference

### Adding New Components
1. Define component in `src/data/ml-components.ts`
2. Add appropriate category and parameters
3. Include Python template for code generation

### Styling
- Global styles: `src/index.css`
- Component styles: Tailwind CSS classes
- Custom components: `src/components/ui/`

## 🔧 Development

### Project Structure
```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── MLModelBuilder.tsx
│   ├── ComponentLibrary.tsx
│   ├── FlowCanvas.tsx
│   └── ...
├── contexts/            # React contexts (Auth)
├── data/               # ML components and templates
├── hooks/              # Custom React hooks
├── lib/                # Utilities and Firebase config
├── pages/              # Route pages
├── services/           # API services
└── types/              # TypeScript type definitions
```

### Available Scripts
```bash
pnpm run dev          # Start development server
pnpm run build        # Build for production
pnpm run preview      # Preview production build
pnpm run lint         # Run ESLint
```

### Firebase Security Rules
Add these Firestore security rules for the `savedModels` collection:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /savedModels/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

##  Troubleshooting

### Common Issues

1. **Firebase Auth Issues**
   - Ensure Firebase configuration is correct
   - Check that Authentication is enabled in Firebase Console
   - Verify domain is authorized for OAuth

2. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`
   - Check TypeScript errors: `pnpm run build`

3. **Component Issues**
   - Ensure all shadcn/ui components are installed
   - Check import paths are correct

### Environment Variables
Make sure all required environment variables are set in your `.env` file. The app will not work without proper Firebase configuration.

