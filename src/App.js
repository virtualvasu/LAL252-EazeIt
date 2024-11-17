import React from 'react';
import './index.css'; // or './App.css' if you’ve set up the Tailwind directives there
<<<<<<< HEAD

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/pages/Home';
import Quiz from './components/pages/Quiz';
import Music from './components/pages/Music';
import Video from './components/pages/Video';
// import Profile from './components/pages/Profile';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <div className="flex-grow overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/music" element={<Music />} />
            <Route path="/video" element={<Video />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
          </Routes>
        </div>
        <Navigation />
      </div>
    </Router>
=======
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
    <GoogleOAuthProvider clientId="553309487978-poslsarvc6kmma0m9goc1tockhuk6b0b.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
>>>>>>> a1df5cac15ef6a6396fbd984bd6ae8ae4cf5fd95
  );
};

export default App;
