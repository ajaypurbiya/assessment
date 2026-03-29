import React, { useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../baseNode';
import { useStore } from '../store';

export const FilterNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    if (data.condition === undefined) {
      updateNodeField(id, 'condition', '');
    }
  }, [data.condition, id, updateNodeField]);

  const handles = [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'filtered' }
  ];

  return (
    <BaseNode id={id} label="Filter" handles={handles}>
      <label>
        Condition:
        <input
          type="text"
          value={data.condition || ''}
          onChange={(e) => updateNodeField(id, 'condition', e.target.value)}
        />
      </label>
    </BaseNode>
  );
};