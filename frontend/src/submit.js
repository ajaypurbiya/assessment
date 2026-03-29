// submit.js
import shallow from 'zustand/shallow';
import { useState } from 'react';
import { useStore } from './store';
import { FileIcon } from './FileIcon';

export const SubmitButton = () => {
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges
    }), shallow);

    const [isOpen, setIsOpen] = useState(false);
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const closeModal = () => {
        setIsOpen(false);
        // Use a timeout to allow for fade-out animations before clearing content
        setTimeout(() => {
            setResponse(null);
            setError(null);
        }, 300);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null); // Reset error state on new submission
        try {
            // Adjust the URL if your backend is running on a different port/route
            const apiUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/pipelines/parse';
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges })
            });
            
            if (!response.ok) {
                // Try to parse a JSON error message from the backend for more detail
                const errorData = await response.json().catch(() => null);
                const errorMessage = errorData?.detail || `Backend returned an error: ${response.status} ${response.statusText}`;
                throw new Error(errorMessage);
            }

            const data = await response.json();
            
            // Store the success response data and open the custom modal
            setResponse(data);
            setIsOpen(true);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            // Store the error message and open the modal to display it
            setError(error.message || 'An unknown error occurred. Is the backend running?');
            setIsOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button className="submit-btn" type="submit" onClick={handleSubmit} disabled={isLoading}>
                <FileIcon type="play" color="white" size={18} />
                {isLoading ? 'Running...' : 'Run Pipeline'}
            </button>

            {/* Beautiful Custom Modal Overlay */}
            {isOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{error ? 'Pipeline Error' : '🚀 Pipeline Analysis'}</h3>
                            <button className="modal-close" onClick={closeModal}>✕</button>
                        </div>
                        <div className="modal-body">
                            {error ? (
                                <div className="error-message">{error}</div>
                            ) : (
                                <>
                                    <div className="stat-row">
                                        <span>Number of Nodes:</span>
                                        <span className="stat-value">{response?.num_nodes}</span>
                                    </div>
                                    <div className="stat-row">
                                        <span>Number of Edges:</span>
                                        <span className="stat-value">{response?.num_edges}</span>
                                    </div>
                                    <div className="stat-row">
                                        <span>Is Directed Acyclic Graph?</span>
                                        <span className="stat-value">{response?.is_dag ? '✅ Yes' : '❌ No'}</span>
                                    </div>
                                </>
                            )}
                        </div>
                        <button className="modal-ok-btn" onClick={closeModal}>{error ? 'Close' : 'Awesome!'}</button>
                    </div>
                </div>
            )}
        </>
    );
}
