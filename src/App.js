import React from 'react';

import AuthProvider from './contexts/AuthProvider';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';

function App() {
    return (
        
        <div className="container">
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100 border-0 rounded p-4" style={{ maxWidth: 500, backgroundColor: "#e3f0fc" }}>
                    <Router>
                        <AuthProvider>
                            <Switch>
                                <PrivateRoute exact path="/" component={Dashboard} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/signup" component={Signup} />
                                <Route exact path="/forgot-password" component={ForgotPassword} />
                            </Switch>
                        </AuthProvider>
                    </Router>
                </div>
            </div>
        </div>
        
    );
}

export default App;
