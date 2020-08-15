import React from 'react';
import { Route, Redirect } from 'react-router-dom';


function PrivateRoute ({component: Component, ...restProps}) {
    
    return (
        <Route {...restProps} render={() => {
            if(localStorage.getItem('AuthToken')) {
                return <Component/>
            } else {
                return <Redirect to="/"/>
            }
        }}/>
    )
}

export default PrivateRoute