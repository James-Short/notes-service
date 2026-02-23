import './LogInPage.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function LogInPage(){
    const navigate = useNavigate();

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    function submitLoginInfo(){
        axios.post('http://localhost:8080/users/signIn', {
            email: emailInput,
            password: passwordInput
        }, {withCredentials: true, validateStatus: () => true})
        .then(res => {
            if(res.status === 202)
                navigate('/');
            else
                alert("Email or password is incorrect");
        })
        .catch(err => {alert("Some error occured")})
        setEmailInput("");
        setPasswordInput("");
    }

    return(
        <div className='login-page-container'>
            <button className='signup-redirect-button' onClick={() => navigate("/signup")}>Sign Up</button>
            <div className='login-input-container'>
                <h1 className='login-input-header'>Welcome back!</h1>
                <input type="text" className=' login-input login-email-input' placeholder='Email' onChange={(e) => {setEmailInput(e.target.value)}} value={emailInput}/>
                <input type="password" className=' login-input login-password-input' placeholder='Password' onChange={(e) => {setPasswordInput(e.target.value)}} value={passwordInput}/>
                <button className='login-submit-button' onClick={() => submitLoginInfo()}>Log In</button>
            </div>
        </div>
    )
}

export default LogInPage