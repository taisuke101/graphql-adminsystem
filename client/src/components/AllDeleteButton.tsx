import { useMutation } from '@apollo/client';
import { useState } from 'react'

import { Button, Confirm } from 'semantic-ui-react';
import { DELETE_EMPLOYEE_MUTATION } from '../graphql/mutation/deleteEmployee';
import { DELETE_SECTION_MUTATION } from '../graphql/mutation/deleteSection';

import { DELETE_USER_MUTATION } from '../graphql/mutation/deleteUser';
import { FETCH_USER_DETAIL_QUERY } from '../graphql/query/fetchUserDetail';

type Props = {
    // TODO callbackの型付け
    callback?: any;
    userId: string;
    user?: boolean;
    employee?: boolean;
    info: string;
}

function AllDeleteButton({ info, userId, user, employee, callback }: Props) {

    const [ confirmOpen, setConfirmOpen ] = useState(false);

    const mutation = 
    user ? DELETE_USER_MUTATION:
    employee ? DELETE_EMPLOYEE_MUTATION:
    DELETE_SECTION_MUTATION

    //TODO 型付け
    const [ deleteObject ]: any = useMutation(mutation, {
        update(proxy, result) {
            setConfirmOpen(false);
                const data = proxy.readQuery({
                    query: FETCH_USER_DETAIL_QUERY,
                    variables: { userId }
                });
                proxy.writeQuery({ 
                    query: FETCH_USER_DETAIL_QUERY,
                    variables: { userId },
                    data: {
                        getUser: {
                            result,
                            data,
                        }
                    }
                })
            if(callback) callback();
        },
        variables: {
            userId,
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
                content='本当に削除しますか？'
                onConfirm={deleteObject}
                size='large'
            />
        </>
    )
}

export default AllDeleteButton;
