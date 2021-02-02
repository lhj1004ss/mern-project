import React from 'react'
import './LandingPage.css';
import axios from 'axios';

function LandingPage(props) {

  const URL ='http://localhost:5000/api/users/logout'

    const onClickHandler = () => {
    axios.get(URL,"",{withCredentials: true}).then((res) => {
      if (res.data.success) {
        props.history.push("/login");
            console.log(res.data);

      } else {
        alert("failed to login");
      }
    });
  };

  return (
    <div className="landing-container">
      startPage
      <button onClick={onClickHandler}>Logout</button>
    </div>
  )
}

export default LandingPage
