import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

type Props = {
    info: string;
    createTo: string;
    uuid: string;
}

const AllCreateButton: FC<Props> = ({ info, createTo, uuid}) => {
    return (
        <Button
            as={Link}
            color='teal'
            floated='right'
            to={`/create/${createTo}/${uuid}`}
        >
            {info}を登録
        </Button>
    )
}

export default AllCreateButton;
