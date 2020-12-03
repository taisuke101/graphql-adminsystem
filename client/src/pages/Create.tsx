import React  from 'react';
import { useMutation } from '@apollo/client';

import { useForm } from '../util/hooks';
import { CREATE_USER_QUERY } from '../graphql/mutation/createUser';
import { FETCH_USER_QUERY } from '../graphql/query/fetchUser';

import { Button, Grid, Form } from 'semantic-ui-react'

function Create(props: { history: string[]; }) {

    const { values, onChange, onSubmit }: any = useForm(createUserCallback, {
        userId: '',
        password: '',
        confirmPassword: ''
    })

    const [createUser, { loading }] = useMutation(CREATE_USER_QUERY, {
        variables: values,
        update(proxy, result) {
            const data: any = proxy.readQuery({
                query: FETCH_USER_QUERY
            })
            proxy.writeQuery({ query: FETCH_USER_QUERY, data: {
                getUsers: [
                    result.data.createUser,
                    ...data.getUsers
                ]
            }})
            values.body = ''
        }
    })

    function createUserCallback() {
        createUser();
        props.history.push('/success/user');
    }

    return (
        <Grid divided>
            <Grid.Row>
                <h1>ユーザー新規登録</h1>
            </Grid.Row>
            <Grid.Row>
                    <Form 
                        onSubmit={onSubmit}
                        noValidate
                        className={loading ? 'loading' : ''}
                        style={{width: '80%'}}
                    >
                        <Form.Input 
                            label='ユーザーID'
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
                        <Form.Input 
                            label='確認用パスワード'
                            placeholder='確認用パスワード'
                            name='confirmPassword'
                            type='password'
                            value={values.confirmPassword}
                            onChange={onChange}
                        />
                        <Button type='submit' color='teal'>
                            作成
                        </Button>
                    </Form>
            </Grid.Row>
        </Grid>
    )
}

export default Create;
