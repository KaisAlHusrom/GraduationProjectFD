//React
import { useEffect, useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Grid,
    FormLabel
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import UploadImageByDragDrop from '../UploadImageByDragDrop/UploadImageByDragDrop'
import UploadImagesAndVideos from '../UploadImagesAndVideos/UploadImagesAndVideos'

//Styled Components
const StyledProductMediaInfo = styled(Grid)(
    ({ theme }) => ({
    
    })
)


const ProductMediaInfo = ({data, handleOnChange}) => {
    const {productData, setProductData} = data

    const [media, setMedia] = useState(null)
    useEffect(() => {
        if(productData){
            setMedia(productData?.product_media)
        }
    }, [productData])

    return (
        <StyledProductMediaInfo container spacing={2} maxHeight={300} overflow='auto'>
            <Grid item xxs={12}>
                <FormLabel
                    >
                    Product Main Image
                </FormLabel>
                    <UploadImagesAndVideos 
                    limit={10} 
                    values={media} 
                    handleLoadEnd={handleOnChange} 
                    columnName={"product_media"}
                    />
            </Grid>
        </StyledProductMediaInfo>
    );
};

ProductMediaInfo.propTypes = {
    data: propTypes.object,
    handleOnChange: propTypes.func,
}

export default ProductMediaInfo;