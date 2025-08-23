import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { MLNode, MLEdge } from '@/types/ml-types';
import { Download, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface ModelImportExportProps {
  nodes: MLNode[];
  edges: MLEdge[];
  pipelineName: string;
  onImportModel: (nodes: MLNode[], edges: MLEdge[], name: string) => void;
}

export const ModelImportExport = ({ nodes, edges, pipelineName, onImportModel }: ModelImportExportProps) => {
  const [importData, setImportData] = useState('');
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  const exportModel = () => {
    if (nodes.length === 0) {
      toast.error('No model to export');
      return;
    }

    const modelData = {
      version: '1.0',
      name: pipelineName,
      nodes,
      edges,
      exportedAt: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(modelData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${pipelineName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Model exported successfully!');
  };

  const importModel = () => {
    try {
      const modelData = JSON.parse(importData);
      
      if (!modelData.nodes || !modelData.edges) {
        throw new Error('Invalid model format');
      }

      onImportModel(modelData.nodes, modelData.edges, modelData.name || 'Imported Model');
      setImportData('');
      setIsImportDialogOpen(false);
      toast.success('Model imported successfully!');
    } catch (error) {
      toast.error('Failed to import model. Please check the format.');
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setImportData(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={exportModel} disabled={nodes.length === 0}>
        <Download className="w-4 h-4 mr-2" />
        Export
      </Button>

      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Import Model</DialogTitle>
            <DialogDescription>
              Import a previously exported model or paste JSON data
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="file-import">Import from file</Label>
              <Input
                id="file-import"
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="json-data">Or paste JSON data</Label>
              <Textarea
                id="json-data"
                placeholder="Paste exported model JSON here..."
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                className="mt-1 h-40"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={importModel} disabled={!importData.trim()}>
                Import Model
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
