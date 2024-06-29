//React
import { memo, useCallback, useMemo, useRef, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Autocomplete, Checkbox, CircularProgress, TextField,

} from '@mui/material'

//icons
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


//propTypes 
import propTypes from 'prop-types'
import useFetchData from '../../Helpers/customHooks/useFetchData';

//Styled Components



const CustomLazyAutoComplete = (props) => {
    const {
        optionName,
        optionId,
        label,
        handleFetchData,
        valueState,
        customHandleChange,
        filters,
        perPage,
        sx,
        multiple
    } = props



    const [value, setValue] = valueState

    //open element types auto complete
    const [open, setOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState(null)
    const search = (columnName, searchTerm) => {
        setSearchQuery(() => {
            return {
                columnName: columnName,
                searchTerm: searchTerm,
            }
        })
    }

    const {
        hasMore,
        // error,
        loading,
        setPageNumber,
        data, 
        setData,
        lastDataRecord
    } = useFetchData(
            handleFetchData, 
            "all",
            filters,
            null,
            open,
            searchQuery,
            value,
            perPage
        )

        console.log(data)
    // const observer = useRef()
    // const lastDataRowElementRef = useCallback(node => {
        
    //     if (loading || !hasMore) return;

    //     if(observer.current) observer.current.disconnect()

    //     observer.current = new IntersectionObserver(entries => {
    //         if(entries[0].isIntersecting && hasMore) {
    //             setPageNumber(prev => prev + 1);
    //         }
    //     })

    //     if (node) observer.current.observe(node)
    // }, [hasMore, loading, setPageNumber])

    const handleChangeSearchQuery = useCallback((e) => {

        // Cancel ongoing request
        // cancelfetchDataAdminTemplate();

        setPageNumber(() => 1)
        
        const name = optionName;
        const value = e.target.value;
        if(value === "") {
            setSearchQuery(() => null)
            return
        }
        
        search(name, value)
    }, [optionName, setPageNumber])


    const handleChange = useCallback((event, newValue) => {
        setValue(() => newValue)
    }, [setValue])

    const renderOptionMemoized = useCallback((props, option, { index, selected }) => {
        return (
            <li {...props} ref={index === data?.length - 1 ? lastDataRecord : null}>
                <Checkbox
                    icon={<CheckBoxOutlineBlankIcon />}
                    checkedIcon={<CheckBoxIcon />}
                    style={{ marginRight: 8 }}
                    checked={selected}
                />
                {option[optionName]}
            </li>
        );
    }, [data.length, lastDataRecord, optionName]);

    const defaultProps = useMemo(() => {
        return {
            multiple: multiple,
            disableCloseOnSelect: multiple ? true : false,
            options: open ? data : [],
            getOptionLabel: (option) => option[optionName],
            getOptionKey: (option) => option[optionId],
            disablePortal: true,
            id: label + " Auto Complete",
            renderInput: (params) => (
                <TextField
                    {...params}
                    value={searchQuery?.searchTerm || ''}
                    onChange={handleChangeSearchQuery}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            ),
            onChange: customHandleChange ? customHandleChange : (event, newValue) => handleChange(event, newValue),
            value: value,
            size: 'small',
            isOptionEqualToValue: (option, value) => option[optionName] === value[optionName],
            open: open,
            onOpen: () => setOpen(true),
            onClose: () => {
                setSearchQuery(null);
                setData(() => []);
                setPageNumber(() => 1);
                setOpen(false);
            },
            loading: loading,
            fullWidth: true,
        };
    }, [customHandleChange, data, handleChange, handleChangeSearchQuery, label, loading, multiple, open, optionId, optionName, searchQuery?.searchTerm, setData, setPageNumber, value]);
    
    
    const AutocompleteMemoized = useMemo(() => memo(Autocomplete), []);

    return (
        <AutocompleteMemoized
                    ListboxProps={{
                        sx: {
                            zIndex: 3000,
                            height: 150,
                        }
                    }}
                    {...defaultProps}
                    renderOption={renderOptionMemoized}
                    sx={{...sx }}
        />
    );
};

CustomLazyAutoComplete.propTypes = {
    optionName: propTypes.string.isRequired,
    optionId: propTypes.string.isRequired,
    label: propTypes.string.isRequired,
    handleFetchData: propTypes.func.isRequired,
    valueState: propTypes.array.isRequired,
    customHandleChange: propTypes.func,
    filters: propTypes.array,
    sx: propTypes.object,
    perPage: propTypes.any
}

export default CustomLazyAutoComplete;