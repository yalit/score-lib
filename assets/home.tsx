import { createRoot } from 'react-dom/client';
import Home from "./scripts/pages/Home";
import App from "./scripts/components/App";

// Render your React component instead
const root = createRoot(document.getElementById('home')!);
root.render(<App><Home /></App>);

