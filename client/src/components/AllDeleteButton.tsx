import { useMutation } from '@apollo/client';
import { useState } from 'react'

import { Button, Confirm } from 'semantic-ui-react';
import { DELETE_EMPLOYEE_MUTATION } from '../graphql/mutation/deleteEmployee';
import { DELETE_SECTION_MUTATION } from '../graphql/mutation/deleteSection';

import { DELETE_USER_MUTATION } from '../graphql/mutation/deleteUser';
import { FETCH_USER_QUERY } from '../graphql/query/fetchUser';

type Props = {
    // TODO callbackの型付け
    callback?: any;
    uuid?: string;
    employeeCode?: string;
    sectionCode?: string;
    info: string;
}

function AllDeleteButton({ info, uuid, employeeCode, sectionCode, callback }: Props) {

    const [ confirmOpen, setConfirmOpen ] = useState(false);

    const mutation = 
    uuid ? DELETE_USER_MUTATION:
    employeeCode ? DELETE_EMPLOYEE_MUTATION:
    DELETE_SECTION_MUTATION

    const [ deleteObject ]: any = useMutation(mutation, {
        update(proxy) {
            setConfirmOpen(false);
                const data: any = proxy.readQuery({
                    query: FETCH_USER_QUERY
                });
                    proxy.writeQuery({ 
                        query: FETCH_USER_QUERY,
                        data: {
                            getUsers: [
                                data
                            ]
                        }
                    })
            if(callback) callback();
        },
        variables: {
            uuid,
            employeeCode,
            sectionCode
        }
    })

    return (
        <>
            <Button
                as='a'
                color='red'
                floated='right'
                onClick={() => setConfirmOpen(true)}
            >
                {info}を削除
            </Button>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deleteObject}
            />
        </>
    )
}

export default AllDeleteButton;
