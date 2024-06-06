//React
import { createContext, useContext, useEffect, useState } from 'react'

//propTypes 
import propTypes from 'prop-types'
import { isTokenValid } from '../Helpers/utils/auth';




const TokenContext = createContext();


// eslint-disable-next-line react-refresh/only-export-components
export const useTokenContext = () => {
    return useContext(TokenContext);
};


const TokenProvider = ({children}) => {
    const [token, setToken] = useState(null);
    //check if token valid
    useEffect(() => {
        const valid = isTokenValid()
        if(!valid) {
            setToken(null);
        } 
    }, [])


    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
};

TokenProvider.propTypes = {
    children: propTypes.any
}

export default TokenProvider;