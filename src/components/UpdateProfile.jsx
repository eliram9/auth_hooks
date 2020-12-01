import React, { useRef, useState } from 'react';

import { useAuth } from '../contexts/AuthProvider';
import { Link, useHistory } from 'react-router-dom';

const UpdateProfile = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const history = useHistory();
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [error, setError] = useState('');
    const [passwordErrorLength, setPasswordErrorLength] = useState('')
    const success = useState('')
    const [loading, setLoading] = useState(false);

    function handleSubmit(evt) {
        evt.preventDefault();
        
        // -- PRE CONTIDITIONS - PROMISES & VALIDATIONS -- \\

        // The promises array will contain validations/promises before we will run any update functions. 
        const promises = [];
        setLoading(true);
        setError('');
        // To be able to update the email so we need to make sure that the initial email is different than the new email the user put,
        if (emailRef.current.value !== currentUser.email) {
            // If yes, the updateEmail func. will be added with the new email as an argu. to the promises array
            promises.push(updateEmail(emailRef.current.value));
        }
        // If the user put a new passord then the function with the argu. will be added to the promise array
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));
        }

        // Password length must be minimun 8 characters long
        if (passwordRef.current.value.toString().length && confirmPasswordRef.current.value.toString().length <= 7  ) {
            return setPasswordErrorLength("Password must be at least 8 characters long"); 
        }

        // Password & confirtoPassword must match
        else if (passwordRef.current.value !== confirmPasswordRef.current.value  ) {
            return setError("Error, not matched"); 
        }

        // Fire all the function in the array, then after the functions were fired successfully we redirect to the dashboard page
        Promise.all(promises).then(() => {
            setLoading(false);
            history.push('/');
        })
        // Otherwise
        .catch(() => {
            setError('Failed to update');
        });
    }

    return ( 
        <div>
            <h4 className="display-4 text-center">Update Profile</h4>

            {/* ALERT */}
            {/* Both passwords dont match OR too short */}
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
                           defaultValue={currentUser.email}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else 😜</small>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" 
                           className="form-control" 
                           id="password" 
                           ref={passwordRef}
                           placeholder="Leave black to keep the same"
                    />
                    {passwordErrorLength && <small id="emailHelp" className="form-text text-danger">{passwordErrorLength}</small>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="confirmPassword">Password Confirmation</label>
                    <input type="password" 
                           className="form-control" 
                           id="confirmPassword" 
                           ref={confirmPasswordRef}
                           placeholder="Leave black to keep the same"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>Update</button>
                <div className="w-100 text-center mt-2">
                    <Link to="/">Cancel</Link>
                </div>
            </form>
        </div>
    );
}
 
export default UpdateProfile;