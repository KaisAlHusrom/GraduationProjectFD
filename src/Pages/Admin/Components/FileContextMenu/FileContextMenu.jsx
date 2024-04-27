
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';

//propTypes 
import propTypes from 'prop-types'
import { useTheme } from '@emotion/react';

export default function FileContextMenu(props) {
    const {
        menuItems
    } = props;

    const theme = useTheme()

    return (
        <Paper sx={{ width: 320, maxWidth: '100%' }}>
            <MenuList>
                {
                    menuItems.map((item, key) => {
                        return (
                            <MenuItem sx={
                                {
                                    borderBottom: item.putDivider && '1px solid',
                                    borderColor: theme.palette.divider,
                                    paddingBottom: item.putDivider ? theme.spacing(1.5) : theme.spacing(0.8),
                                    marginBottom: item.putDivider ? theme.spacing(1.5) : theme.spacing(0)
                                }
                                } onClick={item.onClick} key={key}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText>
                                    {item.text}
                                </ListItemText>
                                <Typography variant="body2" color="text.secondary">
                                    {item.shortcut}
                                </Typography>
                                {/* {item.putDivider ? <Divider /> : null} */}
                            </MenuItem>
                        )
                    })
                }
            </MenuList>
        </Paper>
    );
}

FileContextMenu.propTypes = {
    menuItems: propTypes.array
}