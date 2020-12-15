import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

type Props = {
    info: string;
    updateTo: string;
    uuid: string;
    }

const AllUpdateButton: FC<Props> = ({ info, updateTo, uuid }) => {

    return (
        <Button
            as={Link}
            color='blue'
            floated='right'
            to={`/update/${updateTo}/${uuid}`}
        >
            {info}を変更
        </Button>
    )
}

export default AllUpdateButton;
