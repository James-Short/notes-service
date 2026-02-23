import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './SignUpPage.css';

function SignUpPage(){
    const navigate = useNavigate();

    const [usernameInput, setUsernameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    function submitSignupInfo(){
        axios.post('http://localhost:8080/users/createUser', {
            username: usernameInput,
            email: emailInput,
            password: passwordInput
        }, {withCredentials: true, validateStatus: () => true})
        .then((res) => {
            if(res.status === 201){
                alert("Account created, redirecting to login page.")
                navigate("/login");
            }
            else{
                alert("Email already exists" + res.status)
            }
                
        })
        .catch(() => alert("Some error occured"));

        setUsernameInput("");
        setEmailInput("");
        setPasswordInput("");
    }

    return(
    <div className='signup-page-container'>
        <div className='signup-input-container'>
            <h1 className='signup-input-header'>Create an account</h1>
            <input type="text" className='signup-input' placeholder='Username' value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)}/>
            <input type="text" className='signup-input' placeholder='Email' value={emailInput} onChange={(e) => setEmailInput(e.target.value)}/>
            <input type="password" className='signup-input' placeholder='Password' value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}/>
            <button className='signup-submit-button' onClick={() => submitSignupInfo()}>Sign Up</button>
        </div>
        <button className='login-redirect-button' onClick={() => navigate("/login")}>Log In</button>
    </div>
    )
}

export default SignUpPage;