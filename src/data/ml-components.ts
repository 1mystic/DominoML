import { ComponentConfig } from '@/types/ml-types';

export const ML_COMPONENTS: ComponentConfig[] = [
  // Data Sources
  {
    id: 'csv-loader',
    name: 'CSV Loader',
    category: 'Data Sources',
    type: 'data',
    description: 'Load data from CSV file',
    icon: '📊',
    parameters: [
      {
        name: 'file_path',
        type: 'string',
        label: 'File Path',
        description: 'Path to the CSV file',
        defaultValue: 'data.csv',
        required: true
      },
      {
        name: 'separator',
        type: 'select',
        label: 'Separator',
        defaultValue: ',',
        options: [',', ';', '\t', '|']
      }
    ],
    inputs: [],
    outputs: ['data'],
    pythonTemplate: `
import pandas as pd

# Load data from CSV
data = pd.read_csv('{file_path}', sep='{separator}')
print(f"Loaded dataset with shape: {data.shape}")
`
  },
  {
    id: 'sample-data',
    name: 'Sample Dataset',
    category: 'Data Sources',
    type: 'data',
    description: 'Load built-in sample datasets',
    icon: '🎯',
    parameters: [
      {
        name: 'dataset',
        type: 'select',
        label: 'Dataset',
        defaultValue: 'iris',
        options: ['iris', 'boston', 'wine', 'breast_cancer', 'diabetes']
      }
    ],
    inputs: [],
    outputs: ['data'],
    pythonTemplate: `
from sklearn.datasets import load_{dataset}
import pandas as pd

# Load sample dataset
dataset = load_{dataset}()
data = pd.DataFrame(dataset.data, columns=dataset.feature_names)
if hasattr(dataset, 'target'):
    data['target'] = dataset.target
print(f"Loaded {dataset} dataset with shape: {data.shape}")
`
  },

  // Preprocessing
  {
    id: 'standard-scaler',
    name: 'Standard Scaler',
    category: 'Preprocessing',
    type: 'preprocessing',
    description: 'Standardize features by removing mean and scaling to unit variance',
    icon: '📏',
    parameters: [
      {
        name: 'with_mean',
        type: 'boolean',
        label: 'Center Data',
        defaultValue: true
      },
      {
        name: 'with_std',
        type: 'boolean',
        label: 'Scale Data',
        defaultValue: true
      }
    ],
    inputs: ['data'],
    outputs: ['scaled_data'],
    pythonTemplate: `
from sklearn.preprocessing import StandardScaler

# Initialize and fit the scaler
scaler = StandardScaler(with_mean={with_mean}, with_std={with_std})
scaled_data = scaler.fit_transform(data)
print(f"Applied StandardScaler to data with shape: {scaled_data.shape}")
`
  },
  {
    id: 'train-test-split',
    name: 'Train Test Split',
    category: 'Preprocessing',
    type: 'preprocessing',
    description: 'Split data into training and testing sets',
    icon: '✂️',
    parameters: [
      {
        name: 'test_size',
        type: 'number',
        label: 'Test Size',
        defaultValue: 0.2,
        min: 0.1,
        max: 0.9,
        step: 0.05
      },
      {
        name: 'random_state',
        type: 'number',
        label: 'Random State',
        defaultValue: 42
      }
    ],
    inputs: ['data'],
    outputs: ['X_train', 'X_test', 'y_train', 'y_test'],
    pythonTemplate: `
from sklearn.model_selection import train_test_split

# Separate features and target
X = data.drop('target', axis=1)
y = data['target']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size={test_size}, random_state={random_state}
)
print(f"Training set size: {X_train.shape[0]}")
print(f"Test set size: {X_test.shape[0]}")
`
  },

  {
    id: 'min-max-scaler',
    name: 'Min-Max Scaler',
    category: 'Preprocessing',
    type: 'preprocessing',
    description: 'Scale features to a fixed range, typically [0, 1]',
    icon: '📐',
    parameters: [
      {
        name: 'feature_range_min',
        type: 'number',
        label: 'Range Min',
        defaultValue: 0,
        min: -10,
        max: 10,
        step: 0.1
      },
      {
        name: 'feature_range_max',
        type: 'number',
        label: 'Range Max',
        defaultValue: 1,
        min: -10,
        max: 10,
        step: 0.1
      }
    ],
    inputs: ['data'],
    outputs: ['scaled_data'],
    pythonTemplate: `
from sklearn.preprocessing import MinMaxScaler

# Initialize and fit the scaler
scaler = MinMaxScaler(feature_range=({feature_range_min}, {feature_range_max}))
scaled_data = scaler.fit_transform(data)
print(f"Applied MinMaxScaler to data with shape: {scaled_data.shape}")
`
  },
  {
    id: 'robust-scaler',
    name: 'Robust Scaler',
    category: 'Preprocessing',
    type: 'preprocessing',
    description: 'Scale features using median and interquartile range',
    icon: '🛡️',
    parameters: [
      {
        name: 'quantile_range_min',
        type: 'number',
        label: 'Quantile Min',
        defaultValue: 25,
        min: 0,
        max: 50,
        step: 5
      },
      {
        name: 'quantile_range_max',
        type: 'number',
        label: 'Quantile Max',
        defaultValue: 75,
        min: 50,
        max: 100,
        step: 5
      }
    ],
    inputs: ['data'],
    outputs: ['scaled_data'],
    pythonTemplate: `
from sklearn.preprocessing import RobustScaler

# Initialize and fit the scaler
scaler = RobustScaler(quantile_range=({quantile_range_min}, {quantile_range_max}))
scaled_data = scaler.fit_transform(data)
print(f"Applied RobustScaler to data with shape: {scaled_data.shape}")
`
  },
  {
    id: 'pca',
    name: 'PCA Dimensionality Reduction',
    category: 'Preprocessing',
    type: 'preprocessing',
    description: 'Principal Component Analysis for dimensionality reduction',
    icon: '📊',
    parameters: [
      {
        name: 'n_components',
        type: 'number',
        label: 'Components',
        defaultValue: 2,
        min: 1,
        max: 50
      },
      {
        name: 'whiten',
        type: 'boolean',
        label: 'Whiten Components',
        defaultValue: false
      }
    ],
    inputs: ['data'],
    outputs: ['transformed_data'],
    pythonTemplate: `
from sklearn.decomposition import PCA

# Initialize and fit PCA
pca = PCA(n_components={n_components}, whiten={whiten})
transformed_data = pca.fit_transform(data)
print(f"PCA reduced data to {transformed_data.shape[1]} components")
print(f"Explained variance ratio: {pca.explained_variance_ratio_}")
`
  },
  {
    id: 'feature-selection',
    name: 'SelectKBest Features',
    category: 'Preprocessing',
    type: 'preprocessing',
    description: 'Select K best features based on statistical tests',
    icon: '🎯',
    parameters: [
      {
        name: 'k',
        type: 'number',
        label: 'Number of Features',
        defaultValue: 10,
        min: 1,
        max: 100
      },
      {
        name: 'score_func',
        type: 'select',
        label: 'Score Function',
        defaultValue: 'f_classif',
        options: ['f_classif', 'chi2', 'mutual_info_classif', 'f_regression']
      }
    ],
    inputs: ['X_train', 'y_train'],
    outputs: ['X_selected'],
    pythonTemplate: `
from sklearn.feature_selection import SelectKBest, {score_func}

# Select K best features
selector = SelectKBest(score_func={score_func}, k={k})
X_selected = selector.fit_transform(X_train, y_train)
print(f"Selected {X_selected.shape[1]} features from {X_train.shape[1]}")
`
  },

  // Classification Models
  {
    id: 'random-forest-classifier',
    name: 'Random Forest Classifier',
    category: 'Classification',
    type: 'model',
    description: 'Random Forest classification algorithm',
    icon: '🌲',
    parameters: [
      {
        name: 'n_estimators',
        type: 'number',
        label: 'Number of Trees',
        defaultValue: 100,
        min: 1,
        max: 1000
      },
      {
        name: 'max_depth',
        type: 'number',
        label: 'Max Depth',
        defaultValue: 10,
        min: 1,
        max: 50
      },
      {
        name: 'random_state',
        type: 'number',
        label: 'Random State',
        defaultValue: 42
      }
    ],
    inputs: ['X_train', 'y_train'],
    outputs: ['model'],
    pythonTemplate: `
from sklearn.ensemble import RandomForestClassifier

# Initialize and train the model
model = RandomForestClassifier(
    n_estimators={n_estimators},
    max_depth={max_depth},
    random_state={random_state}
)
model.fit(X_train, y_train)
print("Random Forest Classifier trained successfully")
`
  },
  {
    id: 'svm-classifier',
    name: 'SVM Classifier',
    category: 'Classification',
    type: 'model',
    description: 'Support Vector Machine classifier',
    icon: '⚡',
    parameters: [
      {
        name: 'kernel',
        type: 'select',
        label: 'Kernel',
        defaultValue: 'rbf',
        options: ['linear', 'poly', 'rbf', 'sigmoid']
      },
      {
        name: 'C',
        type: 'number',
        label: 'Regularization (C)',
        defaultValue: 1.0,
        min: 0.01,
        max: 100,
        step: 0.01
      }
    ],
    inputs: ['X_train', 'y_train'],
    outputs: ['model'],
    pythonTemplate: `
from sklearn.svm import SVC

# Initialize and train the model
model = SVC(kernel='{kernel}', C={C}, random_state=42)
model.fit(X_train, y_train)
print("SVM Classifier trained successfully")
`
  },
  {
    id: 'logistic-regression',
    name: 'Logistic Regression',
    category: 'Classification',
    type: 'model',
    description: 'Linear classifier for binary and multiclass problems',
    icon: '📈',
    parameters: [
      {
        name: 'C',
        type: 'number',
        label: 'Regularization (C)',
        defaultValue: 1.0,
        min: 0.01,
        max: 100,
        step: 0.01
      },
      {
        name: 'max_iter',
        type: 'number',
        label: 'Max Iterations',
        defaultValue: 1000,
        min: 100,
        max: 5000,
        step: 100
      },
      {
        name: 'solver',
        type: 'select',
        label: 'Solver',
        defaultValue: 'lbfgs',
        options: ['lbfgs', 'liblinear', 'newton-cg', 'sag', 'saga']
      }
    ],
    inputs: ['X_train', 'y_train'],
    outputs: ['model'],
    pythonTemplate: `
from sklearn.linear_model import LogisticRegression

# Initialize and train the model
model = LogisticRegression(C={C}, max_iter={max_iter}, solver='{solver}', random_state=42)
model.fit(X_train, y_train)
print("Logistic Regression model trained successfully")
`
  },
  {
    id: 'decision-tree-classifier',
    name: 'Decision Tree Classifier',
    category: 'Classification',
    type: 'model',
    description: 'Tree-based classifier with interpretable rules',
    icon: '🌳',
    parameters: [
      {
        name: 'max_depth',
        type: 'number',
        label: 'Max Depth',
        defaultValue: 10,
        min: 1,
        max: 50
      },
      {
        name: 'min_samples_split',
        type: 'number',
        label: 'Min Samples Split',
        defaultValue: 2,
        min: 2,
        max: 20
      },
      {
        name: 'criterion',
        type: 'select',
        label: 'Criterion',
        defaultValue: 'gini',
        options: ['gini', 'entropy']
      }
    ],
    inputs: ['X_train', 'y_train'],
    outputs: ['model'],
    pythonTemplate: `
from sklearn.tree import DecisionTreeClassifier

# Initialize and train the model
model = DecisionTreeClassifier(
    max_depth={max_depth},
    min_samples_split={min_samples_split},
    criterion='{criterion}',
    random_state=42
)
model.fit(X_train, y_train)
print("Decision Tree Classifier trained successfully")
`
  },
  {
    id: 'gradient-boosting-classifier',
    name: 'Gradient Boosting Classifier',
    category: 'Classification',
    type: 'model',
    description: 'Ensemble method with boosted decision trees',
    icon: '🚀',
    parameters: [
      {
        name: 'n_estimators',
        type: 'number',
        label: 'Number of Estimators',
        defaultValue: 100,
        min: 10,
        max: 500
      },
      {
        name: 'learning_rate',
        type: 'number',
        label: 'Learning Rate',
        defaultValue: 0.1,
        min: 0.01,
        max: 1.0,
        step: 0.01
      },
      {
        name: 'max_depth',
        type: 'number',
        label: 'Max Depth',
        defaultValue: 3,
        min: 1,
        max: 10
      }
    ],
    inputs: ['X_train', 'y_train'],
    outputs: ['model'],
    pythonTemplate: `
from sklearn.ensemble import GradientBoostingClassifier

# Initialize and train the model
model = GradientBoostingClassifier(
    n_estimators={n_estimators},
    learning_rate={learning_rate},
    max_depth={max_depth},
    random_state=42
)
model.fit(X_train, y_train)
print("Gradient Boosting Classifier trained successfully")
`
  },
  {
    id: 'knn-classifier',
    name: 'K-Nearest Neighbors',
    category: 'Classification',
    type: 'model',
    description: 'Instance-based learning algorithm',
    icon: '👥',
    parameters: [
      {
        name: 'n_neighbors',
        type: 'number',
        label: 'Number of Neighbors',
        defaultValue: 5,
        min: 1,
        max: 50
      },
      {
        name: 'weights',
        type: 'select',
        label: 'Weights',
        defaultValue: 'uniform',
        options: ['uniform', 'distance']
      },
      {
        name: 'metric',
        type: 'select',
        label: 'Distance Metric',
        defaultValue: 'euclidean',
        options: ['euclidean', 'manhattan', 'chebyshev', 'minkowski']
      }
    ],
    inputs: ['X_train', 'y_train'],
    outputs: ['model'],
    pythonTemplate: `
from sklearn.neighbors import KNeighborsClassifier

# Initialize and train the model
model = KNeighborsClassifier(
    n_neighbors={n_neighbors},
    weights='{weights}',
    metric='{metric}'
)
model.fit(X_train, y_train)
print("K-Nearest Neighbors Classifier trained successfully")
`
  },
  {
    id: 'naive-bayes-classifier',
    name: 'Naive Bayes Classifier',
    category: 'Classification',
    type: 'model',
    description: 'Probabilistic classifier based on Bayes theorem',
    icon: '🎲',
    parameters: [
      {
        name: 'var_smoothing',
        type: 'number',
        label: 'Variance Smoothing',
        defaultValue: 1e-9,
        min: 1e-12,
        max: 1e-6,
        step: 1e-10
      }
    ],
    inputs: ['X_train', 'y_train'],
    outputs: ['model'],
    pythonTemplate: `
from sklearn.naive_bayes import GaussianNB

# Initialize and train the model
model = GaussianNB(var_smoothing={var_smoothing})
model.fit(X_train, y_train)
print("Naive Bayes Classifier trained successfully")
`
  },

  // Regression Models
  {
    id: 'linear-regression',
    name: 'Linear Regression',
    category: 'Regression',
    type: 'model',
    description: 'Linear regression algorithm',
    icon: '📈',
    parameters: [
      {
        name: 'fit_intercept',
        type: 'boolean',
        label: 'Fit Intercept',
        defaultValue: true
      }
    ],
    inputs: ['X_train', 'y_train'],
    outputs: ['model'],
    pythonTemplate: `
from sklearn.linear_model import LinearRegression

# Initialize and train the model
model = LinearRegression(fit_intercept={fit_intercept})
model.fit(X_train, y_train)
print("Linear Regression model trained successfully")
`
  },
  {
    id: 'random-forest-regressor',
    name: 'Random Forest Regressor',
    category: 'Regression',
    type: 'model',
    description: 'Random Forest regression algorithm',
    icon: '🌳',
    parameters: [
      {
        name: 'n_estimators',
        type: 'number',
        label: 'Number of Trees',
        defaultValue: 100,
        min: 1,
        max: 1000
      },
      {
        name: 'max_depth',
        type: 'number',
        label: 'Max Depth',
        defaultValue: 10,
        min: 1,
        max: 50
      }
    ],
    inputs: ['X_train', 'y_train'],
    outputs: ['model'],
    pythonTemplate: `
from sklearn.ensemble import RandomForestRegressor

# Initialize and train the model
model = RandomForestRegressor(
    n_estimators={n_estimators},
    max_depth={max_depth},
    random_state=42
)
model.fit(X_train, y_train)
print("Random Forest Regressor trained successfully")
`
  },

  // Evaluation
  {
    id: 'classification-metrics',
    name: 'Classification Metrics',
    category: 'Evaluation',
    type: 'evaluation',
    description: 'Calculate classification performance metrics',
    icon: '📊',
    parameters: [],
    inputs: ['model', 'X_test', 'y_test'],
    outputs: ['metrics'],
    pythonTemplate: `
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report

# Make predictions
y_pred = model.predict(X_test)

# Calculate metrics
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, average='weighted')
recall = recall_score(y_test, y_pred, average='weighted')
f1 = f1_score(y_test, y_pred, average='weighted')

print(f"Accuracy: {accuracy:.4f}")
print(f"Precision: {precision:.4f}")
print(f"Recall: {recall:.4f}")
print(f"F1-Score: {f1:.4f}")
print("\\nDetailed Classification Report:")
print(classification_report(y_test, y_pred))
`
  },
  {
    id: 'regression-metrics',
    name: 'Regression Metrics',
    category: 'Evaluation',
    type: 'evaluation',
    description: 'Calculate regression performance metrics',
    icon: '📈',
    parameters: [],
    inputs: ['model', 'X_test', 'y_test'],
    outputs: ['metrics'],
    pythonTemplate: `
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import numpy as np

# Make predictions
y_pred = model.predict(X_test)

# Calculate metrics
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Mean Squared Error: {mse:.4f}")
print(f"Root Mean Squared Error: {rmse:.4f}")
print(f"Mean Absolute Error: {mae:.4f}")
print(f"R² Score: {r2:.4f}")
`
  },
  {
    id: 'decision-tree-regressor',
    name: 'Decision Tree Regressor',
    category: 'Regression',
    type: 'model',
    description: 'Tree-based regression with interpretable rules',
    icon: '🌲',
    parameters: [
      {
        name: 'max_depth',
        type: 'number',
        label: 'Max Depth',
        defaultValue: 10,
        min: 1,
        max: 50
      },
      {
        name: 'min_samples_split',
        type: 'number',
        label: 'Min Samples Split',
        defaultValue: 2,
        min: 2,
        max: 20
      }
    ],
    inputs: ['X_train', 'y_train'],
    outputs: ['model'],
    pythonTemplate: `
from sklearn.tree import DecisionTreeRegressor

# Initialize and train the model
model = DecisionTreeRegressor(
    max_depth={max_depth},
    min_samples_split={min_samples_split},
    random_state=42
)
model.fit(X_train, y_train)
print("Decision Tree Regressor trained successfully")
`
  },
  {
    id: 'ridge-regression',
    name: 'Ridge Regression',
    category: 'Regression',
    type: 'model',
    description: 'Linear regression with L2 regularization',
    icon: '🏔️',
    parameters: [
      {
        name: 'alpha',
        type: 'number',
        label: 'Alpha (Regularization)',
        defaultValue: 1.0,
        min: 0.01,
        max: 100,
        step: 0.01
      }
    ],
    inputs: ['X_train', 'y_train'],
    outputs: ['model'],
    pythonTemplate: `
from sklearn.linear_model import Ridge

# Initialize and train the model
model = Ridge(alpha={alpha})
model.fit(X_train, y_train)
print("Ridge Regression model trained successfully")
`
  },
  {
    id: 'kmeans-clustering',
    name: 'K-Means Clustering',
    category: 'Clustering',
    type: 'model',
    description: 'Partition data into K clusters',
    icon: '🎯',
    parameters: [
      {
        name: 'n_clusters',
        type: 'number',
        label: 'Number of Clusters',
        defaultValue: 3,
        min: 2,
        max: 20
      }
    ],
    inputs: ['data'],
    outputs: ['labels', 'model'],
    pythonTemplate: `
from sklearn.cluster import KMeans

# Initialize and fit the model
model = KMeans(n_clusters={n_clusters}, random_state=42)
labels = model.fit_predict(data)
print(f"K-Means clustering completed with {len(set(labels))} clusters")
`
  },
  {
    id: 'confusion-matrix',
    name: 'Confusion Matrix',
    category: 'Evaluation',
    type: 'evaluation',
    description: 'Generate confusion matrix for classification',
    icon: '📋',
    parameters: [],
    inputs: ['model', 'X_test', 'y_test'],
    outputs: ['confusion_matrix'],
    pythonTemplate: `
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
import matplotlib.pyplot as plt

# Make predictions and generate confusion matrix
y_pred = model.predict(X_test)
cm = confusion_matrix(y_test, y_pred)

# Display confusion matrix
disp = ConfusionMatrixDisplay(confusion_matrix=cm)
disp.plot()
plt.title('Confusion Matrix')
plt.show()
print("Confusion matrix generated successfully")
`
  },
  {
    id: 'cross-validation',
    name: 'Cross Validation',
    category: 'Evaluation',
    type: 'evaluation',
    description: 'Perform k-fold cross validation',
    icon: '🔄',
    parameters: [
      {
        name: 'cv_folds',
        type: 'number',
        label: 'CV Folds',
        defaultValue: 5,
        min: 2,
        max: 10
      }
    ],
    inputs: ['model', 'X_train', 'y_train'],
    outputs: ['cv_scores'],
    pythonTemplate: `
from sklearn.model_selection import cross_val_score
import numpy as np

# Perform cross validation
cv_scores = cross_val_score(model, X_train, y_train, cv={cv_folds})

# Print results
print(f"Cross Validation Results ({cv_folds}-fold):")
print(f"Individual scores: {cv_scores}")
print(f"Mean CV Score: {cv_scores.mean():.4f} (+/- {cv_scores.std() * 2:.4f})")
`
  }
];