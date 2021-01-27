import React from 'react'
import './LandingPage.css';
import axios from 'axios';

function LandingPage(props) {

  const URL ='/api/users/logout'

    const onClickHandler = () => {
    axios.get(URL).then((res) => {
    console.log(res.data);
      if (res.data.success) {
        props.history.push("/login");
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
