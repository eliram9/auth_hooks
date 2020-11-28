import React from 'react';

import Signup from './components/Signup';
import AuthProvider from './contexts/AuthProvider';

function App() {
    return (
        <AuthProvider>
        <div className="container">
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100 border border-primary p-4" style={{ maxWidth: 500, borderRadius: 10 }}>
                    <Signup />  
                </div>
            </div>
        </div>
        </AuthProvider>
    );
}

export default App;
