import { createRoot } from 'react-dom/client'
import {registerDefaultVariables} from 'jb-core/theme';
import App from './App.tsx'


registerDefaultVariables();

createRoot(document.getElementById('root')!).render(
    <App />
)
