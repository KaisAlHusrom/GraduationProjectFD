//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

//config
import config from "../../../../../../../../Config.json"



//MUI
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
} from '@mui/material'
import { styled } from '@mui/system'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

//propTypes 
import propTypes from 'prop-types'
import { logoFolderName } from '../../../../../../../Services/UserServices/Services/webProjectsUsersService'

//Components
import { AdminMainButton } from '../../../../../../../Components'


//Styled Components
const StyledCustomWebProductCard = styled(Card)(
    () => ({
        maxWidth: 345
    })
)


const CustomWebProductCard = ({webProject}) => {


    const imagePath = useMemo(()=> {
        return `${config.ServerImageRoute}/${logoFolderName}/${webProject?.project_logo}`
    }, [webProject?.project_logo])

    return (
        <StyledCustomWebProductCard>
            <CardMedia
                sx={{ height: 140 }}
                image={imagePath}
                title={webProject.project_title}
            />
            <CardContent sx={{textAlign: "left"}}>
                <Typography gutterBottom variant="h5" component="div">
                {webProject.project_title}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                {webProject.project_type}
                </Typography>
                <Typography variant="body2" color="text.secondary"overflow={"hidden"} textOverflow={'ellipsis'} whiteSpace={'nowrap'}>
                {webProject.project_description}
                </Typography>
            </CardContent>
            <CardActions>
                <AdminMainButton
                            title='Watches'
                            type='custom'
                            appearance='iconButton'
                            icon={<RemoveRedEyeOutlinedIcon />}
                            onClick={() => {}}
                            putTooltip
                            toolTipPosition={'top'}
                        />
                    <AdminMainButton
                        title='Edit'
                        type='custom'
                        appearance='iconButton'
                        icon={<EditOutlinedIcon />}
                        onClick={() => {}}
                        putTooltip
                        toolTipPosition={'top'}
                    />
            </CardActions>
        </StyledCustomWebProductCard>
    );
};

CustomWebProductCard.propTypes = {
    webProject: propTypes.object
}

export default CustomWebProductCard;