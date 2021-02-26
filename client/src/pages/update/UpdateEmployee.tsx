import React from 'react'
import { useMutation } from '@apollo/client';
import { RouteComponentProps } from 'react-router-dom';

import { FETCH_USER_DETAIL_QUERY } from '../../graphql/query/fetchUserDetail';
import { useForm } from '../../util/hooks';
import { UPDATE_EMPLOYEE_MUTATION } from '../../graphql/mutation/updateEmployee';
import { Button, Form, Grid } from 'semantic-ui-react';

type Props = 
    {props: {history: string[];}}
    & RouteComponentProps<{userId: string}>

function UpdateEmployee(props: Props) {
    const userId = props.match.params.userId;

    //TODO 型付け
    const { values, onChange, onSubmit }: any = useForm(updateEmployeeCallback, {
        employeeCode: '',
        lastName: '',
        firstName: '',
        firstKanaName: '',
        lastKanaName: '',
        gender: '',
        birthDay: '',
        hireDate: '',
    })

    const [ updateEmployee ] = useMutation(UPDATE_EMPLOYEE_MUTATION, {
        variables: {
            userId: userId,
            employeeCode: values.employeeCode,
            lastName: values.lastName,
            firstName: values.firstName,
            firstKanaName: values.firstKanaName,
            lastKanaName: values.lastKanaName,
            gender: values.gender,
            birthDay: values.birthDay,
            hireDate: values.hireDate,
        },
        update(cache, result) {
            cache.writeQuery({
                query: FETCH_USER_DETAIL_QUERY,
                variables: { userId },
                data: {
                    getUser: {
                        employee: {
                            result
                        }
                    }
                }
            })
        }
    })

    function updateEmployeeCallback() {
        updateEmployee();
        props.history.push(`/detail/${userId}`);
    }

    return (
        <Grid divided>
        <Grid.Row>
            <h1>社員情報変更</h1>
        </Grid.Row>
        <Grid.Row>
            <Form
                onSubmit={onSubmit}
                noValidate
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

export default UpdateEmployee;
