import React, { useEffect, useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../baseNode';
import { useStore } from '../store';

export const NoteNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currNote, setCurrNote] = useState(data.note ?? 'Enter note here...');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (data.note === undefined) {
      updateNodeField(id, 'note', 'Enter note here...');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = () => {
    updateNodeField(id, 'note', currNote);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handles = [{ type: 'source', position: Position.Right, id: 'output' }];

  return (
    <BaseNode id={id} label="Note" handles={handles}>
      <textarea
        value={currNote}
        onChange={(e) => {
          setCurrNote(e.target.value);
          setIsSaved(false);
        }}
        rows={3}
        style={{ width: '100%', resize: 'none', marginBottom: '8px' }}
      />
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
        {isSaved ? 'Saved! ✓' : 'Save Note'}
      </button>
    </BaseNode>
  );
};