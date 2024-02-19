//React
import { useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Card,
    Grid, Stack, Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { useLoaderData } from 'react-router-dom'

//helpers
import { isComplexValue } from '../../Helpers/DataStructureHelper'

//Styled Components
const StyledRowDetailsView = styled(Stack)(
    ({theme}) => ({
        // margin: 0,
        // marginLeft: theme.spacing(2),
    })
)

const StyledStackItem = styled(Card)(
    ({ theme }) => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    })
);

const StyledInfoBox = styled(Box)(
    ({ theme }) => ({
        // Your styles here
    })
);

const RowDetailsView = (props) => {
    const {
        handleDeleteFunc,
        handleUpdateFunc,
        loaderData,
    } = props

    //get the data from loader function or as prop
    const loadedData = useLoaderData();
    const initialData = loaderData ? loaderData : loadedData;
    const [data, setData] = useState(initialData);

    //Split the columns and rows,
    const {columns, row, relations} = data;
    const {
            manyToOne,
            manyToMany,
            oneToMany
        } = relations

    // Filter keys to include only those with array or object values
    const filteredKeys = useMemo(() => Object.keys(row).filter(key => isComplexValue(row[key])), [row]);

    // Create a new object with the filtered keys and their corresponding values
    const newData = useMemo(() => {
        const originalData = {};
        Object.entries(row).forEach(([key, value]) => !isComplexValue(value) && (originalData[key] = value));

        let data = {}
        filteredKeys.forEach(key => {
            data[key] = row[key];
        });

        data = {originalData: originalData, ...data}

        return data;
    }, [filteredKeys, row]);
    

    console.log(newData)

    //TODO: For image and files special box
    return (
        <StyledRowDetailsView   spacing={4}>
            {
                Object.entries(newData).map(([key, value], i) => {
                    return (
                        <StyledStackItem key={i}>
                            {
                                Array.isArray(value)
                                ?
                                value.map((column) => {
                                    Object.entries(column).map(([key, value], i) => {

                                        // return (
                                        //     <Typography key={key}>{row}</Typography>
                                        // )
                                    })
                                })
                                :
                                Object.entries(value).map(([key, value], i) => {
                                    return (
                                        <StyledInfoBox key={i}>
                                            {value}
                                        </StyledInfoBox>
                                    )
                                })
                            }
                        </StyledStackItem>
                    )
                })
            }
        </StyledRowDetailsView>
    );
};

RowDetailsView.propTypes = {
    handleDeleteFunc: propTypes.func,
    handleUpdateFunc: propTypes.func,
    loaderData: propTypes.object,
}

export default RowDetailsView;