import React, { useEffect } from 'react'
import axios from 'axios';

function LandingPage() {
  const URL = "http://localhost:5000/api/test";

  useEffect(() => {
    
  axios.get(URL).then(response => console.log(response));

  }, [])
  return (
    <div>
      landingpage
    </div>
  )
}

export default LandingPage
