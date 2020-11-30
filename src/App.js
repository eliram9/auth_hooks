import React from 'react';

import AuthProvider from './contexts/AuthProvider';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        
        <div className="container">
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100 border border-primary p-4" style={{ maxWidth: 500, borderRadius: 10 }}>
                    <Router>
                        <AuthProvider>
                            <Switch>
                                <PrivateRoute exact path="/" component={Dashboard} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/signup" component={Signup} />
                            </Switch>
                        </AuthProvider>
                    </Router>
                </div>
            </div>
        </div>
        
    );
}

export default App;
