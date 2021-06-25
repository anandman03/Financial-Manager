import React from "react";
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';

import "./style.css";

function SignInComponent(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleLogin() {
    if(email === '' || password === '') {
      return;
    }
    fetch(`/auth/signin?email=${email}&password=${password}`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      if(data.message === "Success") {
        props.history.push("/app/expense-tracker");
      }
    })
    .catch(error => {
      alert("Some Error Occured");
      setEmail("");
      setPassword("");
    });
  }

  function onEmailChange(event) {
    setEmail(String(event.target.value));
  }

  function onPasswordChange(event) {
    setPassword(String(event.target.value));
  }

  return (
    <div className="auth">
      <h2>Login</h2>
      <FormControl className="item">
          <InputLabel htmlFor="my-input">Email</InputLabel>
          <Input 
            id="my-input"
            type="email" 
            aria-describedby="my-helper-text" 
            value={email} 
            onChange={onEmailChange} 
          />
          <FormHelperText id="my-helper-text">* We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl className="item">
          <InputLabel htmlFor="my-input">Password</InputLabel>
          <Input 
            id="my-input" 
            aria-describedby="my-helper-text" 
            type="password" 
            value={password} 
            onChange={onPasswordChange} 
          />
          <FormHelperText id="my-helper-text">* Password (minimum length - 6)</FormHelperText>
      </FormControl>
      <Button className="item" variant="contained" color="primary" onClick={handleLogin}>
          Login
      </Button>
      <FormHelperText id="my-helper-text" className="item">
          New User? 
          <a href="/auth/signup"> Signup</a>
      </FormHelperText>
      {/* <h3 className="line-break">Continue with Google</h3> */}
      {/* <Button className="google-btn" variant="contained" color="primary" onClick={googleLogin}> */}
          {/* Login With Google */}
      {/* </Button> */}
  </div>
  );
};

export default SignInComponent;
