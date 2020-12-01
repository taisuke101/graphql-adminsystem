import React, { FC } from 'react'

import { EmployeeProps } from '../interfaces/Employee'
import { SectionProps } from '../interfaces/Section'
import { UserProps } from '../interfaces/User'

import { Card } from 'semantic-ui-react'

type UserDetailProps = UserProps & EmployeeProps & SectionProps

const UserDetailCard: FC<UserDetailProps> = (props) => {
    return (
        <Card.Group>
            <Card>
                <Card.Content>
                    <Card.Header>
                        { props.userId }
                    </Card.Header>
                </Card.Content>
            </Card>
        </Card.Group>
    )
}

export default UserDetailCard
