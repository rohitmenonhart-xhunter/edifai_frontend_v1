import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Error handling for React 18
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(rootElement);

try {
  root.render(<App />);
} catch (error) {
  console.error("Error rendering the application:", error);
  // Display a fallback UI
  root.render(
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      marginTop: '50px'
    }}>
      <h1>Something went wrong</h1>
      <p>The application failed to load. Please try refreshing the page.</p>
    </div>
  );
}
