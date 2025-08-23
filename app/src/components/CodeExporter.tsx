import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, Code } from 'lucide-react';
import { MLNode, MLEdge } from '@/types/ml-types';
import { ML_COMPONENTS } from '@/data/ml-components';
import { toast } from 'sonner';

interface CodeExporterProps {
  nodes: MLNode[];
  edges: MLEdge[];
  pipelineName: string;
}

const CodeExporter = ({ nodes, edges, pipelineName }: CodeExporterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const generatePythonCode = (): string => {
    if (nodes.length === 0) {
      return '# No nodes in pipeline\nprint("Please add components to your pipeline first!")';
    }

    // Sort nodes based on dependencies (topological sort)
    const sortedNodes = topologicalSort(nodes, edges);
    
    let code = `# ${pipelineName}\n# Generated ML Pipeline Code\n\n`;
    
    // Add imports
    const imports = new Set<string>();
    sortedNodes.forEach(node => {
      const component = ML_COMPONENTS.find(comp => comp.name === node.name);
      if (component?.pythonTemplate) {
        // Extract imports from template
        const templateLines = component.pythonTemplate.split('\n');
        templateLines.forEach(line => {
          if (line.trim().startsWith('from ') || line.trim().startsWith('import ')) {
            imports.add(line.trim());
          }
        });
      }
    });

    code += Array.from(imports).join('\n') + '\n\n';
    
    // Add main pipeline code
    code += '# Main Pipeline\n';
    code += 'def run_ml_pipeline():\n';
    code += '    """Execute the complete ML pipeline"""\n';
    code += '    print("Starting ML Pipeline execution...")\n    \n';

    sortedNodes.forEach((node, index) => {
      const component = ML_COMPONENTS.find(comp => comp.name === node.name);
      if (component?.pythonTemplate) {
        code += `    # Step ${index + 1}: ${node.data.label}\n`;
        code += `    print("Step ${index + 1}: ${node.data.label}")\n`;
        
        let nodeCode = component.pythonTemplate;
        
        // Replace parameters in template
        if (node.data.parameters) {
          Object.entries(node.data.parameters).forEach(([key, value]) => {
            const placeholder = `{${key}}`;
            let replacement = value;
            
            if (typeof value === 'string') {
              replacement = `'${value}'`;
            } else if (typeof value === 'boolean') {
              replacement = value ? 'True' : 'False';
            }
            
            nodeCode = nodeCode.replace(new RegExp(placeholder.replace('{', '\\{').replace('}', '\\}'), 'g'), String(replacement));
          });
        }
        
        // Indent the code
        const indentedCode = nodeCode.split('\n')
          .filter(line => line.trim())
          .map(line => `    ${line}`)
          .join('\n');
        
        code += indentedCode + '\n    \n';
      }
    });

    code += '    print("Pipeline execution completed!")\n\n';
    code += '# Execute the pipeline\n';
    code += 'if __name__ == "__main__":\n';
    code += '    run_ml_pipeline()\n';

    return code;
  };

  const topologicalSort = (nodes: MLNode[], edges: MLEdge[]): MLNode[] => {
    // Create adjacency list
    const graph: Record<string, string[]> = {};
    const inDegree: Record<string, number> = {};
    
    // Initialize
    nodes.forEach(node => {
      graph[node.id] = [];
      inDegree[node.id] = 0;
    });
    
    // Build graph
    edges.forEach(edge => {
      graph[edge.source].push(edge.target);
      inDegree[edge.target]++;
    });
    
    // Topological sort using Kahn's algorithm
    const queue: string[] = [];
    const result: MLNode[] = [];
    
    // Find nodes with no incoming edges
    Object.keys(inDegree).forEach(nodeId => {
      if (inDegree[nodeId] === 0) {
        queue.push(nodeId);
      }
    });
    
    while (queue.length > 0) {
      const nodeId = queue.shift()!;
      const node = nodes.find(n => n.id === nodeId);
      if (node) result.push(node);
      
      graph[nodeId].forEach(neighbor => {
        inDegree[neighbor]--;
        if (inDegree[neighbor] === 0) {
          queue.push(neighbor);
        }
      });
    }
    
    return result;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatePythonCode());
      toast.success('Code copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  const downloadCode = () => {
    const code = generatePythonCode();
    const blob = new Blob([code], { type: 'text/python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pipelineName.toLowerCase().replace(/\s+/g, '_')}_pipeline.py`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Code downloaded successfully!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Code className="w-4 h-4" />
          <span className="ml-1 lg:ml-2 text-xs lg:text-sm">Code</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Export Python Code</DialogTitle>
          <DialogDescription>
            Generated Python code for your ML pipeline: <Badge variant="outline">{pipelineName}</Badge>
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 space-y-4">
          <div className="flex gap-2">
            <Button onClick={copyToClipboard} variant="outline" size="sm">
              <Copy className="w-4 h-4 mr-2" />
              Copy to Clipboard
            </Button>
            <Button onClick={downloadCode} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download .py File
            </Button>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b dark:border-gray-700">
              <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                {pipelineName.toLowerCase().replace(/\s+/g, '_')}_pipeline.py
              </span>
            </div>
            <Textarea
              readOnly
              value={generatePythonCode()}
              className="font-mono text-sm min-h-[400px] resize-none border-0 focus:ring-0 dark:bg-gray-900"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CodeExporter;