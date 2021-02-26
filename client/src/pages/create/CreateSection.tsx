import { useMutation } from '@apollo/client';
import React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { Button, Form, Grid } from 'semantic-ui-react';
import { CREATE_SECTION_MUTATION } from '../../graphql/mutation/createSection';
import { FETCH_USER_DETAIL_QUERY } from '../../graphql/query/fetchUserDetail';
import { useForm } from '../../util/hooks';

type Props = {
} &  {props: {history: string[];}} 
& RouteComponentProps<{userId: string}>

function CreateSection(props: Props) {

    const userId = props.match.params.userId;

    // TODO 型付け
    const { values, onChange, onSubmit }: any = useForm(createSectionCallback, {
        sectionCode: '',
        sectionName: ''
    })

    const [createSection, { loading }] = useMutation(CREATE_SECTION_MUTATION, {
        variables: {
            userId: userId,
            sectionCode: values.sectionCode,
            sectionName: values.sectionName
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
            values.body = '';
        }
    })

    function createSectionCallback() {
        createSection();
        props.history.push(`/detail/${userId}`);
    }

    return (
        <Grid divided>
            <Grid.Row>
                <h1>拠点情報新規登録</h1>
            </Grid.Row>
            <Grid.Row>
                <Form
                    onSubmit={onSubmit}
                    noValidate
                    className={loading ? 'loading' : ''}
                    style={{ width: '80%'}}
                >
                    <Form.Input 
                        label='拠点コード'
                        placeholder='拠点コード'
                        name='sectionCode'
                        type='text'
                        value={values.sectionCode}
                        onChange={onChange}
                    />
                    <Form.Input 
                        label='拠点名'
                        placeholder='拠点名'
                        name='sectionName'
                        type='text'
                        value={values.sectionName}
                        onChange={onChange}
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
