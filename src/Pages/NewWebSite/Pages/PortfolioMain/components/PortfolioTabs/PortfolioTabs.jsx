//React
import { useState } from 'react'

import { useSelector } from 'react-redux'

//Components


//MUI
import {
    Box,
    Tabs,
    Tab,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import MyProductsTab from '../MyProductsTab/MyProductsTab'
import MyWebProjectsTab from '../MyWebProjectsTab/MyWebProjectsTab'
import { AdminMainButton } from '../../../../../../Components'
import AddIcon from '@mui/icons-material/Add';
import { useUserContext } from '../../PortfolioMain'
import { useNavigate } from 'react-router-dom'
//Styled Components
const StyledPortfolioTabs = styled(Box)(
    ({ theme }) => ({
        padding: theme.spacing(),

    })
)

const ActionsBox = styled(Box)(
    () => ({

    })
);

const StyledTabsHeader = styled(Box)(
    ({ theme }) => ({
        borderBottom: 1, 
        borderColor: 'divider', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        [theme.breakpoints.down("sm")]: {
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: theme.spacing(2),
            alignItems: 'flex-start',
            marginLeft: theme.spacing(4)
        }
    })
);

const PortfolioTabs = () => {
    const {user: profileUser} = useUserContext()

    const user = useSelector(state => state.authSlice.user)


    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const navigate = useNavigate()
    const handleAddClick = () => {
        switch(value) {
            case 0:
                navigate('/profile/add-product')
                break;
            case 1: 
                navigate('/profile/web-projects')
                break;
        }

    }
    return (
        <StyledPortfolioTabs>
            <StyledTabsHeader>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Products" id={0} />
                    <Tab label="Web Projects"  id={1}  />
                </Tabs>
                {
                    profileUser?.id === user?.id
                    &&
                    <ActionsBox>
                        <AdminMainButton
                            title={value === 0 ? 'Add Product' : value === 1 ? "Add Web Project" : ""}
                            icon={<AddIcon />}
                            appearance='primary'
                            putBorder
                            filled
                            sx={{
                                borderRadius: 2,
                                width: "100%",
                                
                            }}
                            type='custom'
                            onClick={handleAddClick}
                        />
                    </ActionsBox>
                }
            </StyledTabsHeader>
                <CustomTabPanel value={value} index={0}>
                    <MyProductsTab />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <MyWebProjectsTab />
                </CustomTabPanel>
        </StyledPortfolioTabs>
    );
};

PortfolioTabs.propTypes = {
    children: propTypes.array
}

export default PortfolioTabs;


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}