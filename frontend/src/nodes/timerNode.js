import React, { useState, useEffect, useCallback } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../baseNode';
import { useStore } from '../store';

export const TimerNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [remaining, setRemaining] = useState(data.duration ?? 1000);
  const [isRunning, setIsRunning] = useState(false);

  // Initialize duration in the store if it's not set
  useEffect(() => {
    if (data.duration === undefined) {
      updateNodeField(id, 'duration', 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When the duration input changes, update the timer's display if not running
  useEffect(() => {
    if (!isRunning) {
      setRemaining(data.duration ?? 1000);
    }
  }, [data.duration, isRunning]);

  // The core countdown logic
  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const intervalId = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 100) {
          clearInterval(intervalId);
          setIsRunning(false);
          return 0; // Timer finished
        }
        return prev - 100;
      });
    }, 100); // Update every 100ms

    return () => clearInterval(intervalId); // Cleanup on unmount or when isRunning changes
  }, [isRunning]);

  const handleStart = useCallback(() => {
    setRemaining(data.duration ?? 1000); // Reset timer to full duration
    setIsRunning(true);
  }, [data.duration]);

  const handleStop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const handles = [
    { type: 'target', position: Position.Left, id: 'trigger' },
    { type: 'source', position: Position.Right, id: 'timeout' }
  ];

  return (
    <BaseNode id={id} label="Timer" handles={handles}>
      <label>
        Duration (ms):
        <input
          type="number"
          value={data.duration ?? 1000}
          onChange={(e) => updateNodeField(id, 'duration', parseInt(e.target.value, 10) || 0)}
          disabled={isRunning}
        />
      </label>
      <div className="timer-display" style={{ margin: '10px 0', fontSize: '1.5em', textAlign: 'center', fontFamily: 'monospace' }}>
        {(remaining / 1000).toFixed(1)}s
      </div>
      {!isRunning ? (
        <button onClick={handleStart} style={{ width: '100%', cursor: 'pointer' }}>
          Start
        </button>
      ) : (
        <button onClick={handleStop} style={{ width: '100%', cursor: 'pointer', backgroundColor: '#f44336', color: 'white', border: 'none', padding: '4px 0', borderRadius: '4px' }}>
          Stop
        </button>
      )}
    </BaseNode>
  );
};