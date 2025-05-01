import { createRoot } from 'react-dom/client';
import App from "./scripts/App";
import Listing from "./scripts/pages/listing/Listing";

// Render your React component instead
const root = createRoot(document.getElementById('app')!);
root.render(<App><Listing /></App>);

