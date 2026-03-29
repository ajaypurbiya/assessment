import React, { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../baseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [handles, setHandles] = useState([]);

  useEffect(() => {
    if (data.text === undefined) {
      updateNodeField(id, 'text', '{{input}}');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Dynamically create handles based on {{variables}}
    const text = data.text || '';
    const matches = [...text.matchAll(/{{(.*?)}}/g)];
    const newHandles = matches.map((match, idx) => ({
        type: 'target', position: Position.Left, id: match[1], style: { top: `${(idx + 1) * 20}%` }
    }));
    newHandles.push({ type: 'source', position: Position.Right, id: 'output' });
    setHandles(newHandles);
  }, [data.text]);

  return (
    <BaseNode id={id} label="Text" handles={handles}>
      <label>
        Text:
        <textarea
          value={data.text || ''}
          onChange={(e) => updateNodeField(id, 'text', e.target.value)}
          style={{ width: '100%', resize: 'vertical' }}
        />
      </label>
    </BaseNode>
  );
}