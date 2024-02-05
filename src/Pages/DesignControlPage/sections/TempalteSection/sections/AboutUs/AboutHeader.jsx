// this page showing the title and description


//React
import { useState } from 'react'

import {
    
} from 'react-redux'


//Components
import { AdminMainButton } from '../../../../../../Components';

//MUI
import {
    Box,
    Typography
} from '@mui/material'
import { styled } from '@mui/system'
// AboutHeader.jsx
import { Edit as EditIcon } from '@mui/icons-material';
import CustomVerticalTabs from '../../components/CustomVerticalTabs';
import TextContentTaP from '../../components/TextContentTaP';

//Styled Components
const StyledAboutHeader = styled(Box)(
    () => ({
    
    })
)


const TooltipContainer = styled(Box)({
    position: 'absolute',
    top: '10%',
    left: '0%',
    zIndex: 100,
    transform: 'translateX(50%)',
    });

    


const AboutHeader = () => {



    const [HeaderTexts, setHeaderTexts] = useState([
    {
            sx : {
                color : 'black',
                opacity: 1,
                backgroundColor:'',
                borderRadius:'0',
                fontSize: "16",
                fontWeight: '700',
                padding:"10px"
            },
            text:"Example title 1"
        },
    ]);
    const [HeaderDescription, setHeaderDescription] = useState([
        {
                sx : {
                    color : 'black',
                    opacity: 1,
                    backgroundColor:'',
                    borderRadius:'0',
                    fontSize: "16",
                    fontWeight: '700',
                    padding:"10px"
                },
                text:"Example Description 1"
            },
    ]);
        
    const tabLabels = [ 'Title' , 'Description'];
    // Define tab contents
    const tabContents = [
        () => <TextContentTaP 
        NameOfBox="Title"
        setTextOfHeader = {setHeaderTexts} 
        TextOfHeader= {HeaderTexts} 
        />,
        () => <TextContentTaP 
        NameOfBox="Description"
        setTextOfHeader = {setHeaderDescription} 
        TextOfHeader= {HeaderDescription} 
        />,
        ];

    return (
        <StyledAboutHeader>
            <Box className="AboutHeader" 
            sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            padding: '20px',
        }}>
    {/* Tooltip Container for Edit Nav button */}
    <TooltipContainer>
    <AdminMainButton
            title='Edit About us Content'
            type='modal'
            appearance='iconButton'
            putTooltip
            icon={<EditIcon />}
            willShow={
            <CustomVerticalTabs  tabLabels={tabLabels} tabContents={tabContents}/>
            }
            sx={{
                border: '1px solid red',
                padding: '10px 15px',
                fontWeight: 'bold',
                color: 'white.main',
                backgroundColor: 'primary.dark',
            }}
        />
    </TooltipContainer>

        {HeaderTexts.map((item, index) => (
        <Typography
            key={index}
            sx={item.sx}
            component="div"
            variant="h6"
        >
            {item.text}
        </Typography>
        ))}

        {HeaderDescription.map((item, index) => (
            <Typography
                key={index}
                sx={item.sx}
                component="div"
                variant="h6"
            >
                {item.text}
            </Typography>
            ))}
                </Box>
        </StyledAboutHeader>
    );
};

export default AboutHeader;