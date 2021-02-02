import React,{ useState } from 'react';
import './RegisterPage.css';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/actions/user_action';

function RegisterPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmedPassword, setConfirmedPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
      case 'confirmedPassword':
        setConfirmedPassword(e.target.value);
        break;
      case 'firstName':
        setFirstName(e.target.value);
        break;
      case 'lastName':
        setLastName(e.target.value);
        break;
      default:
    }
  } 
  
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email, password, firstName, lastName);

    if(password !== ConfirmedPassword){
      return alert('Two Password Must Be a Match Each Other')
    }
    if(!email || !password || !firstName || !lastName || !ConfirmedPassword){
      return alert('Please Fill Out All Blanks');
    }

    let data ={ 
      email,
      password,
      firstName,
      lastName 
    };

    dispatch(registerUser(data)).then(res => {
      if(res.payload.success){
        props.history.push('/login');
      }else{
        alert("failed to sign up");
      }
    })
  }


  return (
  <div className="signup-container">
      <form className="login" onSubmit={submitHandler}>
        <label>Firstname</label>
        <input type="firstname" name="firstName" value={firstName} onChange={onChangeHandler}></input>
        <label>Lastname</label>
        <input type="lastname" name="lastName" value={lastName} onChange={onChangeHandler}></input>
        <label>E-mail</label>
        <input type="email" name="email" value={email} onChange={onChangeHandler}></input>
        <label>password</label>
        <input type="password" name="password" value={password} onChange={onChangeHandler}></input>
        <label>password</label>
        <input type="password" name="confirmedPassword" value={ConfirmedPassword} onChange={onChangeHandler}></input>
        <button className="signup-button">Sign Up</button>
      </form>
    </div>
  )
}

export default RegisterPage
