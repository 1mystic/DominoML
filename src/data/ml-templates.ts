import { Template } from '@/types/ml-types';

export const ML_TEMPLATES: Template[] = [
  {
    id: 'iris-classification',
    name: 'Iris Classification',
    description: 'Classic iris flower classification using Random Forest',
    category: 'Classification',
    pipeline: {
      name: 'Iris Classification Pipeline',
      description: 'Classify iris flowers using Random Forest',
      nodes: [
        {
          id: 'data-1',
          type: 'data',
          category: 'Data Sources',
          name: 'Sample Dataset',
          position: { x: 100, y: 100 },
          data: {
            label: 'Iris Dataset',
            description: 'Load iris dataset',
            parameters: { dataset: 'iris' }
          }
        },
        {
          id: 'split-1',
          type: 'preprocessing',
          category: 'Preprocessing',
          name: 'Train Test Split',
          position: { x: 300, y: 100 },
          data: {
            label: 'Split Data',
            description: 'Split into train/test sets',
            parameters: { test_size: 0.3, random_state: 42 }
          }
        },
        {
          id: 'model-1',
          type: 'model',
          category: 'Classification',
          name: 'Random Forest Classifier',
          position: { x: 500, y: 100 },
          data: {
            label: 'RF Classifier',
            description: 'Train Random Forest model',
            parameters: { n_estimators: 100, max_depth: 10 }
          }
        },
        {
          id: 'eval-1',
          type: 'evaluation',
          category: 'Evaluation',
          name: 'Classification Metrics',
          position: { x: 700, y: 100 },
          data: {
            label: 'Evaluate Model',
            description: 'Calculate performance metrics'
          }
        }
      ],
      edges: [
        { id: 'e1', source: 'data-1', target: 'split-1' },
        { id: 'e2', source: 'split-1', target: 'model-1' },
        { id: 'e3', source: 'model-1', target: 'eval-1' },
        { id: 'e4', source: 'split-1', target: 'eval-1' }
      ]
    }
  },
  {
    id: 'boston-regression',
    name: 'Boston Housing Regression',
    description: 'Predict house prices using Linear Regression',
    category: 'Regression',
    pipeline: {
      name: 'Boston Housing Price Prediction',
      description: 'Predict house prices using regression',
      nodes: [
        {
          id: 'data-1',
          type: 'data',
          category: 'Data Sources',
          name: 'Sample Dataset',
          position: { x: 100, y: 100 },
          data: {
            label: 'Boston Dataset',
            description: 'Load Boston housing dataset',
            parameters: { dataset: 'boston' }
          }
        },
        {
          id: 'scaler-1',
          type: 'preprocessing',
          category: 'Preprocessing',
          name: 'Standard Scaler',
          position: { x: 250, y: 100 },
          data: {
            label: 'Scale Features',
            description: 'Standardize feature values',
            parameters: { with_mean: true, with_std: true }
          }
        },
        {
          id: 'split-1',
          type: 'preprocessing',
          category: 'Preprocessing',
          name: 'Train Test Split',
          position: { x: 400, y: 100 },
          data: {
            label: 'Split Data',
            description: 'Split into train/test sets',
            parameters: { test_size: 0.2, random_state: 42 }
          }
        },
        {
          id: 'model-1',
          type: 'model',
          category: 'Regression',
          name: 'Linear Regression',
          position: { x: 550, y: 100 },
          data: {
            label: 'Linear Model',
            description: 'Train linear regression model',
            parameters: { fit_intercept: true }
          }
        },
        {
          id: 'eval-1',
          type: 'evaluation',
          category: 'Evaluation',
          name: 'Regression Metrics',
          position: { x: 700, y: 100 },
          data: {
            label: 'Evaluate Model',
            description: 'Calculate regression metrics'
          }
        }
      ],
      edges: [
        { id: 'e1', source: 'data-1', target: 'scaler-1' },
        { id: 'e2', source: 'scaler-1', target: 'split-1' },
        { id: 'e3', source: 'split-1', target: 'model-1' },
        { id: 'e4', source: 'model-1', target: 'eval-1' },
        { id: 'e5', source: 'split-1', target: 'eval-1' }
      ]
    }
  },
  {
    id: 'multi-model-comparison',
    name: 'Multi-Model Comparison',
    description: 'Compare multiple classification algorithms',
    category: 'Classification',
    pipeline: {
      name: 'Model Comparison Pipeline',
      description: 'Compare Random Forest vs SVM',
      nodes: [
        {
          id: 'data-1',
          type: 'data',
          category: 'Data Sources',
          name: 'Sample Dataset',
          position: { x: 100, y: 150 },
          data: {
            label: 'Wine Dataset',
            description: 'Load wine classification dataset',
            parameters: { dataset: 'wine' }
          }
        },
        {
          id: 'split-1',
          type: 'preprocessing',
          category: 'Preprocessing',
          name: 'Train Test Split',
          position: { x: 300, y: 150 },
          data: {
            label: 'Split Data',
            description: 'Split into train/test sets',
            parameters: { test_size: 0.25, random_state: 42 }
          }
        },
        {
          id: 'model-1',
          type: 'model',
          category: 'Classification',
          name: 'Random Forest Classifier',
          position: { x: 500, y: 100 },
          data: {
            label: 'Random Forest',
            description: 'Train Random Forest model',
            parameters: { n_estimators: 150, max_depth: 8 }
          }
        },
        {
          id: 'model-2',
          type: 'model',
          category: 'Classification',
          name: 'SVM Classifier',
          position: { x: 500, y: 200 },
          data: {
            label: 'SVM Model',
            description: 'Train SVM model',
            parameters: { kernel: 'rbf', C: 1.0 }
          }
        },
        {
          id: 'eval-1',
          type: 'evaluation',
          category: 'Evaluation',
          name: 'Classification Metrics',
          position: { x: 700, y: 100 },
          data: {
            label: 'RF Metrics',
            description: 'Evaluate Random Forest'
          }
        },
        {
          id: 'eval-2',
          type: 'evaluation',
          category: 'Evaluation',
          name: 'Classification Metrics',
          position: { x: 700, y: 200 },
          data: {
            label: 'SVM Metrics',
            description: 'Evaluate SVM'
          }
        }
      ],
      edges: [
        { id: 'e1', source: 'data-1', target: 'split-1' },
        { id: 'e2', source: 'split-1', target: 'model-1' },
        { id: 'e3', source: 'split-1', target: 'model-2' },
        { id: 'e4', source: 'model-1', target: 'eval-1' },
        { id: 'e5', source: 'model-2', target: 'eval-2' },
        { id: 'e6', source: 'split-1', target: 'eval-1' },
        { id: 'e7', source: 'split-1', target: 'eval-2' }
      ]
    }
  }
];