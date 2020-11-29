import React, { useRef, useState } from 'react';

import { useAuth } from '../contexts/AuthProvider';
import { Link } from 'react-router-dom';

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [passwordErrorLength, setPasswordErrorLength] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false);

    async function handleSubmit(evt) {
        evt.preventDefault();
        
        // -- PRE CONTIDITIONS - VALIDATION CHECKS -- \\
        // Password length must be minimun 8 characters long
        if (passwordRef.current.value.toString().length && confirmPasswordRef.current.value.toString().length <= 7  ) {
            return setPasswordErrorLength("Password must be at least 8 characters long"); 
        }
        // Password & confirmPassword must match
        else if (passwordRef.current.value !== confirmPasswordRef.current.value  ) {
            return setError("Error, not matched"); 
        }
        
        try {
            setError('');
            setPasswordErrorLength('');
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value);
        } 
            catch {
            setError("Failed to create an account!")
        }
        setLoading(false);
        setSuccess('You are in!');
    }

    return ( 
        <div>
            <h4 className="display-4 text-center">Sign Up</h4>

            {/* ALERTS */}
            {/* Both passwords dont match */}
            {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">{error}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>  
                     </div>}
            {/* Successful signup */}
            {success && <div className="alert alert-success" role="alert">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button> 
                            <h4>Great,</h4>
                                <span>{success}</span>
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
                    {passwordErrorLength && <small id="emailHelp" className="form-text text-danger">{passwordErrorLength}</small>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="confirmPassword">Password Confirmation</label>
                    <input type="password" 
                           className="form-control" 
                           id="confirmPassword" 
                           required
                           ref={confirmPasswordRef}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>Sign Up</button>
                <div className="w-100 text-center mt-2">
                    Have an account? <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
}
 
export default Signup; 