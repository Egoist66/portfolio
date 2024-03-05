import React, {ReactNode} from 'react'
import {useContext} from 'react'
import useMenuToggle from '../hooks/useMenuToggle'
import useContact from '../hooks/useContact'


interface AppContextValues {
    isToggled?: boolean,
    toggleMenu?: () => void,
    handleInput?: (e: any) => void,
    body?: string,
    bodyError?: boolean,
    hasError?: () => void,
    subject?: string,
    inputError?: boolean
}


const Context = React.createContext<AppContextValues | null>(null)
export const useAppContext = () => {
    return useContext(Context)
}


interface AppContextChildren {
    children: ReactNode
}

function AppContext({children}: AppContextChildren) {

    const {isToggled, toggleMenu} = useMenuToggle()
    const {handleInput, subject, body, inputError, bodyError, hasError} = useContact('')

    const data: AppContextValues = {
        isToggled,
        toggleMenu,
        hasError,
        body,
        bodyError,
        subject,
        inputError,
        handleInput

    }


    return (
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    )
}

export default AppContext