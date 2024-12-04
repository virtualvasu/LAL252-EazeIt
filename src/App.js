import React from 'react';
import './index.css'; // or './App.css' if you’ve set up the Tailwind directives there
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home, { loader as homeLoader } from './components/pages/Home';  // Make sure you export loader from Home
import Quiz, { loader as quizLoader } from './components/pages/Quiz';
import Music, { loader as musicLoader } from './components/pages/Music';
import Video, { loader as videoLoader } from './components/pages/Video';
import UserProfile, { loader as profileLoader } from './components/pages/Profile';
import Techniques from './components/pages/Techniques'; // Import Techniques page
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
    loader: quizLoader,
  },
  {
    path: "/music",
    element: <Music />,
    loader: musicLoader,
  },
  {
    path: "/video",
    element: <Video />,
    loader: videoLoader,
  },
  {
    path: "/profile",
    loader: profileLoader,
    element: <UserProfile />,
  },
  {
    path: "/techniques", // Add Techniques route
    element: <Techniques />,
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
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
};

export default App;
