import React from 'react'

function AppContext(){

    const Context = React.createContext({})


    return (
        <Context.Provider value={2}>

        </Context.Provider>
    )
}