import React, { useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../baseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    if (data.inputName === undefined) {
      updateNodeField(id, 'inputName', id.replace('customInput-', 'input_'));
    }
    if (data.inputType === undefined) {
      updateNodeField(id, 'inputType', 'Text');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handles = [{ type: 'source', position: Position.Right, id: 'value' }];

  return (
    <BaseNode id={id} label="Input" handles={handles}>
      <label>
        Name:
        <input
          type="text"
          value={data.inputName || ''}
          onChange={(e) => updateNodeField(id, 'inputName', e.target.value)}
        />
      </label>
      <label>
        Type:
        <select value={data.inputType || 'Text'} onChange={(e) => updateNodeField(id, 'inputType', e.target.value)}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
}