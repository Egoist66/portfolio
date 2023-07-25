import { useState } from "react";

interface ContactState  { 
    subject?: string,
    body?: string,
}

interface ReturnContactValues {
    handleInput?: (e : any) => void,
    body?: string,
    subject?: string,
}

function useContact(initialState: string) : ReturnContactValues{
    const [state, setState] = useState<ContactState>({

        subject: initialState,
        body: initialState,
    })

    const {subject = '', body = ''} = state

    const handleInput = (e : any) => {

        
        setState({
            ...state,
            [e.target.name]: e.target.value.trimStart(),
        })

       
    }

    return {
        subject,
        body,
        handleInput
    }
}

export default useContact