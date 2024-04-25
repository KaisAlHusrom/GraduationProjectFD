//React
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Slide,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PlaylistRemoveOutlinedIcon from '@mui/icons-material/PlaylistRemoveOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
// import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import ViewModuleOutlinedIcon from '@mui/icons-material/ViewModuleOutlined';

//propTypes 
import propTypes from 'prop-types'
import { useMyCreateElementContext } from '../CreateElementTemplate/CreateElementTemplate';
import { useDoubleClick } from '../../../../Helpers/customHooks/useDoubleClick';
import CustomMenu from '../../../../Components/CustomMenu/CustomMenu';
import FileContextMenu from '../FileContextMenu/FileContextMenu';
import AddSubElementMenu from '../AddSubElementMenu/AddSubElementMenu';

//Styled Components
const StyledViewElements = styled(Box)(
    ({ theme }) => ({
    
    })
)

const ViewElements = ({selectedElement}) => {
    const {setSelectedSubElementId} = useMyCreateElementContext()
    useEffect(() => {
        if (selectedElement && selectedElement.id) {
            setSelectedSubElementId(selectedElement.id);
        } else {
            setSelectedSubElementId(null);
        }

    }, [selectedElement, setSelectedSubElementId])


    return (
        <StyledViewElements>
            <RecursiveComponent data={[selectedElement]} />
        </StyledViewElements>
    );
};

ViewElements.propTypes = {
    selectedElement: propTypes.any
}

export default ViewElements;


//subC omponents
const RecursiveComponent = ({ data }) => {
    // Sort the data based on the sequence number
    const sortedData = data.sort((a, b) => a.sequence_number - b.sequence_number);

    return (
        <div style={{ paddingLeft: "20px" }}>
            {sortedData.map((parent, key) => {
                return (
                    <SubElementComp key={key} parent={parent} />
                );
            })}
        </div>
    );
};

RecursiveComponent.propTypes = {
    data: propTypes.array
}

// Sub Element Component
const SubElementComp = ({parent}) => {

    //ref
    const containerRef = useRef()

    //context
    const {setSelectedSubElementId, selectedSubElementId} = useMyCreateElementContext()

    const [showNested, setShowNested] = useState({});

    // handle show/hide functionality
    const toggleNested = (id) => {
        setShowNested({ ...showNested, [id]: !showNested[id] });
    };

    // set selected sub element to change it's style
    const handleDoubleClick = (id) => {

        setSelectedSubElementId(() => id)
        
    }

    //using useDoulbClick
    const myDoubleClick =  useDoubleClick(
        () => toggleNested(parent?.id), 
        () => handleDoubleClick(parent?.id)
    )

    //or right mouse click
    const [parentElementId, setParentElementId] = useState(null)

    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorElAddElementMenu, setAnchorElAddElementMenu] = useState(null)
    const closeMenus = useCallback(() => {
        setAnchorEl(null)
        setAnchorElAddElementMenu(null)
    }, [])


    const contextMenuItems = [
        !parent.not_has_end_tag && {
            text: "Add element",
            icon: <AddOutlinedIcon color='primary' />,
            Shortcut: "",
            onClick: (e) => {
                setAnchorElAddElementMenu(e.currentTarget)
            },
            putDivider: false
        },
        {
            text: "Remove element",
            icon: <DeleteOutlineOutlinedIcon color='primary' />,
            Shortcut: "",
            onClick: (e) => {
                setAnchorElAddElementMenu(e.currentTarget)
            },
            putDivider: false
        },
        {
            text: "Remove children",
            icon: <PlaylistRemoveOutlinedIcon color='primary' />,
            Shortcut: "",
            onClick: (e) => {
                setAnchorElAddElementMenu(e.currentTarget)
            },
            putDivider: false
        },
        {
            text: "Duplicate",
            icon: <ContentCopyOutlinedIcon color='primary' />,
            Shortcut: "",
            onClick: (e) => {
                setAnchorElAddElementMenu(e.currentTarget)
            },
            putDivider: true
        },
        {
            text: "Add component",
            icon: <ViewModuleOutlinedIcon color='primary' />,
            Shortcut: "",
            putDivider: false
        },
    ];
    

    const handleRightClick = (event) => {
        // Prevent the default context menu from appearing
        event.preventDefault();
        
        // set parent to know which element will add to
        setParentElementId(() => parent.id)

        setAnchorEl(event.currentTarget)
    };

    //Styled Component
    const StyledTypoItem = useMemo(() => {
        return styled(Typography)(
            ({ theme }) => ({
                textTransform: 'capitalize',
                padding: theme.spacing(0.5),
                cursor: 'pointer',
                borderRadius: theme.spacing(2),
                display: 'flex',
                alignItems: 'center',
                backgroundColor: selectedSubElementId === parent?.id ? theme.palette.action.selected : 'transparent',
                userSelect: 'none',
                "&:hover": {
                    border: '1px solid',
                    borderColor: theme.palette.warning.main,
                    backgroundColor: theme.palette.action.hover
                }
            })
        );
    }, [parent, selectedSubElementId])

    return <Box key={parent?.id}>
            <StyledTypoItem 
                onClick={myDoubleClick} 
                onContextMenu={handleRightClick}
                variant='subtitle1' 
                component="span"
            >
                - {parent?.element_type_name}
                {
                parent?.children?.length !== 0 ? 
                    showNested[parent?.id]
                    ?
                        <KeyboardArrowUpOutlinedIcon />
                    :
                        <KeyboardArrowDownOutlinedIcon color='warning' /> 
                : null
                }
            </StyledTypoItem>

            {/* Context Menu */}
            <CustomMenu
                menuOpenState={[anchorEl, setAnchorEl]}
            >
                <FileContextMenu
                    menuItems={contextMenuItems}
                />
            </CustomMenu>

            <CustomMenu
                menuOpenState={[anchorElAddElementMenu, setAnchorElAddElementMenu]}
            >
                <AddSubElementMenu 
                    parentElementId={parentElementId}
                    handleCloseMenus={closeMenus}
                />
            </CustomMenu>


            {/* Base Condition and Rendering recursive component from inside itself */}
            <Slide ref={containerRef} direction='down' container={containerRef.current} in={showNested[parent?.id]} mountOnEnter unmountOnExit>

                
                <div>
                    {parent?.children && <RecursiveComponent data={parent?.children} />}
                    
                </div>
            </Slide>
            
        </Box>
}

SubElementComp.propTypes = {
    parent: propTypes.object
}
