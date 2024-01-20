import React from "react";
import '../styles/global.css';

function LogIn() {
  return (
    <div className='gray-div'>
      <h1>WELCOME!</h1>
      <p>Sign in to continue to Group Planning App.</p>
      <button><a href="http://localhost:5000/google">Sign in with Google</a></button>
    </div>
  );
}

export default LogIn