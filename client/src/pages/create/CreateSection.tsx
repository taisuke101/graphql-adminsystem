import { useMutation } from '@apollo/client';
import React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { Button, Form, Grid } from 'semantic-ui-react';
import { CREATE_SECTION_MUTATION } from '../../graphql/mutation/createSection';
import { useForm } from '../../util/hooks';

type Props = {
} &  {props: {history: string[];}} 
& RouteComponentProps<{uuid: string}>

function CreateSection(props: Props) {

    const uuid = props.match.params.uuid;

    const { values, onChange, onSubmit }: any = useForm(createSectionCallback, {
        sectionCode: '',
        sectionName: ''
    })

    const [createSection, { loading }] = useMutation(CREATE_SECTION_MUTATION, {
        variables: {
            userUuid: uuid,
            sectionCode: values.sectionCode,
            sectionName: values.sectionName
        }
    })

    function createSectionCallback() {
        createSection();
        props.history.push('/users');
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
