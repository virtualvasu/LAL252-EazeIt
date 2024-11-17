import React from 'react';
import './index.css'; // or './App.css' if you’ve set up the Tailwind directives there
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home, { loader as homeLoader } from './components/pages/Home';  // Make sure you export loader from Home
import Quiz from './components/pages/Quiz';
import Music from './components/pages/Music';
import Video from './components/pages/Video';
import AuthCallback from './components/AuthCallback';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: homeLoader,  // Attach loader here
  },
  {
    path: "/quiz",
    element: <Quiz />,
  },
  {
    path: "/music",
    element: <Music />,
  },
  {
    path: "/video",
    element: <Video />,
  },
  {
    path: "/auth/callback",
    element: <AuthCallback />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
};

export default App;
