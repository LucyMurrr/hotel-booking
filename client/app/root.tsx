/* eslint-disable max-len */
// import { useRef } from 'react';
import {
  // isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  // Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import './app.css';
import AuthProvider from './authContext';

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body>
      {children}
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
);

// eslint-disable-next-line react/function-component-definition
export default function App() {
  return (
    <div>
      {/* <AppHeader />
      </div>
      <div style={{ height: contentHeight, display: 'flex' }}>
        <Outlet />
      </div>
      <div ref={footerRef}>
        <AppFooter /> */}
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </div>
  );
}
export const HydrateFallback = () => (
  <div id="loading-splash">
    <div id="loading-splash-spinner" />
    <p>Loading, please waite...</p>
  </div>
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
  const message = 'Oops!';
  const details = 'Сьто-то отшатнулось.';
  let stack: string | undefined;

  // if (isRouteErrorResponse(error)) {
  //   message = error.status === 404 ? '404' : 'Error';
  //   details = error.status === 404
  //     ? 'The requested page could not be found.'
  //     : error.statusText || details;
  // } else if (import.meta.env.DEV && error && error instanceof Error) {
  //   details = error.message;
  //   stack = error.stack;
  // }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
};
