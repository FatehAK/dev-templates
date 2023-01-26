import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useRegisterSW } from 'virtual:pwa-register/react';
import IndexPage from 'pages/index-page/IndexPage';

const router = createBrowserRouter([
  {
    index: true,
    element: <IndexPage />,
  },
]);

const intervalMS = 60 * 60 * 1000; // periodically check sw for changes every 1 hr

const App = () => {

  // TODO: Remove below hook if app not a PWA
  useRegisterSW({
    onRegistered(sw) {
      if (sw) {
        setInterval(() => {
          sw.update();
        }, intervalMS);
      }
    },
  });

  return <RouterProvider router={router} />;
}

export default App;
