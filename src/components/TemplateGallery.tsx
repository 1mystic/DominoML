import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ML_TEMPLATES } from '@/data/ml-templates';
import { Template } from '@/types/ml-types';
import { Eye, Download } from 'lucide-react';

interface TemplateGalleryProps {
  onLoadTemplate: (template: Template) => void;
}

const TemplateGallery = ({ onLoadTemplate }: TemplateGalleryProps) => {
  const categories = Array.from(new Set(ML_TEMPLATES.map(template => template.category)));

  return (
    <div className="space-y-6">
      {categories.map(category => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ML_TEMPLATES.filter(template => template.category === category).map(template => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <Badge variant="outline" className="mt-2">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">Pipeline Overview:</div>
                    <div className="flex flex-wrap gap-1">
                      {template.pipeline.nodes.map((node, index) => (
                        <Badge key={node.id} variant="secondary" className="text-xs">
                          {node.data.label}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{template.name}</DialogTitle>
                          <DialogDescription>{template.description}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Pipeline Components:</h4>
                            <div className="space-y-2">
                              {template.pipeline.nodes.map(node => (
                                <div key={node.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                                  <Badge variant={
                                    node.type === 'data' ? 'default' :
                                    node.type === 'preprocessing' ? 'secondary' :
                                    node.type === 'model' ? 'destructive' : 'outline'
                                  }>
                                    {node.type}
                                  </Badge>
                                  <div>
                                    <div className="font-medium text-sm">{node.data.label}</div>
                                    <div className="text-xs text-gray-600">{node.data.description}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Connections:</h4>
                            <div className="text-sm text-gray-600">
                              {template.pipeline.edges.length} connections between components
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => onLoadTemplate(template)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Load
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateGallery;