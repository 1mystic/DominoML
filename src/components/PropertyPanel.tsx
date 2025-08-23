import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { MLNode, Parameter } from '@/types/ml-types';
import { ML_COMPONENTS } from '@/data/ml-components';
import { Trash2, Settings } from 'lucide-react';

interface PropertyPanelProps {
  selectedNode: MLNode | null;
  onNodeUpdate: (node: MLNode) => void;
  onNodeDelete: (nodeId: string) => void;
}

const PropertyPanel = ({ selectedNode, onNodeUpdate, onNodeDelete }: PropertyPanelProps) => {
  const [localParameters, setLocalParameters] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (selectedNode?.data.parameters) {
      setLocalParameters({ ...selectedNode.data.parameters });
    }
  }, [selectedNode]);

  if (!selectedNode) {
    return (
      <div className="w-full h-full bg-gray-50 dark:bg-gray-900 p-4 lg:p-6 flex items-center justify-center">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <Settings className="w-8 h-8 lg:w-12 lg:h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
          <p className="text-sm">Select a component to edit its properties</p>
        </div>
      </div>
    );
  }

  const componentConfig = ML_COMPONENTS.find(comp => comp.name === selectedNode.name);
  const parameters = componentConfig?.parameters || [];

  const handleParameterChange = (paramName: string, value: unknown) => {
    const updatedParameters = { ...localParameters, [paramName]: value };
    setLocalParameters(updatedParameters);

    const updatedNode: MLNode = {
      ...selectedNode,
      data: {
        ...selectedNode.data,
        parameters: updatedParameters,
      },
    };
    onNodeUpdate(updatedNode);
  };

  const renderParameterInput = (param: Parameter) => {
    const value = localParameters[param.name] ?? param.defaultValue;

    switch (param.type) {
      case 'string':
        return (
          <Input
            value={String(value || '')}
            onChange={(e) => handleParameterChange(param.name, e.target.value)}
            placeholder={param.description}
            className="text-sm"
          />
        );

      case 'number':
        return param.min !== undefined && param.max !== undefined ? (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>{param.min}</span>
              <span>{String(value)}</span>
              <span>{param.max}</span>
            </div>
            <Slider
              value={[Number(value) || 0]}
              onValueChange={([newValue]) => handleParameterChange(param.name, newValue)}
              min={param.min}
              max={param.max}
              step={param.step || 1}
              className="w-full"
            />
          </div>
        ) : (
          <Input
            type="number"
            value={String(value || '')}
            onChange={(e) => handleParameterChange(param.name, Number(e.target.value))}
            min={param.min}
            max={param.max}
            step={param.step}
            className="text-sm"
          />
        );

      case 'boolean':
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={Boolean(value)}
              onCheckedChange={(checked) => handleParameterChange(param.name, checked)}
            />
            <span className="text-sm">{Boolean(value) ? 'Enabled' : 'Disabled'}</span>
          </div>
        );

      case 'select':
        return (
          <Select
            value={String(value)}
            onValueChange={(newValue) => handleParameterChange(param.name, newValue)}
          >
            <SelectTrigger className="text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {param.options?.map((option) => (
                <SelectItem key={option} value={option} className="text-sm">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      default:
        return (
          <Input
            value={String(value || '')}
            onChange={(e) => handleParameterChange(param.name, e.target.value)}
            className="text-sm"
          />
        );
    }
  };

  return (
    <div className="w-72 sm:w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col h-full">
      <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">Properties</h3>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
          <div>
            <h4 className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100 mb-2">
              {selectedNode.data.label}
            </h4>
            {componentConfig?.description && (
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                {componentConfig.description}
              </p>
            )}
          </div>

          {parameters.length > 0 && (
            <div className="space-y-3 sm:space-y-4">
              <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100">Parameters</h5>
              <div className="space-y-3">
                {parameters.map((param) => (
                  <div key={param.name} className="space-y-1 sm:space-y-2">
                    <Label 
                      htmlFor={param.name} 
                      className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      {param.label}
                    </Label>
                    {renderParameterInput(param)}
                    {param.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {param.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const updatedNode: MLNode = {
                  ...selectedNode,
                  data: {
                    ...selectedNode.data,
                    parameters: localParameters,
                  },
                };
                onNodeUpdate(updatedNode);
              }}
              className="w-full text-xs sm:text-sm"
            >
              Apply Changes
            </Button>
            
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onNodeDelete(selectedNode.id)}
              className="w-full text-xs sm:text-sm"
            >
              Delete Component
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPanel;