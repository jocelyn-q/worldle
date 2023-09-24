import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, Outlet, createHashRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Flag from './components/flag';
import Shape from './components/shape';

import './index.css';

const router = createHashRouter([
  {
    path: '/',
    element: (
      <div className="App">
        <nav>
          <a href="#/flag">Flag</a>
          <a href="#/shape">Shape</a>
        </nav>
        <App />
        <Outlet />
      </div>
    ),
    children: [
      {
        path: '/flag',
        element: <Flag countryUrl={'1'} />,
      },
      {
        path: '/shape',
        element: <Shape countryUrl={'2'} />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
