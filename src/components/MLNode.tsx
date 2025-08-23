import { Handle, Position, NodeProps } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MLNode as MLNodeType } from '@/types/ml-types';
import { Settings, Database, Wrench, Brain, BarChart3 } from 'lucide-react';

const MLNode = ({ data, selected }: NodeProps<MLNodeType['data']>) => {
  const getNodeColor = (type: string) => {
    switch (type) {
      case 'data': return 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border-blue-300 dark:border-blue-700 shadow-blue-100 dark:shadow-blue-900/20';
      case 'preprocessing': return 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 border-green-300 dark:border-green-700 shadow-green-100 dark:shadow-green-900/20';
      case 'model': return 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 border-purple-300 dark:border-purple-700 shadow-purple-100 dark:shadow-purple-900/20';
      case 'evaluation': return 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 border-orange-300 dark:border-orange-700 shadow-orange-100 dark:shadow-orange-900/20';
      default: return 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 border-gray-300 dark:border-gray-600 shadow-gray-100 dark:shadow-gray-800/20';
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'data': return 'bg-blue-500 text-white';
      case 'preprocessing': return 'bg-green-500 text-white';
      case 'model': return 'bg-purple-500 text-white';
      case 'evaluation': return 'bg-orange-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'data': return <Database className="w-3 h-3" />;
      case 'preprocessing': return <Wrench className="w-3 h-3" />;
      case 'model': return <Brain className="w-3 h-3" />;
      case 'evaluation': return <BarChart3 className="w-3 h-3" />;
      default: return <Settings className="w-3 h-3" />;
    }
  };

  return (
    <Card className={`min-w-[220px] max-w-[280px] ${getNodeColor(data.type || '')} ${selected ? 'ring-2 ring-blue-500 dark:ring-blue-400 shadow-lg dark:shadow-blue-900/30' : 'shadow-md'} transition-all duration-200 hover:shadow-lg dark:hover:shadow-lg`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold truncate pr-2 text-gray-900 dark:text-gray-100">{data.label}</CardTitle>
          <Settings className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
        </div>
        <Badge className={`text-xs w-fit ${getBadgeColor(data.type || '')} flex items-center gap-1 px-2 py-1`}>
          {getTypeIcon(data.type || '')}
          {data.type}
        </Badge>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{data.description}</p>
        {data.parameters && Object.keys(data.parameters).length > 0 && (
          <div className="bg-white/50 dark:bg-gray-900/30 rounded-md p-2 border dark:border-gray-600">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Parameters</div>
            <div className="space-y-1">
              {Object.entries(data.parameters).slice(0, 2).map(([key, value]) => (
                <div key={key} className="flex justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400 truncate pr-2">{key}:</span>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{String(value)}</span>
                </div>
              ))}
              {Object.keys(data.parameters).length > 2 && (
                <div className="text-xs text-gray-500 dark:text-gray-400 italic">
                  +{Object.keys(data.parameters).length - 2} more parameters
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>

      {/* Input handles */}
      {data.inputs && data.inputs.length > 0 && (
        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 bg-gray-400 dark:bg-gray-500 border-2 border-white dark:border-gray-800"
        />
      )}

      {/* Output handles */}
      {data.outputs && data.outputs.length > 0 && (
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 bg-gray-600 dark:bg-gray-400 border-2 border-white dark:border-gray-800"
        />
      )}
    </Card>
  );
};

export default MLNode;