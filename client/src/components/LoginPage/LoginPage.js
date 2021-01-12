import React, { useState } from 'react'
import './LoginPage.css';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/user_action';

function LoginPage(props) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    const type = e.target.name;

    switch(type){
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
    }
  } 
  
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email,password);
    let data ={ email, password };
    dispatch(loginUser(data)).then(res => {
      if(res.payload.loginSuccess){
        props.history.push('/');
      }else{
        alert('failed to login');
      }
    })
  }

  return (
    <div className="login-container">
      <form className="login" onSubmit={submitHandler}>
        <label>E-mail</label>
        <input type="email" name="email" value={email} onChange={onChangeHandler}></input>
        <label>password</label>
        <input type="password" name="password" value={password} onChange={onChangeHandler}></input>
        <button className="login-button">Login</button>
      </form>
    </div>
  )
}

export default LoginPage
