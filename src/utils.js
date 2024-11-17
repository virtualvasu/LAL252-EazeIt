// utils/verifyToken.js

export function verifyToken() {
    const token = localStorage.getItem('authToken'); 
    console.log('hello')// Get the token from localStorage (or cookies, etc.)
  
    if (!token) {
      throw new Error('No token found');
    }
  
    try {
      // Decode the JWT token and verify expiration (you can also validate against a public key here)
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT
      if (decodedToken.exp * 1000 < Date.now()) {  // Check if the token is expired
        throw new Error('Token has expired');
      }
      return decodedToken; // Return the decoded token (user info)
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
  


export const decodeGoogleToken = (token) => {
    try {
      // Split the token into three parts (header, payload, signature)
      const base64Url = token.split('.')[1];
      
      // Decode the payload from base64
      const decodedPayload = JSON.parse(atob(base64Url));
  
      // Extract the relevant user info (you can add more fields if needed)
      const userInfo = {
        email: decodedPayload.email,
        name: decodedPayload.name,
        picture: decodedPayload.picture,
        sub: decodedPayload.sub, // This is the Google user ID
      };
  
      return userInfo;
    } catch (error) {
      console.error("Error decoding Google ID token:", error);
      return null;
    }
  };