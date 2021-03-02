import { useMutation } from '@apollo/client';
import React, { FormEvent, useContext, useState } from 'react'
import { Button, Form, Message } from 'semantic-ui-react';

import { AuthContext } from '../context/auth'
import { LOGIN_USER } from '../graphql/mutation/loginUser';

const Login = (props: { history: string[]; }) => {
    const context = useContext(AuthContext);

    // TODO 型付け
    const [ variables, setVariables ]= useState({
        userId: '',
        password: ''
    })

    const [ errors, setErrors ] = useState<any>({});

    const [ loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: {Login: userData}}) {
            context.login(userData);
        },
        onError: (err) => setErrors(err.graphQLErrors[0].extensions?.errors),
        onCompleted: () =>  props.history.push('/home')
    })

    const submitLoginForm = (e: FormEvent) => {
        e.preventDefault();

        loginUser({ variables });
    }

    return (
        <Form
            error
            onSubmit={submitLoginForm}
            noValidate
            className={loading ? 'loading' : ''}
        >
            <h1>ユーザーログイン</h1>
            <Form.Input 
                labal='ユーザーID'
                placeholder='ユーザーID'
                name='userId'
                type='text'
                value={variables.userId}
                onChange={(e) => setVariables({...variables, userId: e.target.value})}
            />
            <Message
                error
                content={errors.userId}
            />
            <Form.Input 
                label='パスワード'
                placeholder='パスワード'
                name='password'
                type='password'
                value={variables.password}
                onChange={(e) => setVariables({...variables, password: e.target.value})}
            />
            <Message
                error
                content={errors.password}
            />
            <Button type='submit' primary>
                ログイン
            </Button>
        </Form>
    )
}

export default Login;
