import { createRoot } from 'react-dom/client';
import App from "./scripts/App";
import Score from "./scripts/pages/library/score/Score";

// Render your React component instead
const root = createRoot(document.getElementById('app')!);
root.render(<App><Score /></App>);
