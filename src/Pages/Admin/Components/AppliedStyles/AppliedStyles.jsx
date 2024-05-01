//React
import { useEffect, useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Button,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'

//prism
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { useMyCreateElementContext } from '../CreateElementTemplate/CreateElementTemplate'
import { extractStyles } from '../../../../Helpers/RecursiveHelpers/extractStyles'

//Styled Components
const StyledAppliedStyles = styled(Box)(
    ({ theme }) => ({
        position: "relative"
    })
)

const StyledCopyButton = styled(Button)(
    ({theme}) => ({
        position: "absolute",
        top: 2,
        right: 2,
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        borderRadius: theme.spacing(2)
    })
)

const StyledPre = styled('pre')(
    ({theme}) => ({
        borderRadius: theme.spacing(2)
    })
)

const AppliedStyles = () => {

    useEffect(() => {
        Prism.highlightAll();
    }, []);

    const [copied, setCopied] = useState(false);

    const {template, selectedSubElementIds} = useMyCreateElementContext()
    const appliedStyles = useMemo(() => {
        if(template && selectedSubElementIds.length > 0) {
            const updatedSelectedTemplate = JSON.parse(JSON.stringify(template));
            const styles = extractStyles([updatedSelectedTemplate], selectedSubElementIds)
            return styles
        }
        return null
    }, [selectedSubElementIds, template])

    console.log(appliedStyles)

    const [writtenStyle, setWrittenStyle] = useState(() => {
        return `{
    backgroundColor: 'white',
    position: 'relative',
}
`
    })


    const handleCopyCode = () => {

        navigator.clipboard.writeText(writtenStyle)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
            })
            .catch(err => console.error('Failed to copy code: ', err));
    };

    return (
        <StyledAppliedStyles className='Code'>
                    <StyledPre>
                        <code className={`language-javascript`}>
                        {writtenStyle}
                        </code>
                        
                    </StyledPre>
                    <StyledCopyButton onClick={handleCopyCode}>{copied ? 'Copied!' : 'Copy Style'}</StyledCopyButton>
        </StyledAppliedStyles>
    );
};

AppliedStyles.propTypes = {
    children: propTypes.array
}

export default AppliedStyles;