import React from 'react'
import {useContext} from 'react'

function AppContext(){

    const Context = React.createContext({})
    export const useAppContext = () => {
        return useContext(Context)
    }


    return (
        <Context.Provider value={{
            
        }}>

        </Context.Provider>
    )
}