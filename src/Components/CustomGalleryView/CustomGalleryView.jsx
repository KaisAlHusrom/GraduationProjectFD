//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Grid,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import CustomGalleryViewItem from '../CustomGalleryViewItem/CustomGalleryViewItem'
import { useLoaderData } from 'react-router-dom'

//Styled Components
const StyledCustomGalleryView = styled(Grid)(
    () => ({
    
    })
)


const CustomGalleryView = (props) => {
    const {
        filteredColumnsArray,
        selectedState,
        dataWillAppearState,
        handleChangeData,
        handleEnterKeyDown
    } = props


    //data state
    const [dataWillAppear,] = dataWillAppearState

    //primary key
    const {columns} = useLoaderData()
    const pk = Object.keys(columns).find(key => columns[key] === "pk");


    return (
        <StyledCustomGalleryView container gap={6}>
            { 
            dataWillAppear && dataWillAppear.length > 0 && dataWillAppear.map((row) => {
                    return (
                            <CustomGalleryViewItem 
                            key={row[pk]} 
                            row={row}
                            selectedState={selectedState}
                            appearedDataCount={dataWillAppear.length}
                            handleChangeData = {handleChangeData}
                            handleEnterKeyDown = {handleEnterKeyDown}
                            filteredColumnsArray = {filteredColumnsArray}
                            />
                            );
                })
            }
            
        </StyledCustomGalleryView>
    );
};

CustomGalleryView.propTypes = {
    showTableHeaders: propTypes.bool,
    selectedState: propTypes.array,
    filteredColumnsArray: propTypes.array,
    dataWillAppearState: propTypes.array,
    handleChangeData: propTypes.func,
    handleEnterKeyDown: propTypes.func,
}

export default CustomGalleryView;