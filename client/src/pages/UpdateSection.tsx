import { useQuery, useMutation } from '@apollo/client';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Form, Grid } from 'semantic-ui-react';

import { UPDATE_SECTION_MUTATION } from '../graphql/mutation/updateSection';
import { FETCH_USER_QUERY } from '../graphql/query/fetchUser';
import { FETCH_USER_DETAIL_QUERY } from '../graphql/query/fetchUserDetail';
import { useForm } from '../util/hooks';

type Props = 
    {props: {history: string[];}} 
    & RouteComponentProps<{uuid: string}>

function UpdateSection(props: Props) {
    const uuid = props.match.params.uuid

    const { values, onChange, onSubmit }: any = useForm(updateSectionCallback, {
        sectionCode: '',
        sectionName: ''
    })

    const { loading, data } = useQuery(FETCH_USER_DETAIL_QUERY, {
        variables: {
            uuid
        }
    })
    
    const userSectionCode = data.getUser.section[0].sectionCode;

    const [ updateSection ] = useMutation(UPDATE_SECTION_MUTATION, {
        variables: {
            userSectionCode: userSectionCode,
            sectionCode: values.sectionCode,
            sectionName: values.sectionName
        },
        update(proxy) {
            const data: any = proxy.readQuery({
                query: FETCH_USER_QUERY
            })
            proxy.writeQuery({ query: FETCH_USER_QUERY, data: {
                getUser: [
                    data
                ]
            }})
            values.body=''
        }
    })

    function updateSectionCallback() {
        updateSection();
        props.history.push(`/detail/${uuid}`);
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
                    className={loading ? 'loading' : ''}
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
