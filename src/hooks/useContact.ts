import {useEffect, useState} from "react";

interface ContactState  { 
    subject?: string,
    body?: string,
    inputError?: boolean
    bodyError?: boolean
}

interface ReturnContactValues {
    handleInput?: (e : any) => void,
    body?: string,
    hasError?: () => void,
    inputError?: boolean
    bodyError?: boolean
    subject?: string,
}

function useContact(initialState: string) : ReturnContactValues{
    const [state, setState] = useState<ContactState>({

        subject: initialState,
        body: initialState,
        bodyError: false,
        inputError: false

    })

    const {subject = '', body = '', bodyError, inputError} = state

    const handleInput = (e : any) => {

        
        setState({
            ...state,
            [e.target.name]: e.target.value.trimStart(),
        })

       
    }

    const hasError = () => {
        if(subject === ''){
            setState({
                ...state,
                bodyError: false,
                inputError: true
            })
            return;
        }
        if(body === ''){
            setState({
                ...state,
                inputError: false,
                bodyError: true
            })
            return
        }

        setState({
            ...state,
            bodyError: false,
            inputError: false
        })

    }





    return {
        subject,
        body,
        bodyError,
        hasError,
        inputError,
        handleInput
    }
}

export default useContact