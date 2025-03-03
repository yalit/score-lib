import { createRoot } from 'react-dom/client';
import App from "./scripts/App";
import Home from "./scripts/pages/home/Home";

// Render your React component instead
const root = createRoot(document.getElementById('app')!);
root.render(<App><Home /></App>);

