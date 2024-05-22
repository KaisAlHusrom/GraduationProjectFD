//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Typography,
    alpha

} from '@mui/material'
import { styled } from '@mui/system'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { AdminMainButton } from '../../../../../../../Components';
import EastIcon from '@mui/icons-material/East';

//Styled Components
const StyledStartWebSite = styled(Box)(
    ({ theme }) => ({
        width: '100%',
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: '15px'
    })
)
const CircularButton = styled(Box)(({ theme, selected }) => ({
    width: 24,
    height: 24,
    borderRadius: '50%',
    backgroundColor: selected ? theme.palette.primary.main : theme.palette.primary.light,
    position: 'absolute',
    top: 8,
    right: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: theme.palette.primary.contrastText,
}));

const SelectableBox = styled(Box)(({ theme, selected }) => ({
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? theme.palette.text.border : theme.palette.text.border,
    padding: '20px',
    width: '400px',
    borderRadius: '10px',
    marginBottom: '30px',
    height: '150px',
    position: 'relative',
    cursor: 'pointer',
    backgroundColor: selected ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
    marginRight: '30px'
}));

const StartWebSite = ({selectedBoxState , handleBoxClick , handleNextClick }) => {

    const [selectedBox, setSelectedBox] =selectedBoxState;


    const isDisabled = selectedBox === null;


    return (
        <StyledStartWebSite>
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: '30px',
                            marginBottom: '50px',
                            color: (theme) =>
                                theme.palette.mode === 'light' ? 'text.light' : 'text.dark',
                        }}
                    >
                        How would you like to start building your website?
                    </Typography>

                    
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}>
                        <SelectableBox
                            id="Box-simple"
                            selected={selectedBox === 'simple'}
                            onClick={() => handleBoxClick('simple')}
                        >
                            
                        <CircularButton selected={selectedBox === 'simple'}>
                            {selectedBox === 'simple' && <CheckCircleIcon />}
                        </CircularButton>

                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: '30px',
                                marginBottom: '20px',
                                color: (theme) =>
                                    theme.palette.mode === 'light' ? 'text.light' : 'text.dark',
                            }}
                        >
                            Simple
                        </Typography>
                        
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: '20px',
                                marginBottom: '20px',
                                color: (theme) =>
                                    theme.palette.mode === 'light' ? 'text.secondary' : 'text.secondary',
                            }}
                        >
                            Start with Cliser pre-built sections
                        </Typography>

                        </SelectableBox>

                        <SelectableBox
                            id="Box-advanced"
                            selected={selectedBox === 'advanced'}
                            onClick={() => handleBoxClick('advanced')}
                        >

                        <CircularButton selected={selectedBox === 'advanced'}>
                            {selectedBox === 'advanced' && <CheckCircleIcon />}
                        </CircularButton>

                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: '30px',
                                marginBottom: '20px',
                                color: (theme) =>
                                    theme.palette.mode === 'light' ? 'text.light' : 'text.dark',
                            }}
                        >
                            Advanced
                        </Typography>

                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: '20px',
                                marginBottom: '20px',
                                color: (theme) =>
                                    theme.palette.mode === 'light' ? 'text.secondary' : 'text.secondary',
                            }}
                        >
                            Start with Wuilt’s new advanced custom section builder
                        </Typography>
                        
                        </SelectableBox>
                        </Box>

                        <AdminMainButton
                        title="Next"
                        appearance="primary"
                        filled
                        type="custom"
                        disabled={isDisabled}
                        onClick={handleNextClick}
                        icon={<EastIcon />}
                        sx = {{
                            marginTop : '20px',
                            color: "primary.contrastText",
                            width : '200px', 
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            },
                        }}
                    />
                    
        </StyledStartWebSite>
    );
};

export default StartWebSite;