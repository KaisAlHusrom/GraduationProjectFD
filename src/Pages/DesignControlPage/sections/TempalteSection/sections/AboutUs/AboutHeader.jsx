// this page showing the title and description

//React
import {
    
} from 'react'

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

//Styled Components
const StyledAboutHeader = styled(Box)(
    ({ theme }) => ({
    
    })
)


const TooltipContainer = styled(Box)({
    position: 'absolute',
    top: '10%',
    left: '0%',
    zIndex: 100,
    transform: 'translateX(50%)',
    });



    const AboutHeader = ({
            // openDialog,
            // handleOpenDialog,
            tabLabels,
            tabContents,
            selectedOpacity,
            selectedFontSize,
            selectedFontWeight,
            selectedRadius,
            currentColor,
            BackGroundColor,
            TextOfTitle,
            selectedOpacityDescription,
            selectedFontSizeDescription,
            selectedFontWeightDescription,
            selectedRadiusDescription,
            currentColorDescription,
            BackGroundColorDescription,
            TextOfDescription,
    }) => (
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
    <Typography component="div" variant="h4"
            sx={{
                opacity: selectedOpacity,
                fontSize: selectedFontSize,
                fontWeight: selectedFontWeight,
                borderRadius: selectedRadius,
                color: currentColor,
                backgroundColor: BackGroundColor,
                padding: '10px',
                }}
            >{TextOfTitle}</Typography>
    <Typography component="div" variant="h6"
        sx={{
            opacity: selectedOpacityDescription,
            fontSize: selectedFontSizeDescription,
            fontWeight: selectedFontWeightDescription,
            borderRadius: selectedRadiusDescription,
            color: currentColorDescription,
            backgroundColor: BackGroundColorDescription,
            padding: '10px',
            marginTop: '10px',
        }}>{TextOfDescription}</Typography>
    </Box>
    );

export default AboutHeader;









//        // Tooltip Container
