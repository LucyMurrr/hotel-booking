import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import React, { useEffect, useRef, useState } from 'react';

import type { Route } from './+types/root';
import './app.css';
import AppHeader from './src/components/header/header.component.tsx 16-54-30-927';
import AppFooter from './src/components/footer/footer.component';
import BaseLayout from './routes/baseLayout';
// import BaseLayout from './routes/baseLayout.component';

// export const links: Route.LinksFunction = () => [
//   { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
//   {
//     rel: 'preconnect',
//     href: 'https://fonts.gstatic.com',
//     crossOrigin: 'anonymous',
//   },
//   {
//     rel: 'stylesheet',
//     // eslint-disable-next-line max-len
//     href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
//   },
// ];

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
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<string>('auto');

  useEffect(() => {
    if (headerRef.current && footerRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      const footerHeight = footerRef.current.offsetHeight;
      const totalHeight = headerHeight + footerHeight;

      setContentHeight(`calc(100% - ${String(totalHeight)}px)`);
    }
  }, []);

  return (
    <>
      <div ref={headerRef}>
        {/* <AppHeader />
      </div>
      <div style={{ height: contentHeight, display: 'flex' }}>
        <Outlet />
      </div>
      <div ref={footerRef}>
        <AppFooter /> */}
        <BaseLayout />
      </div>
    </>
  );
}
// export const HydrateFallback = () => (
//   <div id="losading-splash">
//     <div id="loading-splash-spinner" />
//     <p>Losding, please waite...</p>
//   </div>
// );

export const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404
      ? 'The requested page could not be found.'
      : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

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
