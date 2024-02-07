//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components
import CustomCard from '../../../../Components/CustomCard/CustomCard'
import SearchInput from '../../../../Components/CustomSearchInput/SearchInput'
import AdminMainButton from '../../../../Components/AdminMainButton/AdminMainButton'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'


// icons 
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';



//Styled Components
const StyledTemplatesDrawerModel = styled(Box)(
    ({theme}) => ({
        padding: theme.spacing(8)
    })
)


const customSearchStyle = {
    display: 'flex', 
    alignItems:'center',
    justifyContent: 'center',
    color:'white',
};

const StyledOfFiltering = styled(Box)(
    () => ({
        display: 'flex', 
        alignItems:'center',
        justifyContent: 'center',
        color:'white',
        marginBottom: '20px',
    })
)

const StyledOfCards = styled(Box)(
    () => ({
        display: 'flex', 
        alignItems:'center',
        justifyContent: 'space-between',
        color:'white',
        marginBottom: '20px',
        flexWrap: 'wrap',
    })
)
const filterMenuItems = [
    {
        value: "show blog",
        icon: <RadioButtonCheckedOutlinedIcon color='primary' />,
        onClick: () => {}
    },
    {
        value: "show e-commerce",
        icon: <RadioButtonCheckedOutlinedIcon color='primary' />,
        onClick: () => {}
    },

]

const ButtonsItems = [
    {
        name: "show Template",
        onClick: () => {console.log("Show all users")}
    },
 
 
]


const TemplatesDrawerModel = () => {
    return (
        <StyledTemplatesDrawerModel>
            <StyledOfFiltering>
            <SearchInput className="custom-search-input" style={customSearchStyle} />
                <AdminMainButton
                title="Filter"
                icon={<FilterAltOutlinedIcon />}
                appearance="secondary"
                menuItems={filterMenuItems}
                type='menu'
                />
            </StyledOfFiltering>
            <StyledOfCards>
                <CustomCard
                name="Example Card"
                description="This is an example card with buttons"
                buttons={ButtonsItems} 
                image="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"/>
                <CustomCard
                name="Example Card"
                description="This is an example card with buttons"
                buttons={ButtonsItems}
                image="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"/>
                <CustomCard
                name="Example Card"
                description="This is an example card with buttons"
                buttons={ButtonsItems}
                image="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"/>
                <CustomCard
                name="Example Card"
                description="This is an example card with buttons"
                buttons={ButtonsItems}
                image="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"/>
                <AdminMainButton
                title="Show All The Templates"
                icon={<VisibilityIcon />}
                type='custom'
                sx={{
                    marginTop: '10px',
                    width: '100%',
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    padding: '10px 15px',
                    fontWeight: 'bold',
                    color: 'white.main',
                    backgroundColor:'success.dark'
                }}
                />
            </StyledOfCards>
        </StyledTemplatesDrawerModel>
    );
};

export default TemplatesDrawerModel;