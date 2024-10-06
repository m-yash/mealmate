// src/components/home.js

import React from 'react';

const Home = () => {
    const email = localStorage.getItem('email');
  
    return (
      <div>
        <h2>Home Page</h2>
        {email ? <p>Welcome, {email}!</p> : <p>No user logged in</p>}
      </div>
    );
  };
  
  export default Home;