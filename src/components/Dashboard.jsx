import React, { useState } from 'react';

import { useAuth } from '../contexts/AuthProvider';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError('');
        try{
            await logout();
            history.push("/login");
        } catch {
            setError('Faild to logout');
        }
    }

    return ( 
        <div>
            <div className="card" style={{ width: "100%" }}>
                <div className="card-body">
                    {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">{error}
                                 <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>  
                              </div>}
                    <h3 className="card-title">Profile</h3>
                    <h6 className="card-subtitle mb-2 text-muted"><strong>User Email: </strong>{currentUser.email}</h6>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <button type="button" 
                            onClick={handleLogout}
                            className="btn btn-outline-primary btn-sm">
                                Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default Dashboard;