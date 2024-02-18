//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//router
import { NavLink, useLocation } from 'react-router-dom';

//Components

//Helpers
import StringHelper from '../../Helpers/StringsHelper';


//MUI
import {
    Paper,
    Breadcrumbs,
    Typography
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

//Styled Components
const StyledCustomBreadcrumbs = styled(Paper)(
    ({ theme }) => ({
        display: "flex",
        alignItems: "center",
        padding: `${theme.spacing()} ${theme.spacing()}`,
    })
)

const StyledBreadcrumbs = styled(Breadcrumbs) (
    () => ({
        "   .MuiBreadcrumbs-li": {
            display: "flex",
            alignItems: "center",
        }
    })
)

const StyledLink = styled(NavLink)(
    ({ theme }) => ({
        color: theme.palette.primary.main,
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline"
        }
    })
)



//Routes
// const breadcrumbNameMap = {
//     '/admin-dashboard/users': 'Users',
// };



const CustomBreadcrumbs = () => {
    //Location
    const location = useLocation()
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <StyledCustomBreadcrumbs elevation={0}>
            <StyledBreadcrumbs>
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const capitalizedValue = StringHelper.capitalizeEachWord(value);

                return last ?  (
                <Typography color="text.secondary" key={to}>
                    {StringHelper.capitalizeEachWord(StringHelper.removeHyphens(capitalizedValue))}
                </Typography>
                ) : 
                index !== 0 
                ?
                (
                <StyledLink to={to} key={to}>
                    {StringHelper.capitalizeEachWord(StringHelper.removeHyphens(capitalizedValue))}
                </StyledLink>
                )
                :
                (
                <StyledLink to={to} key={to} >
                    <HomeOutlinedIcon sx={{
                        marginBottom: "2px",
                    }} color='primary' />
                    Home
                </StyledLink>
                )
            })}
            </StyledBreadcrumbs>
        </StyledCustomBreadcrumbs>
    );
};

export default CustomBreadcrumbs;