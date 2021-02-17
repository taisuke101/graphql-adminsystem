import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

type Props = {
    info: string;
    updateTo: string;
    userId: string;
    }

const AllUpdateButton: FC<Props> = ({ info, updateTo, userId }) => {

    return (
        <Button
            as={Link}
            color='blue'
            floated='right'
            to={`/detail/${userId}/${updateTo}/update`}
        >
            {info}を変更
        </Button>
    )
}

export default AllUpdateButton;
