import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import {decodeGoogleToken} from '../utils' ;  // Import the loader function

const CLIENT_ID = process.env.CLIENT_ID; // Replace with your Google Client ID in .env

const Login = () => {
  const navigate = useNavigate();

  const handleSuccess = (response) => {
    console.log('Google OAuth Success:', response);

    try {
      const credential = response.credential;

      // Use the loader function to decode the Google ID token
      const userInfo = decodeGoogleToken(credential);

      if (userInfo) {
        console.log('Decoded User Info:', userInfo);

        // Store user information and token securely (localStorage or any other method)
        localStorage.setItem('user', JSON.stringify(userInfo));
        localStorage.setItem('authToken', credential);

        // Navigate to home page
        navigate('/');
      } else {
        alert('Failed to decode user information');
      }
    } catch (error) {
      console.error('Error processing Google OAuth response:', error);
      alert('Authentication failed. Please try again.');
    }
  };

  const handleError = () => {
    console.log('Google OAuth Error');
    alert('Authentication failed. Please try again.');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-slate-900 text-white py-4 px-6">
          <h2 className="text-2xl font-bold text-center">EazeIt - The stress relief app</h2>
        </div>
        <div className="p-6">
          <h1 className="text-xl font-semibold text-slate-900 mb-6 text-center">Login to Your Account</h1>
          <div className="mb-6">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              render={({ onClick }) => (
                <button
                  onClick={onClick}
                  className="w-full bg-slate-900 text-white py-2 px-4 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition duration-200 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                    />
                  </svg>
                  Sign in with Google
                </button>
              )}
            />
          </div>
          <div className="text-center text-sm text-slate-600">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </div>
        </div>
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">IIT Bhilai</h3>
      </div>
    </div>
  );
};

export default Login;
