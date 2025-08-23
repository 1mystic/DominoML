import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MLNode, MLEdge } from '@/types/ml-types';
import { CheckCircle, AlertCircle, Info, BarChart3 } from 'lucide-react';

interface ModelValidatorProps {
  nodes: MLNode[];
  edges: MLEdge[];
}

interface ValidationIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  nodeId?: string;
}

export const ModelValidator = ({ nodes, edges }: ModelValidatorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const validateModel = (): ValidationIssue[] => {
    const issues: ValidationIssue[] = [];

    // Check if model has nodes
    if (nodes.length === 0) {
      issues.push({
        type: 'error',
        message: 'Model is empty. Add at least one component.'
      });
      return issues;
    }

    // Check for data sources
    const dataSources = nodes.filter(node => node.type === 'data');
    if (dataSources.length === 0) {
      issues.push({
        type: 'error',
        message: 'No data source found. Add a data input component.'
      });
    } else if (dataSources.length > 1) {
      issues.push({
        type: 'warning',
        message: 'Multiple data sources detected. Ensure proper data flow.'
      });
    }

    // Check for models
    const models = nodes.filter(node => node.type === 'model');
    if (models.length === 0) {
      issues.push({
        type: 'warning',
        message: 'No machine learning model found.'
      });
    } else if (models.length > 1) {
      issues.push({
        type: 'info',
        message: 'Multiple models detected. This is fine for ensemble methods.'
      });
    }

    // Check for isolated nodes
    const connectedNodes = new Set();
    edges.forEach(edge => {
      connectedNodes.add(edge.source);
      connectedNodes.add(edge.target);
    });

    const isolatedNodes = nodes.filter(node => !connectedNodes.has(node.id));
    isolatedNodes.forEach(node => {
      issues.push({
        type: 'warning',
        message: `Component "${node.data.label}" is not connected to any other component.`,
        nodeId: node.id
      });
    });

    // Check for evaluation components
    const evaluationNodes = nodes.filter(node => node.type === 'evaluation');
    if (evaluationNodes.length === 0 && models.length > 0) {
      issues.push({
        type: 'info',
        message: 'Consider adding evaluation components to assess model performance.'
      });
    }

    return issues;
  };

  const getModelStatistics = () => {
    const stats = {
      totalNodes: nodes.length,
      totalConnections: edges.length,
      nodeTypes: {
        data: nodes.filter(n => n.type === 'data').length,
        preprocessing: nodes.filter(n => n.type === 'preprocessing').length,
        model: nodes.filter(n => n.type === 'model').length,
        evaluation: nodes.filter(n => n.type === 'evaluation').length,
        output: nodes.filter(n => n.type === 'output').length,
      },
      categories: Array.from(new Set(nodes.map(n => n.category))),
      complexity: nodes.length + edges.length,
    };

    return stats;
  };

  const issues = validateModel();
  const stats = getModelStatistics();
  
  const errorCount = issues.filter(i => i.type === 'error').length;
  const warningCount = issues.filter(i => i.type === 'warning').length;

  const getValidationIcon = () => {
    if (errorCount > 0) return <AlertCircle className="w-4 h-4 text-red-500" />;
    if (warningCount > 0) return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    return <CheckCircle className="w-4 h-4 text-green-500" />;
  };

  const getValidationStatus = () => {
    if (errorCount > 0) return 'Has Errors';
    if (warningCount > 0) return 'Has Warnings';
    return 'Valid';
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          {getValidationIcon()}
          <BarChart3 className="w-4 h-4 mr-2" />
          Validate ({getValidationStatus()})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Model Analysis & Validation</DialogTitle>
          <DialogDescription>
            Review your model's structure, statistics, and potential issues
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto max-h-[60vh]">
          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Model Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold">{stats.totalNodes}</div>
                  <div className="text-sm text-gray-500">Total Components</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.totalConnections}</div>
                  <div className="text-sm text-gray-500">Connections</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Component Types</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(stats.nodeTypes).map(([type, count]) => (
                    count > 0 && (
                      <Badge key={type} variant="outline">
                        {type}: {count}
                      </Badge>
                    )
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Categories</h4>
                <div className="flex flex-wrap gap-1">
                  {stats.categories.map(category => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium">Complexity Score</h4>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(stats.complexity * 2, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm">{stats.complexity}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Validation Issues */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                Validation Results
                {getValidationIcon()}
              </CardTitle>
              <CardDescription>
                {issues.length === 0 ? 'No issues found' : `${issues.length} issue(s) detected`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {issues.length === 0 ? (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Your model looks good! No validation issues found.
                  </AlertDescription>
                </Alert>
              ) : (
                issues.map((issue, index) => (
                  <Alert 
                    key={index} 
                    variant={issue.type === 'error' ? 'destructive' : 'default'}
                  >
                    {issue.type === 'error' && <AlertCircle className="h-4 w-4" />}
                    {issue.type === 'warning' && <AlertCircle className="h-4 w-4" />}
                    {issue.type === 'info' && <Info className="h-4 w-4" />}
                    <AlertDescription>{issue.message}</AlertDescription>
                  </Alert>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
