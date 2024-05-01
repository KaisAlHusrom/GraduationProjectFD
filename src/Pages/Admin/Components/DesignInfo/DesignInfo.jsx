//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Skeleton,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbOnOutlinedIcon from '@mui/icons-material/DoNotDisturbOnOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

//propTypes 
import propTypes from 'prop-types'
import { AdminMainButton } from '../../../../Components'
import StringHelper from '../../../../Helpers/StringsHelper';

//Styled Components
const StyledDesignInfo = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(2),
    })
)

const StyledBox = styled(Box)(
    () => ({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    })
);

const DesignInfo = ({design}) => {
    return (
        <StyledDesignInfo>
            {
                Object.keys(design)?.length > 0
                ?
                (
                    Object.entries(design).map(([key,value], index) => {
                        if (key !== "children") {
                            return (
                                <StyledBox key={index}>
                                    <Typography variant="h7">{StringHelper.capitalizeEachWord(key.split('_').join(" "))}</Typography>
                                    
                                        {
                                                typeof value === 'object' && value !== null
                                                ?
                                                    <AdminMainButton
                                                        title='Info'
                                                        type='modal'
                                                        modalIcon={<InfoOutlinedIcon />}
                                                        willShow={<DesignInfo design={value} />}
                                                        appearance='iconButton'
                                                        putBorder
                                                        icon={<VisibilityOutlinedIcon />}
                                                    />
                                                :
                                                value === null 
                                                    ?
                                                    <DoNotDisturbOnOutlinedIcon color="error" /> 
                                                    : 
                                                        value === true
                                                        ?   
                                                            <CheckIcon color='success' />
                                                        :
                                                        value === false 
                                                        ?
                                                            <CloseIcon color="error" /> 
                                                        :
                                                    <Typography variant="subtitle1">{value}</Typography>
                                        }
                                    
                                </StyledBox>
                            )
                        }
                        
                    })
                )
                :(
                    <Skeleton width="100%" animation="wave" />
                )
            }
        </StyledDesignInfo>
    );
};

DesignInfo.propTypes = {
    design: propTypes.object
}

export default DesignInfo;