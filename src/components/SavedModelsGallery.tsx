import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { SavedModel } from '@/types/ml-types';
import { useAuth } from '@/contexts/AuthContext';
import { getUserModelsFromFirebase, deleteModelFromFirebase } from '@/services/modelService';
import { Play, Trash2, Calendar, User, Loader2, FolderOpen } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

interface SavedModelsGalleryProps {
  onLoadModel: (model: SavedModel) => void;
}

export const SavedModelsGallery = ({ onLoadModel }: SavedModelsGalleryProps) => {
  const [savedModels, setSavedModels] = useState<SavedModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchSavedModels = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        const models = await getUserModelsFromFirebase(currentUser.uid);
        setSavedModels(models);
      } catch (error) {
        toast.error('Failed to load saved models');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedModels();
  }, [currentUser]);

  const handleLoadModel = (model: SavedModel) => {
    onLoadModel(model);
    toast.success(`Model "${model.name}" loaded successfully!`);
  };

  const handleDeleteModel = async (modelId: string, modelName: string) => {
    try {
      setDeleting(modelId);
      await deleteModelFromFirebase(modelId);
      setSavedModels(prev => prev.filter(model => model.id !== modelId));
      toast.success(`Model "${modelName}" deleted successfully!`);
    } catch (error) {
      toast.error('Failed to delete model');
      console.error(error);
    } finally {
      setDeleting(null);
    }
  };

  if (!currentUser) {
    return (
      <div className="text-center py-8">
        <FolderOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Sign in to access your models</h3>
        <p className="text-gray-500 mb-4">Create an account to save and manage your ML pipelines in the cloud</p>
        <Button onClick={() => window.location.href = '/auth'}>
          Sign In
        </Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Loading your saved models...</span>
      </div>
    );
  }

  if (savedModels.length === 0) {
    return (
      <div className="text-center py-8">
        <FolderOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No saved models yet</h3>
        <p className="text-gray-500">Build your first ML pipeline and save it to see it here</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {savedModels.map((model) => (
          <Card key={model.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg font-semibold truncate">{model.name}</CardTitle>
                  <CardDescription className="mt-1 line-clamp-2">
                    {model.description || 'No description provided'}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Model Stats */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  {model.nodes?.length || 0} Components
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {model.edges?.length || 0} Connections
                </Badge>
              </div>

              {/* Tags */}
              {model.tags && model.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {model.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {model.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{model.tags.length - 3} more
                    </Badge>
                  )}
                </div>
              )}

              {/* Metadata */}
              <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Updated {formatDistanceToNow(model.updatedAt, { addSuffix: true })}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  onClick={() => handleLoadModel(model)}
                  className="flex-1"
                >
                  <Play className="h-4 w-4 mr-1" />
                  Load
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={deleting === model.id}
                    >
                      {deleting === model.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Model</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{model.name}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteModel(model.id, model.name)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};
