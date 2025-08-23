import { useState, useCallback } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import ComponentLibrary from './ComponentLibrary';
import FlowCanvas from './FlowCanvas';
import PropertyPanel from './PropertyPanel';
import TemplateGallery from './TemplateGallery';
import { SavedModelsGallery } from './SavedModelsGallery';
import CodeExporter from './CodeExporter';
import { UserProfile } from './UserProfile';
import { ThemeToggle } from './theme-toggle';
import { ModelImportExport } from './ModelImportExport';
import { ModelValidator } from './ModelValidator';
import { MLNode, MLEdge, ComponentConfig, Template, SavedModel } from '@/types/ml-types';
import { Play, Save, FolderOpen, Trash2, Palette, BookOpen, History, Home } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { saveModelToFirebase, updateModelInFirebase } from '@/services/modelService';
import { useNavigate } from 'react-router-dom';

const MLModelBuilder = () => {
  const [nodes, setNodes] = useState<MLNode[]>([]);
  const [edges, setEdges] = useState<MLEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<MLNode | null>(null);
  const [pipelineName, setPipelineName] = useState('My ML Pipeline');
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isSavedModelsDialogOpen, setIsSavedModelsDialogOpen] = useState(false);
  const [currentModelId, setCurrentModelId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const onDragStart = (event: React.DragEvent, component: ComponentConfig) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(component));
    event.dataTransfer.effectAllowed = 'move';
  };

  const onNodesChange = useCallback((newNodes: MLNode[]) => {
    setNodes(newNodes);
    // If selected node was deleted, clear selection
    if (selectedNode && !newNodes.find(n => n.id === selectedNode.id)) {
      setSelectedNode(null);
    }
  }, [selectedNode]);

  const onEdgesChange = useCallback((newEdges: MLEdge[]) => {
    setEdges(newEdges);
  }, []);

  const onNodeSelect = useCallback((node: MLNode | null) => {
    setSelectedNode(node);
  }, []);

  const onNodeUpdate = useCallback((updatedNode: MLNode) => {
    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === updatedNode.id ? updatedNode : node
      )
    );
    setSelectedNode(updatedNode);
  }, []);

  const onNodeDelete = useCallback((nodeId: string) => {
    setNodes(prevNodes => prevNodes.filter(node => node.id !== nodeId));
    setEdges(prevEdges => prevEdges.filter(edge => 
      edge.source !== nodeId && edge.target !== nodeId
    ));
    setSelectedNode(null);
    toast.success('Node deleted successfully');
  }, []);

  const onLoadTemplate = useCallback((template: Template) => {
    const newNodes = template.pipeline.nodes.map(node => ({
      ...node,
      id: `${node.id}-${Date.now()}`,
    }));
    
    const newEdges = template.pipeline.edges.map((edge, index) => ({
      ...edge,
      id: `e${index + 1}-${Date.now()}`,
      source: newNodes.find(n => n.name === template.pipeline.nodes.find(tn => tn.id === edge.source)?.name)?.id || edge.source,
      target: newNodes.find(n => n.name === template.pipeline.nodes.find(tn => tn.id === edge.target)?.name)?.id || edge.target,
    }));

    setNodes(newNodes);
    setEdges(newEdges);
    setPipelineName(template.name);
    setSelectedNode(null);
    setCurrentModelId(null);
    setIsTemplateDialogOpen(false);
    toast.success(`Template "${template.name}" loaded successfully!`);
  }, []);

  const onLoadSavedModel = useCallback((model: SavedModel) => {
    setNodes(model.nodes);
    setEdges(model.edges);
    setPipelineName(model.name);
    setSelectedNode(null);
    setCurrentModelId(model.id);
    setIsSavedModelsDialogOpen(false);
    toast.success(`Model "${model.name}" loaded successfully!`);
  }, []);

  const onImportModel = useCallback((nodes: MLNode[], edges: MLEdge[], name: string) => {
    setNodes(nodes);
    setEdges(edges);
    setPipelineName(name);
    setSelectedNode(null);
    setCurrentModelId(null);
  }, []);

  const clearPipeline = () => {
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    setPipelineName('My ML Pipeline');
    setCurrentModelId(null);
    toast.success('Pipeline cleared');
  };

  const savePipeline = async () => {
    if (!currentUser) {
      toast.error('Please sign in to save your model', {
        action: {
          label: 'Sign In',
          onClick: () => window.location.href = '/auth'
        }
      });
      return;
    }

    if (nodes.length === 0) {
      toast.error('Cannot save empty pipeline');
      return;
    }

    setIsSaving(true);
    try {
      if (currentModelId) {
        // Update existing model
        await updateModelInFirebase(currentModelId, pipelineName, nodes, edges);
        toast.success('Model updated successfully!');
      } else {
        // Save new model
        const modelId = await saveModelToFirebase(currentUser.uid, pipelineName, nodes, edges);
        setCurrentModelId(modelId);
        toast.success('Model saved successfully!');
      }
    } catch (error) {
      console.error('Error saving model:', error);
      toast.error('Failed to save model');
    } finally {
      setIsSaving(false);
    }
  };

  const getPipelineStats = () => {
    const stats = {
      dataNodes: nodes.filter(n => n.type === 'data').length,
      preprocessingNodes: nodes.filter(n => n.type === 'preprocessing').length,
      modelNodes: nodes.filter(n => n.type === 'model').length,
      evaluationNodes: nodes.filter(n => n.type === 'evaluation').length,
      totalConnections: edges.length,
    };
    return stats;
  };

  const stats = getPipelineStats();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Component Library Sidebar */}
      <div className="hidden lg:block flex-shrink-0">
        <ComponentLibrary onDragStart={onDragStart} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
          {/* Branding Section */}
          <div className="px-3 lg:px-4 py-2 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 lg:gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/')}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 flex-shrink-0 p-2"
                >
                  <Home className="w-4 h-4" />
                </Button>
                
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Palette className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                  <h1 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100">
                    ML Model Builder
                  </h1>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <UserProfile />
              </div>
            </div>
          </div>

          {/* Pipeline Controls Section */}
          <div className="px-3 lg:px-4 py-3">
            {/* Pipeline Name and Status */}
            <div className="flex items-center gap-2 lg:gap-4 mb-3">
              <div className="flex items-center gap-2 min-w-0">
                <Input
                  value={pipelineName}
                  onChange={(e) => setPipelineName(e.target.value)}
                  className="max-w-32 sm:max-w-48 lg:max-w-xs text-sm"
                  placeholder="Pipeline name..."
                />
                
                {currentModelId && (
                  <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
                    Saved Model
                  </Badge>
                )}
              </div>
              
              <ModelValidator nodes={nodes} edges={edges} />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 lg:gap-2 flex-wrap">
              {/* Mobile Component Library Toggle */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <FolderOpen className="w-4 h-4" />
                    <span className="ml-1 text-xs">Components</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-sm h-[80vh] overflow-hidden">
                  <DialogHeader>
                    <DialogTitle>Components</DialogTitle>
                  </DialogHeader>
                  <div className="flex-1 overflow-hidden">
                    <ComponentLibrary onDragStart={onDragStart} />
                  </div>
                </DialogContent>
              </Dialog>

              {/* Templates Dialog */}
              <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <BookOpen className="w-4 h-4" />
                    <span className="ml-1 lg:ml-2 text-xs lg:text-sm">Templates</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>Template Gallery</DialogTitle>
                    <DialogDescription>
                      Choose from pre-built ML pipeline templates to get started quickly
                    </DialogDescription>
                  </DialogHeader>
                  <div className="overflow-y-auto max-h-[60vh]">
                    <TemplateGallery onLoadTemplate={onLoadTemplate} />
                  </div>
                </DialogContent>
              </Dialog>

              {/* Saved Models Dialog */}
              <Dialog open={isSavedModelsDialogOpen} onOpenChange={setIsSavedModelsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <History className="w-4 h-4" />
                    <span className="ml-1 lg:ml-2 text-xs lg:text-sm">My Models</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>My Saved Models</DialogTitle>
                    <DialogDescription>
                      Load your previously saved ML pipelines
                    </DialogDescription>
                  </DialogHeader>
                  <div className="overflow-y-auto max-h-[60vh]">
                    <SavedModelsGallery onLoadModel={onLoadSavedModel} />
                  </div>
                </DialogContent>
              </Dialog>

              {/* Save Button */}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={savePipeline}
                disabled={isSaving || !currentUser}
                className="bg-green-50 hover:bg-green-100 border-green-200 text-green-700 dark:bg-green-900/20 dark:hover:bg-green-900/30 dark:border-green-800 dark:text-green-300"
              >
                <Save className="w-4 h-4" />
                <span className="ml-1 lg:ml-2 text-xs lg:text-sm">
                  {isSaving ? 'Saving...' : currentModelId ? 'Update' : 'Save'}
                </span>
              </Button>

              {/* Code Export */}
              <CodeExporter 
                nodes={nodes} 
                edges={edges} 
                pipelineName={pipelineName} 
              />

              {/* Model Import/Export */}
              <ModelImportExport 
                nodes={nodes} 
                edges={edges} 
                pipelineName={pipelineName}
                onImportModel={onImportModel}
              />

              {/* Clear Button */}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearPipeline}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
              >
                <Trash2 className="w-4 h-4" />
                <span className="ml-1 lg:ml-2 text-xs lg:text-sm">Clear</span>
              </Button>
            </div>

            {/* Pipeline Stats */}
            <div className="flex items-center gap-2 lg:gap-3 text-sm overflow-x-auto mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
              <Badge variant="outline" className="flex-shrink-0 text-xs">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                {stats.dataNodes} Data
              </Badge>
              <Badge variant="outline" className="flex-shrink-0 text-xs">
                <span className="w-2 h-2 rounded-full bg-orange-500 mr-1"></span>
                {stats.preprocessingNodes} Preprocessing
              </Badge>
              <Badge variant="outline" className="flex-shrink-0 text-xs">
                <span className="w-2 h-2 rounded-full bg-purple-500 mr-1"></span>
                {stats.modelNodes} Models
              </Badge>
              <Badge variant="outline" className="flex-shrink-0 text-xs">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                {stats.evaluationNodes} Evaluation
              </Badge>
              <Badge variant="outline" className="flex-shrink-0 text-xs">
                <span className="w-2 h-2 rounded-full bg-gray-500 mr-1"></span>
                {stats.totalConnections} Connections
              </Badge>
            </div>
          </div>
        </div>

        {/* Canvas Area with Responsive Layout */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          {/* Main Canvas */}
          <div className="flex-1 min-w-0 relative">
            <ReactFlowProvider>
              <FlowCanvas
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeSelect={onNodeSelect}
                selectedNodeId={selectedNode?.id || null}
              />
            </ReactFlowProvider>
            
            {/* Mobile Property Panel Overlay */}
            {selectedNode && (
              <div className="lg:hidden absolute bottom-4 left-4 right-4 z-10">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-64 overflow-hidden">
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <h3 className="font-medium text-sm">Properties</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedNode(null)}
                      className="h-6 w-6 p-0"
                    >
                      ×
                    </Button>
                  </div>
                  <div className="overflow-y-auto max-h-48">
                    <PropertyPanel
                      selectedNode={selectedNode}
                      onNodeUpdate={onNodeUpdate}
                      onNodeDelete={onNodeDelete}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Property Panel */}
          <div className="hidden lg:block flex-shrink-0 w-80 border-l border-gray-200 dark:border-gray-800">
            <PropertyPanel
              selectedNode={selectedNode}
              onNodeUpdate={onNodeUpdate}
              onNodeDelete={onNodeDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLModelBuilder;