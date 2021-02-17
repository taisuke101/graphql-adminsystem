import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

type Props = {
    info: string;
    createTo: string;
    userId: string;
}

const AllCreateButton: FC<Props> = ({ info, createTo, userId}) => {
    return (
        <Button
            as={Link}
            color='teal'
            floated='right'
            to={`/detail/${userId}/${createTo}/create`}
        >
            {info}を登録
        </Button>
    )
}

export default AllCreateButton;
