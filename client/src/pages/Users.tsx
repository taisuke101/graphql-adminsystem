import { useQuery } from '@apollo/client'
import React, { FC } from 'react'

import UsersTable from '../components/UsersTable'
import { FETCH_USER_QUERY } from '../graphql/query/fetchUser';
import { Grid, Table } from 'semantic-ui-react';


const Users: FC<{}> = () => {
    const { loading, data }: any = useQuery(FETCH_USER_QUERY)

    
    return (
        <Grid columns={1} >
            <Grid.Row>
                <h1>社員一覧</h1>
            </Grid.Row>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ユーザーID</Table.HeaderCell>
                        <Table.HeaderCell>性</Table.HeaderCell>
                        <Table.HeaderCell>名</Table.HeaderCell>
                        <Table.HeaderCell>詳細</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {
                    loading
                    ? ( <h1>Loading ...</h1>)
                    : (
                        data.getUsers && data.getUsers.map((user: any) => (
                                <UsersTable
                                    key={user.uuid}
                                    userId={user.userId}
                                    lastKanaName=
                                    {
                                        user.employee[0]
                                        ? user.employee[0].lastKanaName
                                        : '未登録'
                                    }
                                    firstKanaName=
                                    {
                                        user.employee[0]
                                        ? user.employee[0].firstKanaName
                                        : '未登録'
                                    }
                                />
                        ))
                    )
                }
            </Table>
        </Grid>
    )
}

export default Users;
