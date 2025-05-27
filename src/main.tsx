import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import {registerDefaultVariables} from 'jb-core/theme';
import App from './App.tsx'
import { store } from './store/store'


registerDefaultVariables();

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>
)
