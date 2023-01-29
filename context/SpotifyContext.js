import React, { useReducer } from "react"
import { SpotifyReducer } from "./SpotifyReducer"

export const SpotifyContext = React.createContext()

const SpotifyContextProvider = (props) => {

    const [state, dispatch] = useReducer(SpotifyReducer, {
        token: ''
    })

    return (
        <SpotifyContext.Provider value={{ state, dispatch }}>
            {props.children}
        </SpotifyContext.Provider>
    )
}

export default SpotifyContextProvider