import React, { FC } from 'react'
import Header from '../components/Header'

type Props = {
    children: any;
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default Layout;
