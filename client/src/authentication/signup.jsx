import React from "react";
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';

import "./style.css";

function SignInComponent(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSignup() {
    fetch(`/auth/signup?email=${email}&password=${password}`, { method: "POST" })
    .then(response => {
      if(response.ok) {
        return response.json();
      }
    })
    .then(data => {
      console.log(data);
      if(data.message === "Success") {
        props.history.push("/auth/signin");
      }
      else {
        alert("Email/Password not correct type");
      }
    })
    .catch(error => {
      alert("Some Error Occured");
      setName("");
      setEmail("");
      setPassword("");
    });
  }

  function onChange(event, setter) {
    setter(String(event.target.value));
  }

  return (
    <div className="auth"> 
      <h2>Signup</h2>
      <FormControl className="item">
        <InputLabel htmlFor="my-input">Name</InputLabel>
        <Input 
          id="my-input"
          type="text" 
          aria-describedby="my-helper-text" 
          value={name} 
          onChange={event => onChange(event, setName)} 
        />
        <FormHelperText id="my-helper-text">* You have a nice name.</FormHelperText>
      </FormControl>
      <FormControl className="item">
        <InputLabel htmlFor="my-input">Email</InputLabel>
        <Input 
          id="my-input"
          type="email" 
          aria-describedby="my-helper-text" 
          value={email} 
          onChange={event => onChange(event, setEmail)} 
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
          onChange={event => onChange(event, setPassword)} 
        />
        <FormHelperText id="my-helper-text">* Password (minimum length - 6)</FormHelperText>
      </FormControl>
      <Button className="item" variant="contained" color="primary" onClick={handleSignup}>
        SignUp
      </Button>
      <FormHelperText id="my-helper-text" className="item">
        Already Have an account? 
        <a href="/auth/signin"> Login</a>
      </FormHelperText>
    </div>
  );
};

export default SignInComponent;
