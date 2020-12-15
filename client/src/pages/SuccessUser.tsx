import React from 'react'
import SuccessCard from '../components/SuccessCard'

const Success = () => {
    return (
        <>
            <SuccessCard 
                successName='ユーザー情報'
                whatToDo='登録'
                backPage='/users'
                continuePage='/register'
            />
        </>
    )
}

export default Success;
