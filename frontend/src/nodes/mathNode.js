import React, { useEffect, useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../baseNode';
import { useStore } from '../store';

export const MathNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [operation, setOperation] = useState(data.operation ?? 'add');
  const [inputA, setInputA] = useState(data.inputA ?? 0);
  const [inputB, setInputB] = useState(data.inputB ?? 0);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (data.operation === undefined) {
      updateNodeField(id, 'operation', 'add');
    }
    if (data.inputA === undefined) updateNodeField(id, 'inputA', 0);
    if (data.inputB === undefined) updateNodeField(id, 'inputB', 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = () => {
    updateNodeField(id, 'operation', operation);
    updateNodeField(id, 'inputA', inputA);
    updateNodeField(id, 'inputB', inputB);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: 'a', style: { top: '32%' } },
    { type: 'target', position: Position.Left, id: 'b', style: { top: '55%' } },
    { type: 'source', position: Position.Right, id: 'result' }
  ];

  const labelStyle = { display: 'block', fontSize: '12px', marginBottom: '2px', color: '#555' };
  const inputStyle = { width: '100%', marginBottom: '8px', padding: '4px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' };

  return (
    <BaseNode id={id} label="Math" handles={handles}>
      <label style={labelStyle}>
        Value A:
        <input type="number" value={inputA} onChange={(e) => { setInputA(Number(e.target.value)); setIsSaved(false); }} style={inputStyle} />
      </label>
      
      <label style={labelStyle}>
        Value B:
        <input type="number" value={inputB} onChange={(e) => { setInputB(Number(e.target.value)); setIsSaved(false); }} style={inputStyle} />
      </label>

      <label style={labelStyle}>
        Operation:
        <select 
          value={operation} 
          onChange={(e) => {
            setOperation(e.target.value);
            setIsSaved(false);
          }} 
          style={inputStyle}
        >
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (-)</option>
          <option value="multiply">Multiply (*)</option>
          <option value="divide">Divide (/)</option>
        </select>
      </label>
      <button 
        onClick={handleSave} 
        style={{ 
          width: '100%', 
          cursor: 'pointer', 
          backgroundColor: isSaved ? '#10b981' : '#6366f1', 
          color: 'white', 
          border: 'none', 
          padding: '6px 0', 
          borderRadius: '4px',
          transition: 'background-color 0.2s'
        }}
      >
        {isSaved ? 'Saved! ✓' : 'Save Operation'}
      </button>
    </BaseNode>
  );
};