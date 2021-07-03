import React from "react";
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';

import "./style.css";

function SignInComponent(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleLogin() {
    if(email === '' || password === '') {
      alert("Email/Password can't be NULL");
      return;
    }
    fetch(`/auth/signin?email=${email}&password=${password}`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      if(data.status === "error") throw new Error(data.message);
      else props.history.push("/app/expense-tracker");
    })
    .catch(error => {
      alert(error);
      setEmail("");
      setPassword("");
    });
  }

  function onChange(event, setter) {
    setter(String(event.target.value));
  }

  return (
    <div className="auth">
      <h2>Login</h2>
      <FormControl className="item">
          <InputLabel htmlFor="my-input">Email</InputLabel>
          <Input 
            id="my-input" 
            aria-describedby="my-helper-text" 
            type="email"
            value={email} 
            onChange={(event) => onChange(event, setEmail)} 
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
            onChange={(event) => onChange(event, setPassword)} 
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
  </div>
  );
};

export default SignInComponent;
