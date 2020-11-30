import React, { useRef, useState } from 'react';

import { useAuth } from '../contexts/AuthProvider';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const emailRef = useRef();
    const { resetPassword } = useAuth(); // login func. imported with friebase auth being used in line 25
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    

    async function handleSubmit(evt) {
        evt.preventDefault();
        
        // -- PRE CONTIDITIONS - VALIDATION CHECKS -- \\
    
        try {
            setError('');
            setSuccess('');
            setLoading(true)
            await resetPassword(emailRef.current.value);
            setSuccess('Check your email for further instruction');
        } 
            catch {
            setError("Failed to reset password!")
        }
        setLoading(false);
    }

    return ( 
        <div>
            <h4 className="display-4 text-center">Reset Password</h4>

            {/* ALERTS */}
            {/* Successful */}
            {success && <div className="alert alert-success alert-dismissible fade show" role="alert">{success}
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>  
                        </div>}
            {/* Error  */}
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
                
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>Reset</button>
            </form>    

            <div className="w-100 text-center mt-2">
                <Link to="/login">I remember my password</Link>
            </div>
            
        </div>
    );
}
 
export default ForgotPassword; 
