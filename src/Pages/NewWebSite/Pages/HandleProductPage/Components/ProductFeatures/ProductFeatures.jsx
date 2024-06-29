//React
import { useEffect, useState } from 'react'

import { v4 as uuIdv4 } from 'uuid'

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
    () => ({
        // Add your styles here
    })
)



const ProductFeatures = ({ data }) => {
    const { productData, setProductData } = data;

    const [features, setFeatures] = useState([]);

    useEffect(() => {
        if (productData?.product_features) {
            setFeatures(productData.product_features);
        }
    }, [productData]);

    // to add new feature
    const writeNewFeature = () => {
        return {
            'id': uuIdv4(),
            'product_feature_name': "New Feature",
            'product_feature_description': "Explain feature...",
            'product_id': productData?.id || null
        }
    }

    const handleAddNewFeature = () => {
        const newFeature = writeNewFeature();
        const newFeatures = [...features, newFeature];
        setProductData(prev => ({ ...prev, 'product_features': newFeatures }));
    }

    const handleDeleteFeature = (id) => {
        const updatedFeatures = features.filter(f => f.id !== id);
        setProductData(prev => ({ ...prev, product_features: updatedFeatures }));
    };

    return (
        <StyledProductFeatures container spacing={2}>
            {features.length > 0 &&
                features.map((feature) => (
                    <Grid key={feature.id} item xxs={12} md={6} lg={4}>
                        <FeatureTextFields
                            feature={feature}
                            setProductData={setProductData}
                            handleDeleteFeature={handleDeleteFeature}
                        />
                    </Grid>
                ))
            }
            <Grid item xxs={12} md={6} lg={4}>
                <Card 
                    sx={{
                        height: '100%', 
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        transition: '0.3s',
                        cursor: 'pointer',
                        "&:hover": { backgroundColor: theme => theme.palette.action.hover }
                    }} 
                    elevation={3}
                    onClick={handleAddNewFeature}
                >
                    <AdminMainButton
                        title='New Feature'
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
    data: propTypes.object.isRequired,
    handleOnChange: propTypes.func,
}

export default ProductFeatures;

const StyledTextArea = styled(TextareaAutosize)(
    ({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        border: "2px solid",
        borderColor: theme.palette.divider,
        resize: "none",
        width: "100%",
        borderRadius: "6px",
        color: theme.palette.text.primary,
        outline: "none",
        fontSize: "1rem",
        padding: theme.spacing(1),
        "&:focus": {
            borderColor: theme.palette.primary.main,
        }
    })
)

const FeatureTextFields = ({ feature, setProductData, handleDeleteFeature }) => {
    const [featureState, setFeatureState] = useState(feature);

    useEffect(() => {
        setProductData(prev => {
            if (prev?.product_features) {
                const updatedFeatures = prev.product_features.map(f => 
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
    }, [featureState, setProductData]);

    const handleChangeFeatureName = (e) => {
        setFeatureState(prev => ({ ...prev, 'product_feature_name': e.target.value }));
    }

    const handleChangeFeatureDescription = (e) => {
        setFeatureState(prev => ({ ...prev, 'product_feature_description': e.target.value }));
    }

    const handleDelete = () => {
        handleDeleteFeature(featureState.id);
    };

    return (
        <Card elevation={3} sx={{ padding: theme => theme.spacing(2), position: 'relative' }}>
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
                    minRows={3}
                    maxRows={10}
                    name="product_feature_description"
                    value={featureState?.product_feature_description}
                    onChange={handleChangeFeatureDescription}
                />
            </Box>
        </Card>
    )
}

FeatureTextFields.propTypes = {
    feature: propTypes.object.isRequired,
    setProductData: propTypes.func.isRequired,
    handleDeleteFeature: propTypes.func.isRequired,
};
