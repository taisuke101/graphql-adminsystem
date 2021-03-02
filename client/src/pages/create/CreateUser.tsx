import React, { FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';

import { CREATE_USER_QUERY } from '../../graphql/mutation/createUser';
import { FETCH_USER_QUERY } from '../../graphql/query/fetchUser';

import { Button, Grid, Form, Message } from 'semantic-ui-react'

function Create(props: { history: string[]; }) {

    //TODO 型付け
    const [variables, setVariables] = useState({
        userId: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<any>({});

    const [createUser, { loading }] = useMutation(CREATE_USER_QUERY, {
        update(cache, result) {
            const data = cache.readQuery({
                query: FETCH_USER_QUERY
            })
            cache.writeQuery({ query: FETCH_USER_QUERY, data: {
                getUsers: {
                    result,
                    data
                }
            }})
        },
        onError: (err) => {
            setErrors(err.graphQLErrors[0].extensions?.errors);
        },
        onCompleted: () => props.history.push('/register/success'),
    })

    const submitRegisterForm = (e: FormEvent) => {
        e.preventDefault();

        createUser({ variables });
    }

    return (
        <Grid divided>
            <Grid.Row>
                <h1>ユーザー新規登録</h1>
            </Grid.Row>
            <Grid.Row>
                    <Form 
                        error
                        onSubmit={submitRegisterForm}
                        className={loading ? 'loading' : ''}
                        style={{width: '80%'}}
                    >
                        <Form.Input 
                            label='ユーザーID'
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
                        <Form.Input 
                            label='確認用パスワード'
                            placeholder='確認用パスワード'
                            name='confirmPassword'
                            type='password'
                            value={variables.confirmPassword}
                            onChange={(e) => setVariables({...variables, confirmPassword: e.target.value})}
                        />
                        <Message 
                            error
                            content={errors.confirmPassword}
                        />
                        <Button type='submit' color='teal'>
                            登録
                        </Button>
                    </Form>
            </Grid.Row>
        </Grid>
    )
}

export default Create;
