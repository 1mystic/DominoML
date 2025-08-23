# Project Summary
The project aims to create a machine learning model builder that allows users to visually construct classical regression and classification models using a drag-and-drop interface. It provides a rich library of components, templates for common use cases, and the ability to export Python code for the models created, facilitating a user-friendly experience for both beginners and experienced data scientists.

# Project Module Description
- **ML Model Builder**: The main interface for building machine learning models with drag-and-drop functionality.
- **Component Library**: A collection of reusable components for data handling, preprocessing, modeling, and evaluation.
- **Flow Canvas**: The workspace where users can visually connect components to build their ML pipelines.
- **Property Panel**: Displays and allows editing of properties for the selected component in the pipeline.
- **Template Gallery**: Provides pre-built templates for common ML tasks to help users get started quickly.
- **Code Exporter**: Generates and exports Python code based on the constructed ML pipeline.

# Directory Tree
```
dominoML/
├── README.md                 # Project documentation
├── components/               # React components for the application
│   ├── CodeExporter.tsx      # Component for exporting code
│   ├── ComponentLibrary.tsx   # Library of ML components
│   ├── FlowCanvas.tsx        # Canvas for constructing ML pipelines
│   ├── MLModelBuilder.tsx     # Main builder interface
│   ├── MLNode.tsx            # Custom node component for the pipeline
│   ├── PropertyPanel.tsx      # Panel for editing node properties
│   ├── TemplateGallery.tsx    # Gallery for managing templates
├── data/                     # Data files for components and templates
│   ├── ml-components.ts       # Definitions of ML components
│   └── ml-templates.ts        # Predefined ML templates
├── types/                    # TypeScript definitions
│   └── ml-types.ts           # Types used throughout the application
├── index.html                # Main HTML file
├── package.json              # Project dependencies and scripts
├── vite.config.ts            # Vite configuration for the project
└── public/                   # Static assets
    └── favicon.svg           # Application favicon
```

# File Description Inventory
- **README.md**: Contains project information and setup instructions.
- **components/**: Directory for all React components used in the application.
- **data/**: Contains configuration and template data for ML components.
- **types/**: TypeScript type definitions for better code structure and type safety.

# Technology Stack
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Superset of JavaScript that adds static types.
- **React Flow**: Library for building node-based editors.
- **Sonner**: For toast notifications.
- **Vite**: Build tool for modern web applications.

# Usage
1. **Install Dependencies**: Run `pnpm install` to install the necessary packages.
2. **Build**: Use `pnpm run build` to create a production build.
3. **Run**: Start the development server with `pnpm run dev` to test the application locally.
