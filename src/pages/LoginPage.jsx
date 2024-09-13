import React, {useState, useEffect} from 'react';
import {useNavigation, Link} from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(){
        createUserWithEmailAndPassword(auth, data.email, data.password).then(
            (response) => {
              console.log(response.user);
            }
          );
    }
    return(
        <div className="login-container">
            <div className="grid-container">
  <div className="grid-item"><img src="swimming-pool.jpg" width="450px"/></div>
  <div className="grid-item"><form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="inputPassword1" />
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="check1" />
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleLogin}>Submit</button>
</form>
<Link to="RegistrationPage">Don't have an account : Sign Up</Link></div>
</div>
        </div>
    )
}