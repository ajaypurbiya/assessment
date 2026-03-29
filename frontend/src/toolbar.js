// toolbar.js

import { DraggableNode } from './draggableNode';
import { useStore } from './store';
import { SubmitButton } from './submit';

export const PipelineToolbar = () => {
    const theme = useStore((state) => state.theme);
    const toggleTheme = useStore((state) => state.toggleTheme);
    const clearCanvas = useStore((state) => state.clearCanvas);

    return (
        <div className="pipeline-toolbar">
            <div className="toolbar-nodes">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='timer' label='Timer' />
                <DraggableNode type='note' label='Note' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='request' label='Request' />
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button className="theme-toggle-btn" onClick={clearCanvas} title="Clear the entire canvas">
                    🗑️ Clear
                </button>
                <button className="theme-toggle-btn" onClick={toggleTheme}>
                    {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
                </button>
                <SubmitButton />
            </div>
        </div>
    );
};
