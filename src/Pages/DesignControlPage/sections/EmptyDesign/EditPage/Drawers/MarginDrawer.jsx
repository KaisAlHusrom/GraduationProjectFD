//React
import { useState } from 'react'
import { MenuItem, Typography } from '@mui/material'
import { styled } from '@mui/system'
import CustomSelectInput from '../../../../../../Components/CustomSelectInput/CustomSelectInput'
import * as utils from '../../StylesFunctions/SetStylesFunctions.js';

//Styled Components
const StyledMarginDrawer = styled('div')({
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',


});

const customSelectStyle = {
    '&:hover': {
        transition: 'all 0.3s ease',
        backgroundColor: "#09263529",
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)",
    },
    zIndex: 100000,
};
const ButtonStyle = {
    margin: "10px",
    display: 'block',
    width: '250px',
    padding: '10px',
    backgroundColor: '#eeeeee0f',
    transition: 'all 0.5s ease',
    borderRadius: '10px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: "#747264",
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)",
    },
    boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",

}
const MarginDrawer = ({ handleSectionStyleChange }) => {

    const [selectedMargin, setSelectedMargin] = useState({
        marginTop: null,
        marginRight: null,
        marginBottom: null,
        marginLeft: null,
        margin: null
    });

    const handleMarginSelect = (marginGroup, marginStyle) => {
        setSelectedMargin(prevState => ({
            ...prevState,
            [marginGroup]: marginStyle
        }));
        handleSectionStyleChange({ [marginGroup]: marginStyle });
    };

    

    return (
        <StyledMarginDrawer>
            {Object.entries(utils.margins).map(([marginGroup, marginValues], index) => (
                <CustomSelectInput
                    sx= {ButtonStyle}
                    key={index}
                    name={marginGroup}
                    className={customSelectStyle}
                    onChange={(e) => handleMarginSelect(marginGroup, e.target.value)}
                    valueSet={selectedMargin[marginGroup]}
                >
                    {Object.values(marginValues).map((item, index) => (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    ))}
                </CustomSelectInput>
            ))}
            <Typography className="" sx = {{paddingLeft: '10px'}} variant="h4">Paddings</Typography>
            {Object.entries(utils.paddings).map(([marginGroup, marginValues], index) => (
                <CustomSelectInput
                    sx= {ButtonStyle}
                    key={index}
                    name={marginGroup}
                    className={customSelectStyle}
                    onChange={(e) => handleMarginSelect(marginGroup, e.target.value)}
                    valueSet={selectedMargin[marginGroup]}
                >
                    {Object.values(marginValues).map((item, index) => (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    ))}
                </CustomSelectInput>
            ))}
        </StyledMarginDrawer>
    );
};

export default MarginDrawer;
