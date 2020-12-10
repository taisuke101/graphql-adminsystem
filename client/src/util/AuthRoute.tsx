import userEvent from '@testing-library/user-event';
import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth'

type Props = {
    Component?: any;
    component?: any;
    path: string;
    rest?: any
}

function AuthRoute({ component: Component, path, ...rest}: Props) {
    const {user} = useContext(AuthContext);

    return (
        <Route 
            path={path}
            render={props =>
                user
                ? <Component {...props}/>
                : <Redirect to='/' />
            }
        />
    )
}

export default AuthRoute;
;