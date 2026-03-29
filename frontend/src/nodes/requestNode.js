import React, { useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../baseNode';
import { useStore } from '../store';

export const RequestNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    if (data.method === undefined) {
      updateNodeField(id, 'method', 'GET');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handles = [
    { type: 'target', position: Position.Left, id: 'url' },
    { type: 'target', position: Position.Left, id: 'body', style: { top: '70%' } },
    { type: 'source', position: Position.Right, id: 'response', style: { top: '30%' } },
    { type: 'source', position: Position.Right, id: 'error', style: { top: '70%' } }
  ];

  return (
    <BaseNode id={id} label="Request" handles={handles}>
      <select value={data.method || 'GET'} onChange={(e) => updateNodeField(id, 'method', e.target.value)} style={{ width: '100%' }}>
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
      </select>
    </BaseNode>
  );
};