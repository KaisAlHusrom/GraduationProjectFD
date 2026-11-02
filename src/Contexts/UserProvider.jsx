//React
import { useEffect } from 'react'

//propTypes 
import propTypes from 'prop-types'
import { fetchUserData } from '../Services/AuthServices/authService';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../Redux/Slices/authSlice';


const UserProvider = ({children}) => {

    const dispatch = useDispatch()

    //check user if already logged in
    useEffect(() => {
        const fetchUser = async () => {
            // const res1 = await initializeCsrfProtection();
            // console.log("csrf ,", res1)

            const res2 = await fetchUserData();
            console.log("fetch user data", res2)
            if(res2.success) {
                dispatch(setUserInfo({user: res2.data}))
            } 
        }
        fetchUser()
    }, [dispatch])



    return (
        <>
            {children}
        </>
    );
};

UserProvider.propTypes = {
    children: propTypes.any
}

export default UserProvider;