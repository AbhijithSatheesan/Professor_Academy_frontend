import React from 'react';
import { useSelector } from 'react-redux';

const Tester = () => {
  const user = useSelector(state => state.user);

  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const decodedAccessToken = decodeToken(user.access);

  return (
    <div>
      <h2>Decoded Access Token:</h2>
      <pre>{JSON.stringify(decodedAccessToken, null, 2)}</pre>
    </div>
  );
};

export default Tester;