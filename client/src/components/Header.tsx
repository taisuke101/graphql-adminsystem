import { FC, useState } from "react";
import { Link } from 'react-router-dom';

import { HeaderType }from '../interfaces/HeaderType'
import { Event } from '../interfaces/Event';

import { Menu } from 'semantic-ui-react';

const Header: FC = () => {

    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substr(1);
    const [ activeItem, setActiveItem ] = useState(path);
    // TODO イベントの型の指定
    const handleItemClick: any = (e: Event, { name }: HeaderType) => setActiveItem(name);

    return (
        <Menu pointing secondary size='massive' color='teal'>
            <Menu.Item 
                name='Home'
                active={activeItem === 'Home'}
                onClick={handleItemClick}
                as={Link}
                to='/'
            />
            <Menu.Menu position='right'>
                <Menu.Item 
                    name='社員一覧'
                    active={activeItem === '社員一覧'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/users'
                />
                <Menu.Item 
                    name='新規登録'
                    active={activeItem === '新規登録'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/register'
                />
            </Menu.Menu>
        </Menu>
    )
}

export default Header
