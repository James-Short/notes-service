import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';

function SignUpPage(){
    const navigate = useNavigate();

    return(
    <div className='signup-page-container'>
        <div className='signup-input-container'>
            <h1 className='signup-input-header'>Create an account</h1>
            <input type="text" className='signup-input' placeholder='Username'/>
            <input type="text" className='signup-input' placeholder='Email'/>
            <input type="password" className='signup-input' placeholder='Password'/>
            <button className='signup-submit-button'>Sign Up</button>
        </div>
        <button className='login-redirect-button' onClick={() => navigate("/login")}>Log In</button>
    </div>
    )
}

export default SignUpPage;