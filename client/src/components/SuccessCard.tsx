import React, { FC } from 'react'
import { Link } from 'react-router-dom';
import { Button, Grid } from 'semantic-ui-react'

type Props = {
    successName: string;
    backPage: string;
    ContinuePage: string;
}

const SuccessCard: FC<Props> = ({ successName, backPage, ContinuePage}) => {
    return (
        <Grid className='success-container'>
            <Grid.Row className='success-content'>
                <h1>{successName}を登録しました！</h1>
            </Grid.Row>
            <Grid.Row>
                <Button
                    color='teal'
                    as={Link}
                    to={backPage}
                >社員一覧に戻る</Button>
                <Button
                    color='teal'
                    as={Link}
                    to={ContinuePage}
                >続けて作成する</Button>
            </Grid.Row>
        </Grid>
    )
}

export default SuccessCard;
