import React, { useState } from "react";
import {Form, Input, Image, Button, Icon}  from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin, signup } from "../../actions/auth";

const Auth = () => {
  const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setError] = useState({
    firstName: false,
    lastName:false,
    email: false,
    password: false,
    confirmPassword: false
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      if(checkFormSignUp()){
      dispatch(signup(formData, navigate));
      } 
    } else {
      if(checkFormSignIn()){
      dispatch(signin(formData, navigate));
      }
    }
  };
  

  const checkFormSignIn = () => {
    var values = formData;
    var checkedErrors = errors;
    var valid = true;
    if (values.email === "" ){
      valid = false;
      checkedErrors.email = true;
    } else {
      checkedErrors.email = false;
    }
    if (values.password === ""){
      valid = false;
      checkedErrors.password = true;
    } else {
      checkedErrors.password = false;
    }
    setError({...checkedErrors})
    return valid;
  }


  const checkFormSignUp = () => {
    var values = formData;
    var checkedErrors = errors;
    var valid = true;

    if (values.firstName === "" ){
      console.log('here')
      valid= false;
      checkedErrors.firstName = true;
    } else {
      checkedErrors.firstName = false;
    }
    if (values.lastName === ""){
      console.log('here2')
      valid = false;
      checkedErrors.lastName = true;
    } else {
      checkedErrors.lastName = false;
    }
    if (values.email === "" ){
      valid = false;
      checkedErrors.email = true;
    } else {
      checkedErrors.email = false;
    }
    if (!emailRegex.test(values.email)){
      valid = false;
      checkedErrors.email = true;
    } else {
      checkedErrors.email = false;
    }
    if (values.password === ""){
      valid = false;
      checkedErrors.password = true;
    } else {
      checkedErrors.password = false;
    }
    if (values.password !== values.confirmPassword || values.confirmPassword === ''){
      valid = false;
      checkedErrors.confirmPassword = true;
    } else {
      checkedErrors.confirmPassword = false;
    }

    if (!passwordRegex.test(values.password)){
      valid = false;
      checkedErrors.password = true;
    } else {
      checkedErrors.password = false;
    }
    setError({...checkedErrors})
    console.log(checkedErrors)
    return valid;
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };
  return (
      <Form className="auth-container" onSubmit={handleSubmit} >
        <div className="title-icon">
          <Image>
        <Icon name='lock' /> 
        </Image>
        {isSignup ? "Iscriviti" : "Accedi"}</div>
         
            {isSignup && (
              <Form.Group widths='equal'>          
              <Form.Field
              error={errors.firstName}
              control={Input}
              placeholder='Nome'
              name='firstName'
              value={FormData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
             <Form.Field
              control={Input}
              error={errors.lastName}
              placeholder='Cognome'
              name='lastName'
              value={FormData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
            </Form.Group>
            )}
            <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              error={errors.email}
              placeholder='e-mail'
              name='email'
              value={FormData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            </Form.Group>
            <Form.Group widths='equal'>
            <Form.Field
            type='password' 
              control={Input}
              error={errors.password}
              placeholder='Password'
              name='password'
              value={FormData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            {isSignup && (
                          <Form.Field
                          type='password' 
                          control={Input}
                          error={errors.confirmPassword}
                          placeholder='Conferma password'
                          name='confirmPassword'
                          value={FormData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
            )}
            </Form.Group>
          <Form.Group >
          <Form.Field control={Button} type='submit'>
            {isSignup ? "Iscriviti" : "Accedi"}
          </Form.Field> 
          
            <Form.Field className="have-account" onClick={switchMode}>
              {isSignup
                ? "Hai già un account? Accedi"
                : "Non hai un account? Iscriviti"}
            </Form.Field>
            </Form.Group>
      </Form>
  );
};

export default Auth;
