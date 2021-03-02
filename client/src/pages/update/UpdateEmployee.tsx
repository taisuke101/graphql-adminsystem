import React, { FormEvent, useState } from 'react'
import { useMutation } from '@apollo/client';
import { RouteComponentProps } from 'react-router-dom';

import { FETCH_USER_DETAIL_QUERY } from '../../graphql/query/fetchUserDetail';
import { UPDATE_EMPLOYEE_MUTATION } from '../../graphql/mutation/updateEmployee';
import { Button, Form, Grid } from 'semantic-ui-react';

type Props = 
    {props: {history: string[];}}
    & RouteComponentProps<{userId: string}>

function UpdateEmployee(props: Props) {
    const userId = props.match.params.userId;

    //TODO 型付け
    const [ variables, setVariables ] = useState({
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
            employeeCode: variables.employeeCode,
            lastName: variables.lastName,
            firstName: variables.firstName,
            firstKanaName: variables.firstKanaName,
            lastKanaName: variables.lastKanaName,
            gender: variables.gender,
            birthDay: variables.birthDay,
            hireDate: variables.hireDate,
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
        },
        onCompleted: () => props.history.push(`/detail/${userId}`)
    })

    const submitUpdateEmployeeForm = (e: FormEvent) => {
        e.preventDefault();

        updateEmployee();
    }

    return (
        <Grid divided>
        <Grid.Row>
            <h1>社員情報変更</h1>
        </Grid.Row>
        <Grid.Row>
            <Form
                onSubmit={submitUpdateEmployeeForm}
                style={{ width: '80%'}}
            >
                <Form.Input 
                    label='社員コード'
                    placeholder='社員コード'
                    name='employeeCode'
                    type='text'
                    value={variables.employeeCode}
                    onChange={(e) => setVariables({...variables, employeeCode: e.target.value})}
                />
                <Form.Input 
                    label='性'
                    placeholder='性'
                    name='lastName'
                    type='text'
                    value={variables.lastName}
                    onChange={(e) => setVariables({...variables, lastName: e.target.value})}
                />
                <Form.Input 
                    label='名'
                    placeholder='名'
                    name='firstName'
                    type='text'
                    value={variables.firstName}
                    onChange={(e) => setVariables({...variables, firstName: e.target.value})}
                />
                <Form.Input 
                    label='性(かな)'
                    placeholder='性(かな)'
                    name='lastKanaName'
                    type='text'
                    value={variables.lastKanaName}
                    onChange={(e) => setVariables({...variables, lastKanaName: e.target.value})}
                />
                <Form.Input 
                    label='名(かな)'
                    placeholder='名(かな)'
                    name='firstKanaName'
                    type='text'
                    value={variables.firstKanaName}
                    onChange={(e) => setVariables({...variables, firstKanaName: e.target.value})}
                />
                <Form.Input 
                    label='性別'
                    placeholder='性別'
                    name='gender'
                    type='text'
                    value={variables.gender}
                    onChange={(e) => setVariables({...variables, gender: e.target.value})}
                />
                <Form.Input 
                    label='誕生日'
                    placeholder='誕生日'
                    name='birthDay'
                    type='text'
                    value={variables.birthDay}
                    onChange={(e) => setVariables({...variables, birthDay: e.target.value})}
                />
                <Form.Input 
                    label='入社日'
                    placeholder='入社日'
                    name='hireDate'
                    type='text'
                    value={variables.hireDate}
                    onChange={(e) => setVariables({...variables, hireDate: e.target.value})}
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
