import { useMutation } from '@apollo/client';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Form, Grid } from 'semantic-ui-react';

import { UPDATE_SECTION_MUTATION } from '../../graphql/mutation/updateSection';
import { FETCH_USER_DETAIL_QUERY } from '../../graphql/query/fetchUserDetail';
import { useForm } from '../../util/hooks';

type Props = 
    {props: {history: string[];}} 
    & RouteComponentProps<{userId: string}>

function UpdateSection(props: Props) {
    const userId = props.match.params.userId;

    //TODO 型付け
    const { values, onChange, onSubmit }: any = useForm(updateSectionCallback, {
        sectionCode: '',
        sectionName: ''
    })

    const [ updateSection ] = useMutation(UPDATE_SECTION_MUTATION, {
        variables: {
            userId: userId,
            sectionCode: values.sectionCode,
            sectionName: values.sectionName
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
            values.body=''
        }
    })

    function updateSectionCallback() {
        updateSection();
        props.history.push(`/detail/${userId}`);
    }

    return (
        <Grid divided>
            <Grid.Row>
                <h1>拠点情報変更</h1>
            </Grid.Row>
            <Grid.Row>
                <Form
                    onSubmit={onSubmit}
                    noValidate
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
                    <Button type='submit' color='blue'>
                        変更
                    </Button>
                </Form>
            </Grid.Row>
        </Grid>
    )
}

export default UpdateSection;
