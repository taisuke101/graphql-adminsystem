import { useMutation } from '@apollo/client';
import React, { useContext } from 'react'
import { Button, Form } from 'semantic-ui-react';

import { AuthContext } from '../context/auth'
import { LOGIN_USER } from '../graphql/mutation/loginUser';
import { useForm } from '../util/hooks';


const Login = (props: any) => {
    const context = useContext(AuthContext);

    const { values, onChange, onSubmit}: any = useForm(loginUserCallback, {
        userId: '',
        password: ''
    })

    const [ loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: {loginUser: userData}}) {
            context.login(userData);
            values.body = ''
            props.history.push('/home');
        },
        variables: values
    })

    function loginUserCallback() {
        loginUser();
    }
    

    return (
        <Form
            onSubmit={onSubmit}
            noValidate
            className={loading ? 'loading' : ''}
        >
            <h1>ユーザーログイン</h1>
            <Form.Input 
                labal='ユーザーID'
                placeholder='ユーザーID'
                name='userId'
                type='text'
                value={values.userId}
                onChange={onChange}
            />
            <Form.Input 
                label='パスワード'
                placeholder='パスワード'
                name='password'
                type='password'
                value={values.password}
                onChange={onChange}
            />
            <Button type='submit' primary>
                ログイン
            </Button>
        </Form>
    )
}

export default Login;
