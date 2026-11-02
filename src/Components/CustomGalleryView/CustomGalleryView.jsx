//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Grid,
    Skeleton,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import CustomGalleryViewItem from '../CustomGalleryViewItem/CustomGalleryViewItem'
import { useLoaderData } from 'react-router-dom'
import { useMyContext } from '../DatabaseView/DatabaseView'

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
    const {rowsArray} = dataWillAppearState

    //primary key
    const {columns, lastDataRowElementRef, loading} = useMyContext()
    const pk = Object.keys(columns).find(key => columns[key] === "pk");


    return (
        <StyledCustomGalleryView container gap={6}>
            { 
            rowsArray && rowsArray.length > 0 && rowsArray.map((row, index) => {

                    if(rowsArray.length === index + 1) {
                        return <CustomGalleryViewItem 
                            key={row[pk]} 
                            row={row}
                            selectedState={selectedState}
                            appearedDataCount={rowsArray.length}
                            handleChangeData = {handleChangeData}
                            handleEnterKeyDown = {handleEnterKeyDown}
                            filteredColumnsArray = {filteredColumnsArray}
                            lastRowRef={lastDataRowElementRef}
                            />
                        
                    }

                    return (
                            <CustomGalleryViewItem 
                            key={row[pk]} 
                            row={row}
                            selectedState={selectedState}
                            appearedDataCount={rowsArray.length}
                            handleChangeData = {handleChangeData}
                            handleEnterKeyDown = {handleEnterKeyDown}
                            filteredColumnsArray = {filteredColumnsArray}
                            />
                            );
                })
            }
                        {
                            loading
                            &&
                            <>
                                {
                                    Array.from({length: 3}, (item, key) => {
                                        return <Grid item xs={3} key={key}>
                                                <Skeleton variant="rounded" width={250} height={300} />
                                            </Grid>
                                    })
                                }
                            </>
                        }
        </StyledCustomGalleryView>
    );
};

CustomGalleryView.propTypes = {
    showTableHeaders: propTypes.bool,
    selectedState: propTypes.array,
    filteredColumnsArray: propTypes.array,
    dataWillAppearState: propTypes.object,
    handleChangeData: propTypes.func,
    handleEnterKeyDown: propTypes.func,
}

export default CustomGalleryView;