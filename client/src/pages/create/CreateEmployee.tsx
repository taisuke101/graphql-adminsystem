import { useMutation } from '@apollo/client';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Form, Grid } from 'semantic-ui-react';

import { CREATE_EMPLOYEE_MUTATION } from '../../graphql/mutation/createEmployee';
import { FETCH_USER_DETAIL_QUERY } from '../../graphql/query/fetchUserDetail';
import { EmployeeProps } from '../../interfaces/Employee';
import { useForm } from '../../util/hooks';


type Props = 
    EmployeeProps &
    {props: {history: string[];}} 
    & RouteComponentProps<{userId: string}>

function CreateUser(props: Props) {

    const userId = props.match.params.userId;

    // TODO 型付け
    const { values, onChange, onSubmit }: any = useForm(createEmployeeCallback, {
        employeeCode: '',
        lastName: '',
        firstName: '',
        lastKanaName: '',
        firstKanaName: '',
        gender: '',
        birthDay: '',
        hireDate: '',
    });

    const [ createEmployee, { loading }] = useMutation(CREATE_EMPLOYEE_MUTATION, {
        variables: {
            userId: userId,
            employeeCode: values.employeeCode,
            lastName: values.lastName,
            firstName: values.firstName,
            lastKanaName: values.lastKanaName,
            firstKanaName: values.firstKanaName,
            gender: values.gender,
            birthDay: values.birthDay,
            hireDate: values.hireDate
        },
        update(cache, result) {
            const data = cache.readQuery({
                query: FETCH_USER_DETAIL_QUERY,
                variables: { userId }
            });
            cache.writeQuery({
                query: FETCH_USER_DETAIL_QUERY,
                variables: { userId },
                data: {
                    getUser: {
                        data,
                        employee: {
                            result
                        }
                    }
                }
            })
            values.body = '';
        }
    })

    function createEmployeeCallback() {
        createEmployee();
        props.history.push(`/detail/${userId}`);
    }

    return (
        <Grid divided>
            <Grid.Row>
                <h1>社員情報新規登録</h1>
            </Grid.Row>
            <Grid.Row>
                <Form
                    onSubmit={onSubmit}
                    noValidate
                    className={loading ? 'loading' : ''}
                    style={{ width: '80%'}}
                >
                    <Form.Input 
                        label='社員コード'
                        placeholder='社員コード'
                        name='employeeCode'
                        type='text'
                        value={values.employeeCode}
                        onChange={onChange}
                    />
                    <Form.Input 
                        label='性'
                        placeholder='性'
                        name='lastName'
                        type='text'
                        value={values.lastName}
                        onChange={onChange}
                    />
                    <Form.Input 
                        label='名'
                        placeholder='名'
                        name='firstName'
                        type='text'
                        value={values.firstName}
                        onChange={onChange}
                    />
                    <Form.Input 
                        label='性(かな)'
                        placeholder='性(かな)'
                        name='lastKanaName'
                        type='text'
                        value={values.lastKanaName}
                        onChange={onChange}
                    />
                    <Form.Input 
                        label='名(かな)'
                        placeholder='名(かな)'
                        name='firstKanaName'
                        type='text'
                        value={values.firstKanaName}
                        onChange={onChange}
                    />
                    <Form.Input 
                        label='性別'
                        placeholder='性別'
                        name='gender'
                        type='text'
                        value={values.gender}
                        onChange={onChange}
                    />
                    <Form.Input 
                        label='誕生日'
                        placeholder='誕生日'
                        name='birthDay'
                        type='text'
                        value={values.birthDay}
                        onChange={onChange}
                    />
                    <Form.Input 
                        label='入社日'
                        placeholder='入社日'
                        name='hireDate'
                        type='text'
                        value={values.hireDate}
                        onChange={onChange}
                    />
                    <Button type='submit' color='teal'>
                        登録
                    </Button>
                </Form>
            </Grid.Row>
        </Grid>
    )
}

export default CreateUser;
