import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import IndexPage from 'pages/index-page/IndexPage';

const router = createBrowserRouter([
  {
    index: true,
    element: <IndexPage />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
