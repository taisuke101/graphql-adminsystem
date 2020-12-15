import { useState } from 'react'

export const useForm = (callback: any, initialState = {}) => {

    const [ values, setValues ] = useState(initialState);

    const onChange = (event: { target: { name: any; value: any; }; }) => {
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





