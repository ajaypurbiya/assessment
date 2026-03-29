// draggableNode.js
import { FileIcon } from './FileIcon';
import { useCallback } from 'react';
import { useStore } from './store';

export const DraggableNode = ({ type, label }) => {
    const addNode = useStore((state) => state.addNode);
    const getNodeID = useStore((state) => state.getNodeID);

    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const handleClick = useCallback(() => {
        const nodeID = getNodeID(type);
        const newNode = {
            id: nodeID,
            type,
            // Spawns the node in a visible area (randomized slightly so multiple clicks don't perfectly overlap)
            position: { x: Math.random() * 50 + 150, y: Math.random() * 50 + 150 },
            data: { id: nodeID, nodeType: type }
        };
        addNode(newNode);
    }, [addNode, getNodeID, type]);
  
    return (
      <div
        className={`draggable-node ${type}`}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        onClick={handleClick}
        style={{ cursor: 'grab' }}
        draggable
      >
          <FileIcon type={type} color="#6366f1" size={16} />
          <span>{label}</span>
      </div>
    );
  };
  