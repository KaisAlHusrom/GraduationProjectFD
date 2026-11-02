//React
import { useMemo, useState } from 'react'

import config from '../../../../../Config.json'

import { useSelector } from 'react-redux'

//Components


//MUI
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

//icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { logoFolderName } from '../../../../Services/UserServices/Services/webProjectsUsersService';
import DateHelper from '../../../../Helpers/DateHelper';
import { AdminMainButton } from '../../../../Components';
import { useUserContext } from '../../Pages/PortfolioMain/PortfolioMain';
import { navigateWebProject, navigateWebProjectPreview } from '../../../../Helpers/navigations';

//Styled Components
const StyledWebProjectCard = styled(Card)(
    () => ({
    
    })
)

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
}));


const WebProjectCard = ({project, profilePage}) => {

    
    const user = useSelector(state => state.authSlice.user)
    
    const {user: profileUser} = useUserContext() || {user: user}
    
    //expand details
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    //logo path
    const imagePath = `${config.ServerImageRoute}/${logoFolderName}/${project?.project_logo}`;

    //publish project
    const publishProject = async () => {

    }

    const menuItems = useMemo(() => {
        if(profilePage) {
            return [
                { value: 'Publish', onClick: () => publishProject },
                // { value: 'Logout', onClick: () => handleLogOut() },
            ]
        } else {
            if(profileUser?.id !== user.id) {
                return
            }
            return [
                { value: 'Publish', onClick: () => publishProject },
                // { value: 'Logout', onClick: () => handleLogOut() },
            ]
        }
        
    }, [profilePage, profileUser?.id, user.id])

    const viewWebProject = () => {
        navigateWebProjectPreview(project?.id)
    }

    const editWebProject = () => {
        navigateWebProject(project?.id)
    }

    return (
        // profilePage
        // ?
        // <StyledWebProjectCard sx={{ maxWidth: 345 }}>
        //             <CardHeader
        //                 avatar={
        //                     <img src={imagePath} width={40} height={40} />
        //                 }
        //                 action={
        //                     <AdminMainButton
        //                         icon={<MoreVertIcon  />}
        //                         title="Profile"
        //                         appearance="iconButton"
        //                         type="menu"
        //                         sx={{
        //                             color: theme => theme.palette.text.primary
        //                         }}
        //                         menuItems={menuItems}
        //                         menuPaperProps={
        //                         {
        //                             elevation: 1,
        //                             sx: {
        //                                 overflow: 'visible',
        //                                 filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        //                                 mt: 1.5,
        //                                 '& .MuiAvatar-root': {
        //                                     width: 32,
        //                                     height: 32,
        //                                     ml: -0.5,
        //                                     mr: 1,
        //                                 },
        //                                 '&::before': {
        //                                     content: '""',
        //                                     display: 'block',
        //                                     position: 'absolute',
        //                                     top: 0,
        //                                     right: 14,
        //                                     width: 10,
        //                                     height: 10,
        //                                     bgcolor: 'background.paper',
        //                                     transform: 'translateY(-50%) rotate(45deg)',
        //                                     zIndex: 0,
        //                                 },
        //                             } 
        //                             }
        //                         }
        //                     />
        //                 }
        //                 title={project.project_title}
        //                 subheader={DateHelper.formattedDate(project.created_at)}
        //             />
        //             <CardContent sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
        //                 <Typography 
        //                     variant="subtitle2" 
        //                 >
        //                     {project.project_type}
        //                 </Typography>
        //                 <Typography 
        //                     variant="body2" 
        //                     color="text.secondary" 
        //                     sx={{
        //                         display: '-webkit-box',
        //                         overflow: 'hidden',
        //                         textOverflow: 'ellipsis',
        //                         WebkitBoxOrient: 'vertical',
        //                         WebkitLineClamp: 4, // Adjust the number of lines as needed
        //                     }}
        //                 >
        //                     {project.project_description}
        //                 </Typography>
        //                 <Divider />
        //                 <Stack direction="row" spacing={1}>
        //                     <Chip label={project.is_published ? "Published" : "Not Published"} color= {project.is_published ? "success" : "error"} />
        //                     {/* <Chip label="success" color="success" /> */}
        //                 </Stack>
        //             </CardContent>
        //             <CardActions disableSpacing>
        //                         <AdminMainButton
        //                             title='Edit'
        //                             type='custom'
        //                             appearance='iconButton'
        //                             icon={<EditOutlinedIcon />}
        //                             onClick={() => {}}
        //                             putTooltip
        //                             toolTipPosition={'top'}
        //                         />
        //                         <AdminMainButton
        //                             title='View'
        //                             type='custom'
        //                             appearance='iconButton'
        //                             icon={<RemoveRedEyeOutlinedIcon />}
        //                             onClick={viewWebProject}
        //                             putTooltip
        //                             toolTipPosition={'top'}
        //                         />
                            
                            
        //                     <ExpandMore
        //                         expand={expanded}
        //                         onClick={handleExpandClick}
        //                         aria-expanded={expanded}
        //                         aria-label="show more"
        //                     >
        //                     <ExpandMoreIcon />
        //                     </ExpandMore>
        //             </CardActions>
        //             <Collapse in={expanded} timeout="auto" unmountOnExit>
        //                 <CardContent>
        //                 <Typography fontWeight={'bold'} paragraph>
        //                     Type: 
        //                 </Typography>
        //                 <Typography paragraph>
        //                     {project.project_type}
        //                 </Typography>
        //                 <Typography fontWeight={'bold'} paragraph>
        //                     Description: 
        //                 </Typography>
        //                 <Typography paragraph>
        //                     {project.project_description}
        //                 </Typography>

        //                 </CardContent>
        //             </Collapse>
        // </StyledWebProjectCard>
        // :
        // if the profile user is not the same with the logged user
        profileUser?.id !== user.id
        ?
            // show only published projects
            project.is_published
            ?
                <StyledWebProjectCard sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <img src={imagePath} width={40} height={40} />
                        }
                        // action={
                            
                        // }
                        title={project.project_title}
                        subheader={DateHelper.formattedDate(project.created_at)}
                    />
                    {/* <CardMedia
                        component="img"
                        height="194"
                        image="/static/images/cards/paella.jpg"
                        alt="Paella dish"
                    /> */}
                    <CardContent sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                        <Typography 
                            variant="subtitle2" 
                        >
                            {project.project_type}
                        </Typography>
                        <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{
                                display: '-webkit-box',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 4, // Adjust the number of lines as needed
                            }}
                        >
                            {project.project_description}
                        </Typography>
                        <Divider />
                        <Stack direction="row" spacing={1}>
                            <Chip label={project.is_published ? "Published" : "Not Published"} color= {project.is_published ? "success" : "error"} />
                            {/* <Chip label="success" color="success" /> */}
                        </Stack>
                    </CardContent>
                    <CardActions disableSpacing>
                            <AdminMainButton
                                title='View'
                                type='custom'
                                appearance='iconButton'
                                icon={<RemoveRedEyeOutlinedIcon />}
                                onClick={viewWebProject}
                                putTooltip
                                toolTipPosition={'top'}
                            />
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                            <ExpandMoreIcon />
                            </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                        <Typography fontWeight={'bold'} paragraph>
                            Type: 
                        </Typography>
                        <Typography paragraph>
                            {project.project_type}
                        </Typography>
                        <Typography fontWeight={'bold'} paragraph>
                            Description: 
                        </Typography>
                        <Typography paragraph>
                            {project.project_description}
                        </Typography>

                        </CardContent>
                    </Collapse>
                </StyledWebProjectCard>
            :null
        :
        <StyledWebProjectCard sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <img src={imagePath} width={40} height={40} />
                        }
                        action={
                            <AdminMainButton
                                icon={<MoreVertIcon  />}
                                title="Profile"
                                appearance="iconButton"
                                type="menu"
                                sx={{
                                    color: theme => theme.palette.text.primary
                                }}
                                menuItems={menuItems}
                                menuPaperProps={
                                {
                                    elevation: 1,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    } 
                                    }
                                }
                            />
                        }
                        title={project.project_title}
                        subheader={DateHelper.formattedDate(project.created_at)}
                    />
                    {/* <CardMedia
                        component="img"
                        height="194"
                        image="/static/images/cards/paella.jpg"
                        alt="Paella dish"
                    /> */}
                    <CardContent sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                        <Typography 
                            variant="subtitle2" 
                        >
                            {project.project_type}
                        </Typography>
                        <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{
                                display: '-webkit-box',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 4, // Adjust the number of lines as needed
                            }}
                        >
                            {project.project_description}
                        </Typography>
                        <Divider />
                        <Stack direction="row" spacing={1}>
                            <Chip label={project.is_published ? "Published" : "Not Published"} color= {project.is_published ? "success" : "error"} />
                            {/* <Chip label="success" color="success" /> */}
                        </Stack>
                    </CardContent>
                    <CardActions disableSpacing>
                                <AdminMainButton
                                    title='Edit'
                                    type='custom'
                                    appearance='iconButton'
                                    icon={<EditOutlinedIcon />}
                                    onClick={editWebProject}
                                    putTooltip
                                    toolTipPosition={'top'}
                                />
                                <AdminMainButton
                                    title='View'
                                    type='custom'
                                    appearance='iconButton'
                                    icon={<RemoveRedEyeOutlinedIcon />}
                                    onClick={viewWebProject}
                                    putTooltip
                                    toolTipPosition={'top'}
                                />
                            
                            
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                            <ExpandMoreIcon />
                            </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                        <Typography fontWeight={'bold'} paragraph>
                            Type: 
                        </Typography>
                        <Typography paragraph>
                            {project.project_type}
                        </Typography>
                        <Typography fontWeight={'bold'} paragraph>
                            Description: 
                        </Typography>
                        <Typography paragraph>
                            {project.project_description}
                        </Typography>

                        </CardContent>
                    </Collapse>
        </StyledWebProjectCard>
    );
};

WebProjectCard.propTypes = {
    project: propTypes.object
}

export default WebProjectCard;