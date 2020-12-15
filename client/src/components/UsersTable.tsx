import React, { FC } from 'react'
import { Link } from 'react-router-dom';

import { Table } from 'semantic-ui-react';
import { EmployeeProps } from '../interfaces/Employee';
import { UserProps } from '../interfaces/User';


const UsersTable: FC<{
    uuid: UserProps,
    userId: UserProps,
    lastKanaName: EmployeeProps,
    firstKanaName: EmployeeProps,    
}> = ({ uuid, userId, lastKanaName, firstKanaName }) => {
    return (
            <Table.Body>
                <Table.Row>
                    <Table.Cell>{userId}</Table.Cell>
                    <Table.Cell>{lastKanaName}</Table.Cell>
                    <Table.Cell>{firstKanaName}</Table.Cell>
                    <Table.Cell
                            as={Link} 
                            to={`/detail/${uuid}`}
                    >詳細</Table.Cell>
                </Table.Row>
            </Table.Body>
    )
}

export default UsersTable;
