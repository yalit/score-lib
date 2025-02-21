import { createRoot } from 'react-dom/client';
import App from "./scripts/App";
import Library from "./scripts/pages/library/Library";

// Render your React component instead
const root = createRoot(document.getElementById('app')!);
root.render(<App><Library /></App>);

