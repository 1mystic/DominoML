import { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  ReactFlowInstance,
} from 'reactflow';
import MLNode from './MLNode';
import { MLNode as MLNodeType, ComponentConfig } from '@/types/ml-types';
import 'reactflow/dist/style.css';

const nodeTypes = {
  mlNode: MLNode,
};

interface FlowCanvasProps {
  nodes: MLNodeType[];
  edges: Edge[];
  onNodesChange: (nodes: MLNodeType[]) => void;
  onEdgesChange: (edges: Edge[]) => void;
  onNodeSelect: (node: MLNodeType | null) => void;
  selectedNodeId: string | null;
}

const FlowCanvas = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onNodeSelect,
  selectedNodeId
}: FlowCanvasProps) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  // Convert MLNode to ReactFlow Node format
  const reactFlowNodes: Node[] = nodes.map(node => ({
    id: node.id,
    type: 'mlNode',
    position: node.position,
    data: {
      ...node.data,
      type: node.type,
    },
    selected: selectedNodeId === node.id,
  }));

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        id: `e${edges.length + 1}`,
        source: params.source!,
        target: params.target!,
        sourceHandle: params.sourceHandle,
        targetHandle: params.targetHandle,
      };
      onEdgesChange([...edges, newEdge]);
    },
    [edges, onEdgesChange]
  );

  const onNodeDragStop = useCallback(
    (_event: React.MouseEvent | React.TouchEvent, node: Node) => {
      const updatedNodes = nodes.map(n =>
        n.id === node.id ? { ...n, position: node.position } : n
      );
      onNodesChange(updatedNodes);
    },
    [nodes, onNodesChange]
  );

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const mlNode = nodes.find(n => n.id === node.id);
      onNodeSelect(mlNode || null);
    },
    [nodes, onNodeSelect]
  );

  const onPaneClick = useCallback(() => {
    onNodeSelect(null);
  }, [onNodeSelect]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const componentData = event.dataTransfer.getData('application/reactflow');

      if (componentData && reactFlowBounds && reactFlowInstance) {
        const component: ComponentConfig = JSON.parse(componentData);
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const newNode: MLNodeType = {
          id: `${component.id}-${Date.now()}`,
          type: component.type,
          category: component.category,
          name: component.name,
          position,
          data: {
            label: component.name,
            description: component.description,
            parameters: component.parameters.reduce((acc, param) => {
              acc[param.name] = param.defaultValue;
              return acc;
            }, {} as Record<string, unknown>),
            inputs: component.inputs,
            outputs: component.outputs,
            type: component.type,
          },
        };

        onNodesChange([...nodes, newNode]);
      }
    },
    [reactFlowInstance, nodes, onNodesChange]
  );

  return (
    <div className="flex-1 h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={reactFlowNodes}
        edges={edges}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            switch (node.data?.type) {
              case 'data': return '#dbeafe';
              case 'preprocessing': return '#dcfce7';
              case 'model': return '#e9d5ff';
              case 'evaluation': return '#fed7aa';
              default: return '#f3f4f6';
            }
          }}
        />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;