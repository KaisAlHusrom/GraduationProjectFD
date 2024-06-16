//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components
import SearchInput from '../../../../Components/CustomSearchInput/SearchInput'
import AdminMainButton from '../../../../Components/AdminMainButton/AdminMainButton'
import CustomGrid from  '../../../../Components/CustomGrid/CustomGrid'
//MUI
import {
    Box,
    Typography
} from '@mui/material'
import { styled } from '@mui/system'


// icons 
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { ModalTitleStyle } from '../../sections/EmptyDesign/StylesFunctions/SetStylesFunctions'

//Styled Components
const StyledNewLanguageDrawerModel = styled(Box)(
    ({ theme }) => ({
        padding: theme.spacing(8),
        textAlign: 'center',

    })
)

const StyledOfFiltering = styled(Box)(
    () => ({
        display: 'flex', 
        alignItems:'center',
        justifyContent: 'center',
        color:'white',
        marginBottom: '20px',
        marginTop : '20px',
    })
)
const customSearchStyle = {
    display: 'flex', 
    alignItems:'center',
    justifyContent: 'center',
    color:'white',
};

const filterMenuItems = [
    {
        value: "More Using ",
        icon: <RadioButtonCheckedOutlinedIcon color='primary' />,
        onClick: () => {}
    },
    {
        value: "recent added",
        icon: <RadioButtonCheckedOutlinedIcon color='primary' />,
        onClick: () => {}
    },

]

const items = [
    { height: 120, width: 120, text : "English"},
    { height: 120, width: 120, text : "Arabic"},
    { height: 120, width: 120, text : "Turkish"},
    { height: 120, width: 120, text : "English" },
    { height: 120, width: 120, text : "Arabic"},
    { height: 120, width: 120, text : "Turkish"},
    { height: 120, width: 120, text : "English" },
    { height: 120, width: 120, text : "Arabic"},
    { height: 120, width: 120, text : "Turkish"},
    { height: 120, width: 120, text : "English" },
    { height: 120, width: 120, text : "Arabic" },
    { height: 120, width: 120, text : "Turkish" },
    ];

const NewLanguageDrawerModel = () => {
    
    return (
        <StyledNewLanguageDrawerModel>
            <Typography color = "text.default" sx = {ModalTitleStyle}>
                    Select Language
            </Typography>
            <StyledOfFiltering>
                
            <SearchInput className="custom-search-input" style={customSearchStyle} />
                <AdminMainButton
                title="Filter"
                icon={<FilterAltOutlinedIcon />}
                appearance="secondary"
                menuItems={filterMenuItems}
                type='menu'
                />
                <AdminMainButton
                title="Save"
                icon={<BeenhereIcon />}
                appearance="primary"
                type='custom'
                sx={
                    {
                        color: 'white.main',
                        backgroundColor:'success.dark'
                    }
                }
                />
            </StyledOfFiltering>


            <CustomGrid items={items} textColor="white.main"  backgroundColor="black"  choses/>
            
        </StyledNewLanguageDrawerModel>
    );
};

export default NewLanguageDrawerModel;