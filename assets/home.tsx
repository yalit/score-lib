import { createRoot } from 'react-dom/client';
import Home from "./scripts/pages/Home";

// Render your React component instead
const root = createRoot(document.getElementById('home')!);
root.render(<Home />);

