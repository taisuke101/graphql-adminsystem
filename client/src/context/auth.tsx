import React, { useReducer, createContext} from 'react';
import jwt_decode from 'jwt-decode';

const initialState = {
    user: null
};

const localStorageItem: any = localStorage.getItem('jwtToken')

if (localStorage.getItem('jwtToken')) {
    const decodedToken: any = jwt_decode(localStorageItem)

    decodedToken.exp * 1000 < Date.now()
    ? localStorage.removeItem('jwtToken')
    : initialState.user = decodedToken;
}

const AuthContext = createContext({
    user: null,
    login: (userData: any) => {},
    logout: () => {}
})


function authReducer(state: any, action:any) {
    switch(action.type) {
        case 'LOGIN': 
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default: 
            return state;
    }
}

function AuthProvider(props: any) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    function login(userData: any) {
        localStorage.setItem('jwtToken', userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData
        });
    }

    function logout() {
        localStorage.removeItem('jwtToken');
        dispatch({type: 'LOGOUT'});
    }

    return (
        <AuthContext.Provider
            value={{user: state.user, login, logout}}
            {...props}
        />
    )
}

export { AuthContext, AuthProvider } 