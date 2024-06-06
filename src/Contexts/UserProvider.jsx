//React
import { createContext, useContext, useEffect, useState } from 'react'

//propTypes 
import propTypes from 'prop-types'
import { fetchUserData, initializeCsrfProtection } from '../Services/AuthServices/authService';




const UserContext = createContext();


// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
    return useContext(UserContext);
};


const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    //check user if already logged in
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const res1 = await initializeCsrfProtection();
    //         console.log("csrf ,", res1)

    //         const res2 = await fetchUserData();
    //         console.log("fetch user data", res2)
    //         if(res2.success) {
    //             setUser(res2.data)
    //         } 
    //     }
    //     fetchUser()
    // }, [])



    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: propTypes.any
}

export default UserProvider;