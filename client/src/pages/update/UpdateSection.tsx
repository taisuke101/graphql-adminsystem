import { useMutation } from '@apollo/client';
import { FormEvent, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Form, Grid } from 'semantic-ui-react';

import { UPDATE_SECTION_MUTATION } from '../../graphql/mutation/updateSection';
import { FETCH_USER_DETAIL_QUERY } from '../../graphql/query/fetchUserDetail';

type Props = 
    {props: {history: string[];}} 
    & RouteComponentProps<{userId: string}>

function UpdateSection(props: Props) {
    const userId = props.match.params.userId;

    //TODO 型付け
    const [ variables, setVariables ] = useState({
        sectionCode: '',
        sectionName: ''
    })

    const [ updateSection ] = useMutation(UPDATE_SECTION_MUTATION, {
        variables: {
            userId: userId,
            sectionCode: variables.sectionCode,
            sectionName: variables.sectionName
        },
        update(cache, result) {
            cache.writeQuery({ 
                query: FETCH_USER_DETAIL_QUERY, 
                variables: { userId },
                data: {
                    getUser: {
                        section: {
                            result
                        }
                    }
                }
            })
        },
        onCompleted: () => props.history.push(`/detail/${userId}`)
    })

    const submitUpdateSectionForm = (e: FormEvent) => {
        e.preventDefault();

        updateSection();
    }

    return (
        <Grid divided>
            <Grid.Row>
                <h1>拠点情報変更</h1>
            </Grid.Row>
            <Grid.Row>
                <Form
                    onSubmit={submitUpdateSectionForm}
                    noValidate
                >
                    <Form.Input 
                        label='拠点コード'
                        placeholder='拠点コード'
                        name='sectionCode'
                        type='text'
                        value={variables.sectionCode}
                        onChange={(e) => setVariables({...variables, sectionCode: e.target.value})}
                    />
                    <Form.Input 
                        label='拠点名'
                        placeholder='拠点名'
                        name='sectionName'
                        type='text'
                        value={variables.sectionName}
                        onChange={(e) => setVariables({...variables, sectionName: e.target.value})}
                    />
                    <Button type='submit' color='blue'>
                        変更
                    </Button>
                </Form>
            </Grid.Row>
        </Grid>
    )
}

export default UpdateSection;
