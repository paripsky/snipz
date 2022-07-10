import '@/App.css';

import { Spinner } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import DefaultLayout from '@/layouts/DefaultLayout';
// import Tabs from '@/components/Tabs';

const SnipPage = React.lazy(() => import('@/pages/SnipPage'));
const SettingsPage = React.lazy(() => import('@/pages/SettingsPage'));
const LoginPage = React.lazy(() => import('@/pages/Auth/LoginPage'));
const SignUpPage = React.lazy(() => import('@/pages/Auth/SignUpPage'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<>index</>} />
        <Route
          path="snip/:snipId"
          element={
            <Suspense fallback={<Spinner />}>
              <SnipPage />
            </Suspense>
          }
        />
        <Route
          path="settings"
          element={
            <Suspense fallback={<Spinner />}>
              <SettingsPage />
            </Suspense>
          }
        />
        <Route
          path="login"
          element={
            <Suspense fallback={<Spinner />}>
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          path="signup"
          element={
            <Suspense fallback={<Spinner />}>
              <SignUpPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
