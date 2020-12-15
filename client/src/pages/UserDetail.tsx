import { useQuery } from '@apollo/client'
import React from 'react'
import {RouteComponentProps} from 'react-router-dom'

import { Card, Grid } from 'semantic-ui-react';
import AllCreateButton from '../components/AllCreateButton';
import AllDeleteButton from '../components/AllDeleteButton';
import AllUpdateButton from '../components/AllUpdateButton';
import { FETCH_USER_DETAIL_QUERY } from '../graphql/query/fetchUserDetail';
import { UserProps } from '../interfaces/User';

type PageProps = {data: UserProps} & RouteComponentProps<{uuid: string}>

function UserDetailCard(props: PageProps) {
    const uuid = props.match.params.uuid    

    const { loading, data } = useQuery(FETCH_USER_DETAIL_QUERY, {
        variables: {
            uuid
        }
    })

    function deleteCallback() {
        props.history.push('/users');
    }
    
    return (
        <Grid divided>
            <Grid.Row>
                <h1>社員詳細データ</h1>
            </Grid.Row>
            {
                loading
                ?  ( <h1>Loading ...</h1> )
                : (
                    <Grid.Row>
                        <h1>ユーザー情報</h1>
                        <Card style={{width: '100%'}}>
                            <Card.Content >
                                <Card.Header>
                                    ユーザーID: 
                                    {
                                        data.getUser.userId
                                        ? data.getUser.userId
                                        : '未登録'
                                    }</Card.Header>
                                <Card.Header>
                                    性(英字): 
                                    {
                                        data.getUser.employee[0]
                                        ? data.getUser.employee[0].lastName
                                        : '未登録'
                                    }
                                </Card.Header>
                                <Card.Header>
                                    名(英字): 
                                    {
                                        data.getUser.employee[0]
                                        ? data.getUser.employee[0].firstName
                                        : '未登録'
                                    }
                                </Card.Header>
                                <Card.Header>
                                    性: 
                                    {
                                        data.getUser.employee[0]
                                        ? data.getUser.employee[0].lastKanaName
                                        : '未登録'
                                    }
                                </Card.Header>
                                <Card.Header>名: 
                                    {
                                        data.getUser.employee[0]
                                        ? data.getUser.employee[0].firstKanaName
                                        : '未登録'
                                    }
                                </Card.Header>
                                <Card.Header>
                                    性別: 
                                    {
                                        data.getUser.employee[0]
                                        ? data.getUser.employee[0].gender
                                        : '未登録'
                                    }
                                    </Card.Header>
                                <Card.Header>
                                    誕生日: 
                                    {
                                        data.getUser.employee[0]
                                        ? data.getUser.employee[0].birthDay
                                        : '未登録'
                                    }
                                </Card.Header>
                                <Card.Header>
                                    入社日: 
                                    {
                                        data.getUser.employee[0]
                                        ? data.getUser.employee[0].hireDate
                                        : '未登録'
                                    }
                                </Card.Header>
                                {
                                    !data.getUser.employee[0]
                                    ? (<AllCreateButton 
                                        info='ユーザー情報'
                                        createTo='employees'
                                        uuid={uuid}
                                    />)
                                    : ''
                                }
                                {
                                    data.getUser.employee[0]
                                    ? (<AllUpdateButton 
                                        info='ユーザー情報'
                                        updateTo='employees'
                                        uuid={uuid}
                                    />)
                                    : ''
                                }
                                {
                                    data.getUser.employee[0]
                                    ? (<AllDeleteButton 
                                        employeeCode={data.getUser.employee[0].employeeCode}
                                        info='ユーザー情報'
                                        callback={deleteCallback}
                                    />)
                                    : ''
                                }
                            </Card.Content>
                        </Card>
                        <Grid.Row>
                            <h1>拠点情報</h1>
                        </Grid.Row>
                        <Card style={{width: '100%'}}>
        <Card.Content>
            <Card.Header>
                拠点コード: 
                {
                    data.getUser.section[0]
                    ?  data.getUser.section[0].sectionCode
                    : '未登録'
                }
            </Card.Header>
            <Card.Header>
                拠点名: 
                {
                    data.getUser.section[0]
                    ? data.getUser.section[0].sectionName
                    : '未登録'
                }
            </Card.Header>
            {
                !data.getUser.section[0]
                ? (<AllCreateButton 
                    info='拠点情報'
                    createTo='sections'
                    uuid={uuid} 
                />)
                : ''
            }
            {
                data.getUser.section[0]
                ? (<AllUpdateButton 
                    info='拠点情報'
                    updateTo='sections'
                    uuid={uuid}
                />)
                : ''
            }
            {
                data.getUser.section[0]
                ? (<AllDeleteButton 
                    sectionCode={data.getUser.section[0].sectionCode}
                    info='拠点情報'
                    callback={deleteCallback}
                />)
                : ''
            }
        </Card.Content>
    </Card>
                        <AllDeleteButton 
                            uuid={uuid}
                            info='全てのユーザー情報'
                            callback={deleteCallback}
                        />
            </Grid.Row>
        )
            }
        </Grid>
    )
}

export default UserDetailCard;
