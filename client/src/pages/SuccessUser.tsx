import React from 'react'
import SuccessCard from '../components/SuccessCard'

const Success = () => {
    return (
        <>
            <SuccessCard 
                successName='ユーザー情報'
                backPage='/users'
                ContinuePage='/register'
            />
        </>
    )
}

export default Success;
