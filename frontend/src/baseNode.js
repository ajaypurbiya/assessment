import React from 'react';
import { Handle } from 'reactflow';
import { FileIcon } from './FileIcon';

const getIconTypeFromLabel = (label) => {
  const lower = label?.toLowerCase() || '';
  if (lower.includes('input')) return 'customInput';
  if (lower.includes('output')) return 'customOutput';
  if (lower.includes('llm')) return 'llm';
  if (lower.includes('text')) return 'text';
  if (lower.includes('timer')) return 'timer';
  if (lower.includes('note')) return 'note';
  if (lower.includes('math')) return 'math';
  if (lower.includes('filter')) return 'filter';
  if (lower.includes('request')) return 'request';
  return 'file';
}

export const BaseNode = ({ id, label, style, children, className, handles = [] }) => {
  return (
    <div className={`node-wrapper ${className || ''}`} style={style}>
      <div className="node-header">
        <FileIcon type={getIconTypeFromLabel(label)} color="#6366f1" size={16} />
        <span>{label}</span>
      </div>
      <div className="node-content">
        {children}
      </div>
      {handles.map((handle, index) => (
        <Handle
          key={`${id}-handle-${index}`}
          type={handle.type}
          position={handle.position}
          id={handle.id ? `${id}-${handle.id}` : undefined}
          style={handle.style}
        />
      ))}
    </div>
  );
}