//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

//propTypes 
import propTypes from 'prop-types'
import { AdminMainButton } from '../../../../Components'
import { useMyCreateElementContext } from '../CreateElementTemplate/CreateElementTemplate';

//Styled Components
const StyledDesignOptions = styled(Box)(
    ({ theme }) => ({
        width: "90%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `${0} ${theme.spacing(2)}`,
    })
)

const StyledSubOptions = styled(Box)(
    ({ theme }) => ({
        width: "50%",
        display: "flex",
        alignItems: "center",
        gap: theme.spacing()
    })
);


const DesignOptions = (props) => {
    const {
        handleRedo,
        handleUndo,
        history,
        redoHistory
    } = props;

    const {
        mode
    } = useMyCreateElementContext()

    const handleCustomUndo = () => {
        handleUndo()
    }

    const handleCustomRedo = () => {
        handleRedo()
    }

    return (
        <StyledDesignOptions>
            <StyledSubOptions>
                <AdminMainButton 
                    title='Undo'
                    type='custom'
                    appearance='iconButton'
                    putBorder
                    icon={<UndoIcon />}
                    putTooltip
                    toolTipPosition={"top"}
                    onClick={handleCustomUndo}
                    disabled={mode === null || history.length === 0}
                />
                <AdminMainButton 
                    title='Redo'
                    type='custom'
                    appearance='iconButton'
                    putBorder
                    icon={<RedoIcon />}
                    putTooltip
                    toolTipPosition={"top"}
                    onClick={handleCustomRedo}
                    disabled={mode === null || redoHistory.length === 0}
                />
            </StyledSubOptions>
        </StyledDesignOptions>
    );
};

DesignOptions.propTypes = {
    handleRedo: propTypes.func,
    handleUndo: propTypes.func,
    history: propTypes.array,
    redoHistory: propTypes.array,
}

export default DesignOptions;