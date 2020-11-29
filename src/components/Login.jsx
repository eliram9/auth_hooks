import React, { useRef, useState } from 'react';

import { useAuth } from '../contexts/AuthProvider';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth(); // login func. imported with friebase auth being used in line 25
    const [error, setError] = useState('');
    // const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(evt) {
        evt.preventDefault();
        
        // -- PRE CONTIDITIONS - VALIDATION CHECKS -- \\
    
        try {
            setError('');
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value);
            // if the login was successful, useHistory gives the access to "history instance" that we want to navigate
            history.push("/");
        } 
            catch {
            setError("Failed to login!")
        }
        setLoading(false);
    }

    return ( 
        <div>
            <h4 className="display-4 text-center">Login</h4>

            {/* ALERTS */}
            {/* Successful */}
            {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">{error}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>  
                     </div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                           className="form-control" 
                           id="email" 
                           aria-describedby="emailHelp" 
                           required
                           ref={emailRef}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else 😜</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" 
                           className="form-control" 
                           id="password" 
                           required
                           ref={passwordRef}
                    />
                </div>
                
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>Login</button>
                <div className="w-100 text-center mt-2">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </div>
            </form>
        </div>
    );
}
 
export default Login; 
