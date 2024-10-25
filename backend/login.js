import { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './login.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const FinalSubmit = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:2000/login', { username, password });
            alert('Login successful!');
        } catch (error) {
            alert('Login failed! ' + error.response.data);
        }
    };

    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form className="login" onSubmit={FinalSubmit}>
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input 
                                type="text" 
                                className="login__input" 
                                placeholder="User name / Email" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoComplete="username"
                            />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input 
                                type="password" 
                                className="login__input" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="new-password"
                            />
                        </div>
                        <button className="button login__submit" type="submit">
                            <span className="button__text">Sign In</span>
                            <i className="button__icon fas fa-chevron-right"></i>
                        </button>
                    </form>
                    <div className="login__register">
                        <br/>
                        <p>Don't have an account ?<br></br>
                        <br></br> <Link to="/register">Sing Up</Link></p>
                    </div>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>		
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>		
            </div>
        </div>
    );
};

export default Login;
