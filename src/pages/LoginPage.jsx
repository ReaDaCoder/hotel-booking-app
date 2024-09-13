import React from "react";
import {useNavigation, Link} from "react-router-dom";

export default function LoginPage(){
    function handleLogin(event){
        console.log(event)
    }
    return(
        <div className="login-container">
            <div class="grid-container">
  <div className="grid-item"><img src="swimming-pool.jpg" width="450px"/></div>
  <div class="grid-item"><form>
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
<a href="RegistrationPage">Don't have an account : Sign Up</a></div>
</div>
        </div>
    )
}