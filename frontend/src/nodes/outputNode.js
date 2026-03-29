import React, { useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../baseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    if (data.outputName === undefined) {
      updateNodeField(id, 'outputName', id.replace('customOutput-', 'output_'));
    }
    if (data.outputType === undefined) {
      updateNodeField(id, 'outputType', 'Text');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handles = [{ type: 'target', position: Position.Left, id: 'value' }];

  return (
    <BaseNode id={id} label="Output" handles={handles}>
      <label>
        Name:
        <input
          type="text"
          value={data.outputName || ''}
          onChange={(e) => updateNodeField(id, 'outputName', e.target.value)}
        />
      </label>
      <label>
        Type:
        <select value={data.outputType || 'Text'} onChange={(e) => updateNodeField(id, 'outputType', e.target.value)}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
}