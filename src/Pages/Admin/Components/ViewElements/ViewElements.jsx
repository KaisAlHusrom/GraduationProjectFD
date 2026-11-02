//React
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
    
} from 'react-redux'

//Components
import ChangeElementContent from '../ChangeElementContent/ChangeElementContent';
import { useMyCreateElementContext } from '../CreateElementTemplate/CreateElementTemplate';
import { useDoubleClick } from '../../../../Helpers/customHooks/useDoubleClick';
import CustomMenu from '../../../../Components/CustomMenu/CustomMenu';
import FileContextMenu from '../FileContextMenu/FileContextMenu';
import AddSubElementMenu from '../AddSubElementMenu/AddSubElementMenu';
import { removeChildrenByParentId, removeElementByParentId } from '../../../../Helpers/RecursiveHelpers/removeSelectedElement';
import { duplicateElement } from '../../../../Helpers/RecursiveHelpers/addNewElementToSpecificElement';
import { moveElementDown, moveElementUp } from '../../../../Helpers/RecursiveHelpers/moveElement';
import { CustomDrawer, CustomModal } from '../../../../Components';
import DesignInfo from '../DesignInfo/DesignInfo';
import { sameTypeIds } from '../../../../Helpers/RecursiveHelpers/getIds';
import DesignSettings from '../DesignSettings/DesignSettings';


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
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import CodeIcon from '@mui/icons-material/Code';
import CodeOffIcon from '@mui/icons-material/CodeOff';

//propTypes 
import propTypes from 'prop-types'
import ChangeImage from '../ChangeImage/ChangeImage';
import { defaultDrawerWidth } from '../../../../Components/CustomDrawer/CustomDrawer';
import ElementsCategories from '../ElementsCategories/ElementsCategories';
import HandleElementProps from '../HandleElementProps/HandleElementProps';




//Styled Components
const StyledViewElements = styled(Box)(
    ({ theme }) => ({
        padding: theme.spacing(),

    })
)

const ViewElements = () => {
    const {template} = useMyCreateElementContext()

    


    return (
        <StyledViewElements>
            <RecursiveComponent data={[template]}  />
        </StyledViewElements>
    );
};

ViewElements.propTypes = {
    selectedElement: propTypes.any
}

export default ViewElements;


//subC omponents
const RecursiveComponent = ({data}) => {

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
    const {
        setSelectedSubElementIds, 
        selectedSubElementIds, 
        setHoveredSubElementId,
        handleTemplateChange,
        template, setTemplate,
        parentElementId, setParentElementId
    } = useMyCreateElementContext()

    const [showNested, setShowNested] = useState({});

    // handle show/hide functionality
    const toggleNested = () => {
        setShowNested({ ...showNested, [parent.id]: !showNested[parent.id] });
    };

    // set selected sub element to change it's style
    const handleDoubleClick = () => {
        if(selectedSubElementIds.includes(parent.id)) {
            setSelectedSubElementIds(() => [])
        } else {
            setSelectedSubElementIds(() => [parent.id])
        }
    }

    

    //using useDoubleClick
    const myDoubleClick =  useDoubleClick(
        () => toggleNested(), 
        () => handleDoubleClick()
    )

    //show the element that will be effected if the user will select it
    const handleMouseOver = () => {
        // setHoveredSubElementId(() => parent.id)
    }
    const handleMouseOut = () => {
        // setHoveredSubElementId(() => null)
        
    }



    //or right mouse click

    const [anchorEl, setAnchorEl] = useState(null)
    const [addNewElementDrawerOpen, setAddNewElementDrawerOpen] = useState(false)

    const [anchorChangeContentMenu, setAnchorChangeContentMenu] = useState(null)
    const [anchorChangeImageMenu, setAnchorChangeImageMenu] = useState(null)

    //design props
    const [addElementProps, setAddElementProps] = useState(null)
    const handleOpenAddElementProperty = (target) => {
        setAddElementProps(target)
    }

    const closeMenus = useCallback(() => {
        setAnchorEl(null)

        //add element modal
        setAddNewElementDrawerOpen(false)

        //change content menu
        setAnchorChangeContentMenu(null)

        //change Image Menu
        setAnchorChangeImageMenu(null)

        //change design props
        setAddElementProps(null)
    }, [])

    const processRecursive = useCallback((func, parameters=[]) => {
        const updatedSelectedTemplate = JSON.parse(JSON.stringify(template));
        const parentTemplateFound = func([updatedSelectedTemplate], ...parameters)
        closeMenus()
        if (parentTemplateFound) {
            handleTemplateChange(updatedSelectedTemplate)

        } else {
            //TODO: something happen when not found
        }
    }, [closeMenus, handleTemplateChange, template])

    //change content
    // const [content, setContent] = useState(null)
    // const handleChangeContent = () => {
    //     processRecursive(changeElementContent, [parent.id, content])
    // }
    


    //remove element with it's children
    const handleRemoveElementWithChildren = () => {
        processRecursive(removeElementByParentId, [parent.id])
    }

    //remove children
    const handleRemoveChildren = () => {
        processRecursive(removeChildrenByParentId, [parent.id])
    }

    //duplicate element
    const handleDuplicateElement = () => {
        processRecursive(duplicateElement, [parent.id, parent])
    }

    //move up TODO: we can change this later to make it keep clicking on the element and move it.
    const handleMoveUp = () => {
        processRecursive(moveElementUp, [parent.id])
    }

    //move down TODO: we can change this later to make it keep clicking on the element and move it.
    const handleMoveDown = () => {
        processRecursive(moveElementDown, [parent.id])
    }


    // handle select type
    const handleSelectType = () => {
        closeMenus()
        const updatedSelectedTemplate = JSON.parse(JSON.stringify(template))
        setSelectedSubElementIds(() => sameTypeIds([updatedSelectedTemplate], parent))
    }

    //show info
    const [infoModalOpen, setInfoModalOpen] = useState(false);
    const handleShowInfo = () => {
        closeMenus()
        setInfoModalOpen(() => true)
    }

    //show settings
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);
    const handleShowSettings = () => {
        closeMenus()
        setSettingsModalOpen(() => true)
    }

    

    const contextMenuItems = [
        !parent?.element_type?.not_has_end_tag && {
            text: "Add New",
            icon: <AddOutlinedIcon color='primary' />,
            shortcut: "Ctrl N",
            eventListener: {
                onClick: () => {
                    closeMenus()
                    setAddNewElementDrawerOpen(true)
                }
            },
            
            putDivider: false
        },
        {
            text: "Delete",
            icon: <DeleteOutlineOutlinedIcon color='primary' />,
            shortcut: "Ctrl D",
            eventListener: {
                onClick: handleRemoveElementWithChildren,
            },
            putDivider: false
        },
        {
            text: "Remove Children",
            icon: <PlaylistRemoveOutlinedIcon color='primary' />,
            shortcut: "Ctrl E",
            eventListener: {
                onClick: handleRemoveChildren,
            },
            putDivider: false
        },
        {
            text: "Duplicate",
            icon: <ContentCopyOutlinedIcon color='primary' />,
            shortcut: "Ctrl D",
            eventListener: {
                onClick: handleDuplicateElement,
            },
            putDivider: true
        },
        {
            text: "Select Type",
            icon: <TaskAltOutlinedIcon color='primary' />,
            shortcut: "",
            eventListener: {
                onClick: handleSelectType,
            },
            putDivider: true
        },
        {
            text: "Move Top",
            icon: <ArrowCircleUpOutlinedIcon color='primary' />,
            shortcut: "top arrow",
            eventListener: {
                onClick: handleMoveUp,
            },
            putDivider: false
        },
        {
            text: "Move Down",
            icon: <ArrowCircleDownOutlinedIcon color='primary' />,
            shortcut: "bottom arrow",
            eventListener: {
                onClick: handleMoveDown,
            },
            putDivider: true
        },
        {
            text: "Settings",
            icon: <SettingsOutlinedIcon color='primary' />,
            shortcut: "Ctrl O",
            eventListener: {
                onClick: handleShowSettings,
            },
            putDivider: false
        },
        {
            text: "Info",
            icon: <InfoOutlinedIcon color='primary' />,
            shortcut: "Ctrl I",
            eventListener: {
                onClick: handleShowInfo,
            },
            putDivider: true
        },
        {
            text: "Add Property",
            icon: <InfoOutlinedIcon color='primary' />,
            shortcut: "Ctrl I",
            eventListener: {
                onClick:(e) =>  handleOpenAddElementProperty(e.currentTarget),
            },
            putDivider: false
        },
        parent?.children?.length === 0 && parent?.element_type?.element_type_name !== "Image" && {
            text: "Change Content",
            icon: <ChangeCircleOutlinedIcon color='primary' />,
            shortcut: "",
            eventListener: {
                onClick: (e) => {
                    setAnchorChangeContentMenu(e.currentTarget)
                }
            },
            putDivider: false
        },
        parent?.element_type?.element_type_name === "Image" && {
            text: "Change Image",
            icon: <ChangeCircleOutlinedIcon color='primary' />,
            shortcut: "",
            eventListener: {
                onClick: (e) => {
                    setAnchorChangeImageMenu(e.currentTarget)
                },
            },
            putDivider: false
        }
    ].filter(item => item !== false);
    

    const handleRightClick = (event) => {
        // Prevent the default context menu from appearing
        event.preventDefault();
        
        // set parent to know which element will add to
        setParentElementId(() => parent.id)

        setAnchorEl(event.currentTarget)
    };

    //Styled Component
    const StyledTypoItem = useMemo(() => {
        return styled(Box)(
            ({ theme }) => ({
                textTransform: 'capitalize',
                padding: theme.spacing(0.5),
                cursor: 'pointer',
                borderRadius: theme.spacing(2),
                display: 'flex',
                alignItems: 'center',
                backgroundColor: selectedSubElementIds.includes(parent?.id) ? theme.palette.action.selected : 'transparent',
                userSelect: 'none',
                "&:hover": {
                    border: '1px solid',
                    borderColor: theme.palette.warning.main,
                    backgroundColor: theme.palette.action.hover
                },
                overflow: "hidden",
                
            })
        );
    }, [parent, selectedSubElementIds])


    return <Box key={parent?.id}>
            <StyledTypoItem 
                onClick={myDoubleClick} 
                onContextMenu={handleRightClick}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                variant='subtitle1' 
                component="span"
            >
                {!parent?.element_type?.not_has_end_tag ? <CodeIcon color='primary' sx={{mr: 1}} /> : <CodeOffIcon sx={{mr: 1}} color='error' />}
                <Typography variant='subtitle1'>{parent?.element_type?.element_type_name} </Typography>
                {(parent?.element_content && parent.children.length === 0 && parent?.element_type?.element_type_name !== "Image") ? 
                    <Typography sx={{
                        whiteSpace: "nowrap",
                        ml: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }} variant='subtitle2'>{` (${parent.element_content})`}</Typography>
                : null}
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

            {/* change element content */}
            <CustomMenu
                menuOpenState={[anchorChangeContentMenu, setAnchorChangeContentMenu]}
            >
                <ChangeElementContent 
                    parentElementId={parentElementId}
                    handleCloseMenus={closeMenus}
                />
            </CustomMenu>

            {/* add element props */}
            <CustomMenu
                menuOpenState={[addElementProps, setAddElementProps]}
            >
                <HandleElementProps 
                    parentElementId={parentElementId}
                    handleCloseMenus={closeMenus}
                />
            </CustomMenu>


            {/* change image of image element */}
            <CustomMenu
                menuOpenState={[anchorChangeImageMenu, setAnchorChangeImageMenu]}
            >
                <ChangeImage 
                    parentElementId={parentElementId}
                    handleCloseMenus={closeMenus}
                />
            </CustomMenu>

            {/* add new element */}
            <CustomDrawer
                title={"Categories"}
                withoutDrawerHeader
                drawerOpenState={[addNewElementDrawerOpen, setAddNewElementDrawerOpen]}
                variant={"persistent"}
                putDrawerCloseButton
                drawerZIndex={-1} // * make the zIndex under 0 because this drawer is already renders inside viewElement Drawer
                drawerStyle={{
                    marginLeft: `${defaultDrawerWidth}px`,
                    width: "250px"
                }}
            >
                <ElementsCategories 
                    parentElementId={parentElementId}
                    handleCloseMenus={closeMenus}
                />
            </CustomDrawer>

            {/* Info Modal */}
            <CustomModal
                title={"Design Info"}
                modalIcon={<InfoOutlinedIcon />}
                modalOpenState={[infoModalOpen, setInfoModalOpen]}
            >
                <DesignInfo design={parent} />
            </CustomModal>

            {/* Settings Modal */}
            <CustomModal
                title={"Design Settings"}
                modalIcon={<SettingsOutlinedIcon />}
                modalOpenState={[settingsModalOpen, setSettingsModalOpen]}
            >
                <DesignSettings design={parent} />
            </CustomModal>


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
