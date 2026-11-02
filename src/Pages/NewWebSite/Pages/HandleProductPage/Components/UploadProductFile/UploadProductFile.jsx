//React
import { useEffect, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import UploadFileButton from '../../../../../../Components/UploadFileButton/UploadFileButton'
import { MAX_FILE_SIZE } from '../../../../../../Services/AdminServices/Services/productsService'

//Styled Components
const StyledUploadProductFile = styled(Box)(
    ({ theme }) => ({
        width: "100%"
    })
)


const UploadProductFile = ({data, handleOnChange}) => {
    const {productData, setProductData} = data;


    const [uploadProgress, setUploadProgress] = useState(0);
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState(0);
    useEffect(() => {
        if(productData && productData.product_file_name) {
            if(!(productData.product_file_name instanceof File)) {
                setUploadProgress(100)
                setFileName(productData.product_file_name)
            }
        }
    }, [productData])


    const handleChange = (e) => {
            const value = e.target.files[0];
            if (value.size > MAX_FILE_SIZE) {
                console.error(`File size should not exceed ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
                return;
            }
            if (value) {
                setFileName(value.name);
                setFileSize(value.size);
                const reader = new FileReader();
    
                reader.onprogress = (event) => {
                    
                    if (event.lengthComputable) {
                        const progress = Math.round((event.loaded / event.total) * 100);
                        // console.log(progress)
                        setUploadProgress(progress);
                    }
                };
    
                reader.onloadend = () => {
                    setProductData(prev => {
                            return {...prev, product_file_name: value}
                    })

                };
    
                reader.readAsDataURL(value);
            }
    }

    return (
        <StyledUploadProductFile>
            <UploadFileButton 
                customOnChange={handleChange}
                label={"Product File"}
                // errorMessage={errorMessage}
                fileStates={{uploadProgress, setUploadProgress, fileName, setFileName, fileSize, setFileSize}}
                name={'product_file_name'}
            />
        </StyledUploadProductFile>
    );
};

UploadProductFile.propTypes = {
    data: propTypes.object,
    handleOnChange: propTypes.func,
}

export default UploadProductFile;