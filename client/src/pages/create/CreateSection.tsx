import { useMutation } from '@apollo/client';
import React, { FormEvent, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { Button, Form, Grid, Message } from 'semantic-ui-react';
import { CREATE_SECTION_MUTATION } from '../../graphql/mutation/createSection';
import { FETCH_USER_DETAIL_QUERY } from '../../graphql/query/fetchUserDetail';

type Props = {
} &  {props: {history: string[];}} 
& RouteComponentProps<{userId: string}>

function CreateSection(props: Props) {

    const userId = props.match.params.userId;

    // TODO 型付け
    const [ variables, setVariables ] = useState({
        sectionCode: '',
        sectionName: ''
    })

    const [ errors, setErrors ] = useState<any>({});

    const [createSection, { loading }] = useMutation(CREATE_SECTION_MUTATION, {
        variables: {
            userId: userId,
            sectionCode: variables.sectionCode,
            sectionName: variables.sectionName
        },
        update(cache, result) {
            const data = cache.readQuery({
                query: FETCH_USER_DETAIL_QUERY,
                variables: { userId }
            });
            cache.writeQuery({
                query: FETCH_USER_DETAIL_QUERY,
                variables: { userId },
                data: {
                    getUser: {
                        data,
                        section: {
                            result
                        }
                    }
                }
            })
        },
        onError: (err) => {
            setErrors(err.graphQLErrors[0].extensions?.errors);
        },
        onCompleted: () =>  props.history.push(`/detail/${userId}`)
    })

    const submitCreateSectionForm = (e: FormEvent) => {
        e.preventDefault();

        createSection();
    }

    return (
        <Grid divided>
            <Grid.Row>
                <h1>拠点情報新規登録</h1>
            </Grid.Row>
            <Grid.Row>
                <Form
                    error
                    onSubmit={submitCreateSectionForm}
                    className={loading ? 'loading' : ''}
                    style={{ width: '80%'}}
                >
                    <Form.Input 
                        label='拠点コード'
                        placeholder='拠点コード'
                        name='sectionCode'
                        type='text'
                        value={variables.sectionCode}
                        onChange={(e) => setVariables({...variables, sectionCode: e.target.value})}
                    />
                    <Message 
                        error
                        content={errors.sectionCode}
                    />
                    <Form.Input 
                        label='拠点名'
                        placeholder='拠点名'
                        name='sectionName'
                        type='text'
                        value={variables.sectionName}
                        onChange={(e) => setVariables({...variables, sectionName: e.target.value})}
                    />
                    <Message 
                        error
                        content={errors.sectionName}
                    />
                    <Button type='submit' color='teal'>
                        登録
                    </Button>
                </Form>
            </Grid.Row>
        </Grid>
    )
}

export default CreateSection;
