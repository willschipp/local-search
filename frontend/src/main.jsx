import { createRoot } from 'react-dom/client'

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";
import "@blueprintjs/table/lib/css/table.css";

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <App />,
)
