//React
import {  useState } from 'react'

import {
    
} from 'react-redux'

//Components
import CustomTable from '../CustomTable/CustomTable'
import AdminMainButton from '../AdminMainButton/AdminMainButton'
import SortFilterSection from '../../Pages/Admin/AdminPages/UsersPage/UsersPageComponents/SortFilterSection'
//MUI
import {
    Box, CardContent, CardHeader, Checkbox, Paper,
} from '@mui/material'
import { styled } from '@mui/system'
import { useTheme } from '@emotion/react'

//icons
import MoreVertIcon from '@mui/icons-material/MoreVert';


//propTypes 
import propTypes from 'prop-types'
import { useLoaderData } from 'react-router-dom'


//Styled Components
const StyledDatabaseView = styled(Box)(
    () => ({
    
    })
)




const DatabaseView = (props) => {
    const {
        title,
        icon,
        showTableHeaders,
        hiddenColumns,
        databaseOptions,
    } = props

    //Split the columns and rows,
    const [loaderData, setLoaderData] = useState(useLoaderData());
    const [columns, rows] = loaderData;

    //Data without hidden columns
    const columnsArray = Object.keys(columns).filter(column => !hiddenColumns.includes(column));
    const rowsArray = rows.map(data => {
        const filteredData = {};
        for (const key in data) {
            if (!hiddenColumns.includes(key)) {
                filteredData[key] = data[key];
            }
        }
        return filteredData;
    });

    //States
    const [selected, setSelected] = useState([])
    const [isHeaderCheckboxChecked, setIsHeaderCheckboxChecked] = useState(false);

    //View State
    const [view, setView] = useState("table");

    
    

    //handlers
    const handleHeaderCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        setIsHeaderCheckboxChecked(isChecked);
        // If the header checkbox is checked, add all user IDs to usersWillDelete
        if (isChecked) {
            const allIds = rows.map((row) => row.id);
            setSelected(allIds);
        } else {
          // If the header checkbox is unchecked, clear the usersWillDelete state
            setSelected([]);
        }
    };

    
    //Styles
    const theme = useTheme()
    const styleCardHeader = {
        padding: `${theme.spacing()} ${theme.spacing()}`,
        backgroundColor: 'background.default',
        color: theme.palette.text.primary,
        border: '1px solid',
        borderColor: theme.palette.divider,
        display: 'flex',
        alignItems: 'center',
        ".MuiCardHeader-avatar": {
            marginRight: "4px",
        },
        ".MuiCardHeader-action": {
            margin: "0px"
        }
    }

    const styleTitleTypography = {
        fontSize: theme.typography.h6.fontSize,
        fontWeight: theme.typography.h6.fontWeight,
        lineHeight: theme.typography.h6.lineHeight,
        textTransform: 'capitalize',
    }

    const styleCardContent = {
        border: "1px solid", 
        borderColor: theme.palette.divider
    }

    

    return (
        <StyledDatabaseView>
            <SortFilterSection
            dataState={[loaderData, setLoaderData]}
            viewState={[view, setView]}
            />
            <Paper>
                <CardHeader 
                    title={title}
                    action={
                        <AdminMainButton
                            icon={
                            <MoreVertIcon sx={{
                                color: theme.palette.text.primary
                            }}/>
                            }
                            title='options'
                            type='menu'
                            appearance='iconButton'
                            sx={{
                                border: "0px"
                            }}
                            menuItems={databaseOptions}
                        />
                    }
                    
                    avatar={
                        <Box display={{
                            display: 'flex',
                            alignItems: "center"
                            }}>
                            <Checkbox 
                                checked={isHeaderCheckboxChecked}
                                onChange={handleHeaderCheckboxChange}
                            />
                                {
                                    icon && icon
                                }
                            </Box>
                        
                    }
                    titleTypographyProps={{
                        sx: styleTitleTypography
                    }}
                    sx={styleCardHeader}
                />
                <CardContent sx={styleCardContent}>
                    {
                        view === "table"
                        ?
                        <CustomTable
                            columns={columnsArray}
                            rows={rowsArray}
                            showTableHeaders={showTableHeaders}
                            selectedState={[selected, setSelected, setIsHeaderCheckboxChecked]}
                        />
                        :
                        null
                    }
                </CardContent>
            </Paper>
            
            
        </StyledDatabaseView>
        
    );
};

DatabaseView.propTypes = {
    title: propTypes.string,
    icon: propTypes.element,
    database: propTypes.array,
    showTableHeaders: propTypes.bool,
    hiddenColumns: propTypes.array,
    databaseOptions: propTypes.array,
}

export default DatabaseView;