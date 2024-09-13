import React from "react";

export default function RegistrationPage(){
    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    
      const [error, setError] = useState("");
    
      function handleInputChange(ev) {
        const { name, value } = ev.target;
        setUser((prevUser) => ({
          ...prevUser,
          [name]: value,
        }));
      }
    
      function AddUser(ev) {
        ev.preventDefault();
        
      
        if (user.password !== user.confirmPassword) {
          setError("Passwords do not match!");
          return;
        }
        
      
        setError("");
    
    
        console.log("User registered:", user);
    
        setUser({
          name: "",
          surname: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    
    return(
        <div>
            <div className="signup-box">
      <h1>Sign up</h1>
      <form onSubmit={AddUser}>
        <input
          type="text"
          name="name"
          placeholder="First Name"
          value={user.name}
          onChange={handleInputChange}
          required
        /><br/>
        <input
          type="text"
          name="surname"
          placeholder="Last Name"
          value={user.surname}
          onChange={handleInputChange}
          required
        /><br/>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleInputChange}
          required
        /><br/>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleInputChange}
          required
        /><br/>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={user.confirmPassword}
          onChange={handleInputChange}
          required
        /><br/>
        <div className="card">
                                <img src="https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1" alt="User" width="150px"/>
                                <input type="file" accept="image/JPEG, image/png, image/jpg" id="input-file" />
                                <label htmlFor="input-file" id="update-img">Update</label>
                            </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
        </div>
    );
}