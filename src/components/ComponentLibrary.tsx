import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ML_COMPONENTS } from '@/data/ml-components';
import { ComponentConfig } from '@/types/ml-types';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';

interface ComponentLibraryProps {
  onDragStart: (event: React.DragEvent, component: ComponentConfig) => void;
}

const ComponentLibrary = ({ onDragStart }: ComponentLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  const categories = Array.from(new Set(ML_COMPONENTS.map(comp => comp.category)));

  const filteredComponents = ML_COMPONENTS.filter(component =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getComponentsByCategory = (category: string) =>
    filteredComponents.filter(comp => comp.category === category);

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const ComponentItem = ({ component }: { component: ComponentConfig }) => (
    <Card
      className="cursor-pointer hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50/30 dark:hover:bg-blue-950/30 group"
      draggable
      onDragStart={(e) => onDragStart(e, component)}
    >
      <CardHeader className="pb-2 p-3">
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0 w-6 h-6 lg:w-8 lg:h-8 rounded-md bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-sm lg:text-lg group-hover:from-blue-100 group-hover:to-blue-200 dark:group-hover:from-blue-900 dark:group-hover:to-blue-800 transition-all duration-200">
            {component.icon}
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-xs lg:text-sm font-semibold truncate">{component.name}</CardTitle>
            <Badge variant="outline" className="text-xs mt-1 w-fit">
              {component.type}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 p-3 space-y-2">
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
          {component.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {component.inputs.length > 0 && (
            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
              ↓ {component.inputs.length}
            </Badge>
          )}
          {component.outputs.length > 0 && (
            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              ↑ {component.outputs.length}
            </Badge>
          )}
          {component.parameters.length > 0 && (
            <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
              ⚙ {component.parameters.length}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full lg:w-80 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col h-full">
      <div className="p-3 lg:p-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
        <h2 className="text-base lg:text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Component Library
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-sm"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <Tabs defaultValue="categories" className="p-3 lg:p-4">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="categories" className="text-sm">Categories</TabsTrigger>
            <TabsTrigger value="all" className="text-sm">All</TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="space-y-2">
            {categories.map(category => {
              const categoryComponents = getComponentsByCategory(category);
              if (categoryComponents.length === 0) return null;
              const isOpen = openCategories[category] ?? true;

              return (
                <Collapsible
                  key={category}
                  open={isOpen}
                  onOpenChange={() => toggleCategory(category)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-2 h-auto font-medium text-left hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {category} ({categoryComponents.length})
                      </span>
                      {isOpen ? (
                        <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4" />
                      ) : (
                        <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 mt-2">
                    {categoryComponents.map(component => (
                      <ComponentItem key={component.id} component={component} />
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </TabsContent>

          <TabsContent value="all" className="space-y-3">
            {filteredComponents.map(component => (
              <ComponentItem key={component.id} component={component} />
            ))}
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  );
};

export default ComponentLibrary;