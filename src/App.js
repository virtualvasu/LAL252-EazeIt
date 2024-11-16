import React from 'react';
import './index.css'; // or './App.css' if you’ve set up the Tailwind directives there

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
  );
};

export default App;
