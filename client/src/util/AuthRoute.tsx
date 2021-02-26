import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth'

//TODO 型付け
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
            exact
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