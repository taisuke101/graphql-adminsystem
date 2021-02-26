import { useState } from 'react'

// TODO 型付け
export const useForm = (callback: any, initialState = {}) => {

    const [ values, setValues ] = useState(initialState);

    const onChange = (event: { target: { name: string, value: string }; }) => {
        setValues({ ...values, [event.target.name]: event.target.value})
    }

    const onSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        callback();
    }

    return {
        onChange,
        onSubmit,
        values
    }
}





