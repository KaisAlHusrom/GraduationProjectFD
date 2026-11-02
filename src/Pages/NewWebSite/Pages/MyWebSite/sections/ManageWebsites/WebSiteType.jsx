//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components
import { AdminMainButton } from '../../../../../../Components';


import img1 from '../../../../../../Assets/Images/create1.png'
import img2 from '../../../../../../Assets/Images/create2.png'

//MUI
import {
    Box,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import EastIcon from '@mui/icons-material/East';
import { useNavigate } from 'react-router-dom';
//Styled Components
const StyledWebSiteType = styled(Box)(
    ({ theme }) => ({
        display : 'flex',
        justifyContent: "center",
        alignItems: "center",
        flexWrap : 'wrap',
        gap : 20,
        marginBottom: theme.spacing(4)
        
    })
)


const BoxDesign = {
    display: 'flex',
    flexDirection: "column",
    justifyContent : 'start',
    alignItems : 'center',
    width: "400px", 
    border: '1px solid',
    borderColor : (theme) =>
        theme.divider,
    padding : '20px',
    height : '430px',
    borderRadius : '20px',
    '&:hover': {
        borderColor : (theme) =>
            theme.palette.primary.main,
    },
    transition: 'all 0.2s ease-in-out'
}

const WebSiteType = () => {

    const Navigate = useNavigate();


    const handleCreateWebSiteClick= () => {
    Navigate('/profile/create-new-project');
    };


    return (
        <StyledWebSiteType 
        sx={() => ({
            width: '100%',
        })}
        >
            
            <Box 
            sx = {BoxDesign}
            >
                <img src={img1} alt="" style = {{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}/>
                    <Typography
                            variant="h3"
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                alignSelf: 'center',
                                textAlign: 'center',
                                fontSize: '30px',
                            
                            }}
                            >
                            Business Website
                    </Typography>
                    <Typography
                            variant="h6"
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                alignSelf: 'center',
                                textAlign: 'center',
                                fontSize: '20px',

                            }}
                            >
                            Professional multi-lingual website for your business
                    </Typography>
                    <AdminMainButton
                            title = "Create Website"
                            appearance='primary'
                            icon={<EastIcon></EastIcon>}
                            type="custom"
                            filled
                            onClick={handleCreateWebSiteClick}
                            sx = {{
                                marginTop : '20px',
                                color: "primary.contrastText",
                                width : '200px', 
                                '&:hover': {
                                    backgroundColor: 'primary.dark',
                                },
                            }}
                            />

            </Box>
            <Box 
                sx = {BoxDesign}

            >
                <img src={img2} alt="" style = {{
                        width: "100%",
                        height: "100%",
                    }}/>
                    <Typography
                            variant="h3"
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                alignSelf: 'center',
                                textAlign: 'center',
                                fontSize: '30px',
                            }}
                            >
                            Online Store
                    </Typography>
                    <Typography
                            variant="h6"
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                alignSelf: 'center',
                                textAlign: 'center',
                                fontSize: '20px',
                            }}
                            >
                            Add your products & Start selling online today
                    </Typography>
                    <AdminMainButton
                            title = "Create Store"
                            appearance='primary'
                            icon={<EastIcon></EastIcon>}
                            type="custom"
                            filled
                            onClick={handleCreateWebSiteClick}
                            sx = {{
                                marginTop : '20px',
                                color: "primary.contrastText",
                                width : '200px', 
                                '&:hover': {
                                    backgroundColor: 'primary.dark',
                                },
                            }}
                            />
                            

            </Box>

        </StyledWebSiteType>
    );
};

export default WebSiteType;