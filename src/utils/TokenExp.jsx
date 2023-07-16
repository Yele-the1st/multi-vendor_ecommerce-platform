import React, { useState, useEffect } from "react";

const TokenExp = () => {
  const [token, setToken] = useState("");
  const [tokenExpiration, setTokenExpiration] = useState(null);
  const [showExpiredModal, setShowExpiredModal] = useState(false);

  useEffect(() => {
    // Function to retrieve the token from the cookie
    const getTokenFromCookie = () => {
      // Implement code to retrieve the token from the cookie
      // and set it in the 'token' state variable

      const cookieToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      console.log(cookieToken);
      if (cookieToken) {
        setToken(cookieToken);
      }
    };

    // Decode the token and get the expiration value
    const getTokenExpiration = () => {
      if (token) {
        // Decode the token to access its payload
        const decodedToken = decodeToken(token);
        const { exp } = decodedToken;

        // Set the token expiration value in state
        setTokenExpiration(exp);

        // Check if the token is expired
        const isTokenExpired = isExpired(exp);

        // Show the modal if the token is expired
        if (isTokenExpired) {
          setShowExpiredModal(true);
        }
      }
    };

    // Function to decode the token
    const decodeToken = (token) => {
      // Implement code to decode the token and return the payload
      // You can use libraries like jwt-decode or implement your own logic
    };

    // Function to check if the token is expired
    const isExpired = (expiration) => {
      // Implement your logic to check if the expiration time has passed
      // Return true if the token is expired, false otherwise
    };

    getTokenFromCookie();
    getTokenExpiration();
  }, [token]);

  // Render your React components
  return (
    <div>
      {/* Render the token expiration value */}
      <p>Token Expiration: {tokenExpiration}</p>

      {/* Render the modal if showExpiredModal is true */}
      {showExpiredModal && (
        <div className="modal">
          <p>Session Expired</p>
        </div>
      )}

      {/* Your app content */}
    </div>
  );
};

export default TokenExp;
