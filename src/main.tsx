import '@/index.css';

import { ChakraProvider, ColorModeScript, Spinner } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '@/context/auth';
import { LayoutProvider } from '@/context/layout';
import { SettingsProvider } from '@/context/settings';
import { SnipsProvider } from '@/context/snips';
import theme from '@/theme';

const el = document.getElementById('root');
const isEmbed = window.location.pathname.startsWith('/embed');

window.React = React;

const App = React.lazy(() => import('@/App'));
const EmbedPage = React.lazy(() => import('@/pages/EmbedPage/EmbedPage'));

if (el) {
  ReactDOM.createRoot(el).render(
    <React.StrictMode>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        {!isEmbed ? (
          <HelmetProvider>
            <BrowserRouter>
              <SettingsProvider>
                <AuthProvider>
                  <SnipsProvider>
                    <LayoutProvider>
                      <Suspense fallback={<Spinner />}>
                        <App />
                      </Suspense>
                    </LayoutProvider>
                  </SnipsProvider>
                </AuthProvider>
              </SettingsProvider>
            </BrowserRouter>
          </HelmetProvider>
        ) : (
          <Suspense fallback={<Spinner />}>
            <EmbedPage />
          </Suspense>
        )}
      </ChakraProvider>
    </React.StrictMode>,
  );
}
