import 'app/styles/index.scss';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'app/App';
import { createRoot } from 'react-dom/client';
import { StoreProvider } from 'app/providers/StoreProvider';
import { PrimeReactProvider } from 'primereact/api';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';

const container = document.getElementById('root');
if (!container) {
    throw new Error('Контейнер root не найден. Не удалось вмонтировать приложение');
}

const root = createRoot(container);
root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <PrimeReactProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </PrimeReactProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);
