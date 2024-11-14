import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import AuthRoute from './util/AuthRoute';
import { AuthProvider } from './context/Auth';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';
import UserProfile from './pages/UserProfile';
import MenuBar from './components/MenuBar';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="container mx-auto px-4">
          <MenuBar user={null} logout={function (): void {
            throw new Error('Function not implemented.');
          } } isDarkTheme={false} toggleTheme={function (): void {
            throw new Error('Function not implemented.');
          } } />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />
            <Route
              path="/register"
              element={
                <AuthRoute>
                  <Register />
                </AuthRoute>
              }
            />
            <Route path="/posts/:postId" element={<SinglePost />} />
            <Route path="/posts/edit/:postId" element={<SinglePost  />} />
            <Route path="/user/:userId" element={<UserProfile />} />
          </Routes>
          
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
