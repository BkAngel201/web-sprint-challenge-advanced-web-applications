import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const history = useHistory()
  const [formValues,setFormValues] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormValues( {
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axiosWithAuth()
      .post('/login', formValues)
      .then(res => {
        if(res.status === 200) {
          localStorage.setItem('AuthToken', res.data.payload)
          setFormValues({
            username: '',
            password: ''
          })
          history.push("/bubble-page")
        } else {
          localStorage.removeItem("AuthToken")
          setFormValues({
            username: '',
            password: ''
          })
        }
      })
      .catch(err => {
        console.log(err.message);
        localStorage.removeItem("AuthToken")
          setFormValues({
            username: '',
            password: ''
          })
      })
  }

  return (
    <>
    <form onSubmit={handleSubmit} className="login-form">
      <h1>Welcome to the Bubble App!</h1>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} value={formValues.username} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formValues.password} />
      <button type="submit">Login</button>
    </form>
      
      
    </>
  );
};

export default Login;
