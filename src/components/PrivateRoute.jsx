import React from 'react'

import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

// This private route comp. plays  as wrapper for any current route
export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth();

    return (
        <Route
            /* Wrapping all the rest of these props */
            {...rest}
            render={props => {
                // Check is we have a current user inside of the component we got passed, than render that component with all the props and if not -> login page
                return currentUser ? <Component {...props} /> : <Redirect to="/login" />
            }}
        >    
        </Route>
    );
}
