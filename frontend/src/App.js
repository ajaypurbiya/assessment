import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { useStore } from './store';
import { useEffect } from 'react';

function App() {
  const theme = useStore((state) => state.theme);
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="app-container">
      <PipelineToolbar />
      <PipelineUI />
    </div>
  );
}

export default App;
