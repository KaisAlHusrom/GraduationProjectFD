//React
import { useEffect, useState } from 'react'

import {v4 as uuIdv4} from 'uuid'


import {
    
} from 'react-redux'

//Components
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

//MUI
import {
    Grid,
    FormLabel,
    TextField,
    Card,
    Typography,
    Box,
    TextareaAutosize,
    IconButton    
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { AdminMainButton } from '../../../../../../Components';

//Styled Components
const StyledProductFeatures = styled(Grid)(
    ({ theme }) => ({
    
    })
)

// TODO: fix delete problem

const ProductFeatures = ({data, handleOnChange}) => {
    const {productData, setProductData} = data;

    const [Features, setFeatures] = useState([])
    useEffect(() => {
        if(productData?.product_features) {
            setFeatures(productData?.product_features)
        }
    }, [productData])

    //to add new feature
    const writeNewFeature = () => {
        return {
            'id': uuIdv4(),
            'product_feature_name': "New Feature",
            'product_feature_description': "Explain feature...",
            'product_id': productData && productData.id ? productData.id : null
        }
    }

    const handleAddNewFeature = () => {
        const newFeature = writeNewFeature()

        const newFeatures = [...Features, newFeature]

        setProductData(prev => ({...prev, 'product_features': newFeatures}))
    }

    const handleDeleteFeature = (id) => {
        const updatedFeatures = Features.filter(f => f.id !== id);
        setProductData(prev => ({ ...prev, product_features: updatedFeatures }));
    };

    return (
        <StyledProductFeatures container spacing={2}>
            {
                Features && Features.length > 0
                ?   
                Features.map((feature, key) => {
                    return (
                        <Grid key={key} item xxs={12} md={6} >
                                <FeatureTextFields
                                    feature={feature}
                                    setProductData={setProductData}
                                    handleDeleteFeature={handleDeleteFeature}
                                    // handleDeleteSkill={handleDeleteSkill}
                                />
                        </Grid>
                    )
                })

                :null
            }
            <Grid item xxs={12} md={6} lg={4}>
                <Card 
                sx={
                    {
                        height: '100%', 
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        transition: '0.3s',
                        cursor: 'pointer',
                        "&:hover": {backgroundColor: theme => theme.palette.action.hover}
                    }
                    } elevation={3}
                    onClick={handleAddNewFeature}
                    >
                    <AdminMainButton
                        title='New Skill'
                        type='custom'
                        appearance='iconButton'
                        icon={<AddIcon />}
                        putBorder
                    />
                </Card>
            </Grid>
        </StyledProductFeatures>
    );
};

ProductFeatures.propTypes = {
    data: propTypes.object,
    handleOnChange: propTypes.func,
}

export default ProductFeatures;


const StyledTextArea = styled(TextareaAutosize)(
    ({theme}) => ({
        backgroundColor: theme.palette.background.paper,
        border: "2px solid",
        borderColor: theme.palette.divider,
        resize: "none",
        width: "100%",
        borderRadius: "6px",
        color: theme.palette.text.primary,
        outline: "none",
        fontSize: "1rem",
        padding: theme.spacing(),
        "&:focus": {
            borderColor: theme.palette.primary.main,
        }
    })
)

const FeatureTextFields = ({feature, setProductData, handleDeleteFeature}) => {
    const [featureState, setFeatureState] = useState(feature)

    useEffect(() => {
        setProductData(prev => {
            if(prev?.product_features) {
                const updatedFeatures = prev?.product_features?.map(f => 
                    f.id === featureState.id ? featureState : f
                );
                return {
                    ...prev,
                    product_features: updatedFeatures
                };

            }
            return {
                ...prev,
                product_features: [featureState]
            };
        });
    }, [setProductData, featureState]);


    const handleChangeFeatureName = (e) => {
        setFeatureState(prev => {
            return {...prev, 'product_feature_name': e.target.value}
        })
    }

    const handleChangeFeatureDescription = (e) => {
        setFeatureState(prev => {
            return {...prev, 'product_feature_description': e.target.value}
        })
    }

    const handleDelete = () => {
        handleDeleteFeature(featureState.id);
    };

    return (
        <Card elevation={3} sx={{padding: theme => theme.spacing(), position: 'relative'}}>
            <IconButton onClick={handleDelete} 
                sx={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                }}    
            >
                <ClearIcon color='error' />
            </IconButton>
            <Typography variant='h6' ml={2} mb={2} whiteSpace={'nowrap'} width={150} overflow={'hidden'} textOverflow={'ellipsis'}>
                {featureState?.product_feature_name}
            </Typography>
            <Box mb={2}>
                <FormLabel>
                    Feature
                </FormLabel>
                <TextField 
                    fullWidth
                    size='small'
                    name='product_feature_name'
                    value={featureState?.product_feature_name}
                    onChange={handleChangeFeatureName}
                />
            </Box>
            <Box>
                <FormLabel>
                    Explain
                </FormLabel>
                <StyledTextArea
                    minRows={3} // Adjust the minimum number of rows as needed
                    maxRows={10} // Adjust the maximum number of rows as needed
                    name={"product_feature_description"}
                    // sx={{
                    //     borderColor: error ? "error.main" : "transparent"
                    // }}
                    value={featureState?.product_feature_description}
                    onChange={handleChangeFeatureDescription}
                />
            </Box>
        </Card>
    )
}