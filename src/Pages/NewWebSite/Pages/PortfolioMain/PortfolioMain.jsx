//React
import { createContext, useContext, useMemo } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Container
} from '@mui/material'
import { styled } from '@mui/system'
import PortfolioHeader from './components/PortfolioHeader/PortfolioHeader'
import useEffectFetchData from '../../../../Helpers/customHooks/useEffectFetchData'
import { fetchSpecificUserUsers } from '../../../../Services/UserServices/Services/usersUsersService'
import { useParams } from 'react-router-dom'
import ProfileAppBar from '../../Components/ProfileAppBar/ProfileAppBar'
import ProfileFooter from '../../Components/ProfileFooter/ProfileFooter'
import PortfolioTabs from './components/PortfolioTabs/PortfolioTabs'

//Context
const UserContext = createContext();

//Styled Components
const StyledPortfolioMain = styled(Box)(
    () => ({
        width: '100%',
        display: 'flex',
        flexDirection: 'column',

    })
)


const PortfolioMain = () => {
    const {user_id} = useParams()
    const params = useMemo(() => {
        return [
            user_id
        ]
    }, [user_id])

    const {data: user} = useEffectFetchData(fetchSpecificUserUsers, params, true, true)


    return (
        <UserContext.Provider value={{
            user,
        }}>
            <StyledPortfolioMain>
                <ProfileAppBar />

                <Container maxWidth={'xl'}
                    sx={{
                        mt: 8,
                        padding: theme => `${theme.spacing(4)} ${theme.spacing()}`
                    }}
                >

                    <PortfolioHeader />

                    <PortfolioTabs />
                </Container>
                

                <ProfileFooter />
            </StyledPortfolioMain>
        </UserContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
    return useContext(UserContext);
};

export default PortfolioMain;