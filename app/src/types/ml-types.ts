export interface MLNode {
  id: string;
  type: 'data' | 'preprocessing' | 'model' | 'evaluation' | 'output';
  category: string;
  name: string;
  position: { x: number; y: number };
  data: {
    label: string;
    description: string;
    parameters?: Record<string, unknown>;
    inputs?: string[];
    outputs?: string[];
  };
}

export interface MLEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

export interface MLPipeline {
  id: string;
  name: string;
  description: string;
  nodes: MLNode[];
  edges: MLEdge[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ComponentConfig {
  id: string;
  name: string;
  category: string;
  type: 'data' | 'preprocessing' | 'model' | 'evaluation' | 'output';
  description: string;
  icon: string;
  parameters: Parameter[];
  inputs: string[];
  outputs: string[];
  pythonTemplate: string;
}

export interface Parameter {
  name: string;
  type: 'number' | 'string' | 'boolean' | 'select' | 'multiselect';
  label: string;
  description?: string;
  defaultValue: unknown;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  pipeline: Omit<MLPipeline, 'id' | 'createdAt' | 'updatedAt'>;
  thumbnail?: string;
}

export interface SavedModel {
  id: string;
  name: string;
  description?: string;
  userId: string;
  nodes: MLNode[];
  edges: MLEdge[];
  createdAt: Date;
  updatedAt: Date;
  isPublic?: boolean;
  tags?: string[];
}