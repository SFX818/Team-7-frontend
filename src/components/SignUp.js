import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator"

//Component
import FormGroup from './common/FormGroup'
import ButtonSpinner from './common/ButtonSpinner'

//Helper
import { register } from '../services/auth.service'
import {resMessage} from '../utilities/functions.utilities'

import {login} from '../services/auth.service'

const axios = require('axios')

//Function given to react-validator
const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

//Function validates username
const vusername = (value) => {
    if (value.length <= 3 || value.length >= 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        )
    }
}

//Functions that validates password
const vpassword = (value) => {
    if(value.length < 6 || value.length >= 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        )
    }
}

//Function that validates email and checks if it is in the correct format
const vemail = (value) => {
    if(!isEmail(value)){
        return(
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        )
    }
}


const SignUp = (props) => {
    const form = useRef()
    const checkBtn = useRef()

    //
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [successful, setSuccessful] = useState(false)
    const [message, setMessage] = useState("")

    //grab what is entered as our username
    const onChangeUsername = (e) => {
        const username = e.target.value
        setUsername(username)
    }

    //Store the password in our password state
    const onChangePassword = (e) => {
        const password = e.target.value
        setPassword(password)
    }

    //Store the password in our password state
    const onChangeEmail = (e) => {
    const email = e.target.value
        setEmail(email)
    }

    const handleSignup = (e) => {
        e.preventDefault()

        setMessage("")
        setSuccessful(false)

        //validates all the fields
        form.current.validateAll()

        //validator stores errors and we can check if errors exist
        if(checkBtn.current.context._errors.length === 0){
            register(username, email, password).then(
                (response) => {
                    setMessage(response.data.message)
                    setSuccessful(true)
                    
                    //if successful, login the new user and redirect to home page
                    login(username, password).then(
                        () => {
                            props.history.push("/profile")
                            window.location.reload()
                        }
                    )
                },
                (error) => {
                    setMessage(resMessage(error))
                    setSuccessful(false)
                }
            )
        }
    }


    console.log(username, password, email)
    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Form onSubmit={handleSignup} ref={form}>
                    <FormGroup text="username">
                        <Input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required, vusername]}
                        />
                    </FormGroup>
                    <FormGroup text="email">
                        <Input
                            type="text"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={onChangeEmail}
                            validations={[required, vemail]}
                        />
                    </FormGroup>
                    <FormGroup text="password">
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required, vpassword]}
                        />
                    </FormGroup>
                    <ButtonSpinner text="Sign Up" />
                    {/* set up loader if you want later */}
                    {/* <ButtonSpinner text="Sign Up" loading={successful} /> */}
                    {/* <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Signup</span>
                        </button> 
                    </div> */}
                    {message && (
                        <div className="form-group">
                            <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    {/*needs to be used for react validation to submit the form */}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    )
}

export default SignUp