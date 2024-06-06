// //React
// import {  } from 'react'

// import {
    
// } from 'react-redux'

// //Components
// import { AdminMainButton } from '../../../../../../Components/index.jsx';
// import * as utils from '../../StylesFunctions/SetStylesFunctions.js';
// import DoneOutlineIcon from '@mui/icons-material/DoneOutline';


// //MUI
// import {
//     Box, MenuItem, Typography,
// } from '@mui/material'
// import { styled } from '@mui/system'
// import CustomSelectInput from '../../../../../../Components/CustomSelectInput/CustomSelectInput.jsx';
// import { SketchPicker } from 'react-color';


// //Styled Components
// const StyledBordersDrawer = styled(Box)(
//     ({ theme }) => ({
//         padding:theme.spacing(),
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//     })
// )

// const customSelectStyle = {
//     '&:hover': {
//         transition: 'all 0.3s ease',
//         backgroundColor: "#09263529",
//         boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)",
//     },
// };



// const BordersDrawer = ({
//     handleBorderPositionChange,
//     handleBorderSizeChange,
//     handleBorderTypeChange,
//     handleBorderColorChange,
//     borderPosition,
//     selectedBorderSize,
//     selectedBorderType,
//     selectedBorderColor,
//     updateBorderReady,
//     handleSectionStyleChange
//  }) => {



    
//     return (
//         <StyledBordersDrawer >

//         {/* Border Position */}
//             <CustomSelectInput
//             name="borderPosition"
//             className={customSelectStyle}
//             onChange={(e) => handleBorderPositionChange(e.target.value)}
//             valueSet={borderPosition}
//             >
//             {utils["border"]?.map((item, index) => (
//                 <MenuItem key={index} value={item}>{item}</MenuItem>
//             ))}
//             </CustomSelectInput>

//         {/* Border Size */}
//             <CustomSelectInput
//             name="borderSize"
//             className={customSelectStyle}
//             onChange={(e) => handleBorderSizeChange(e.target.value)}
//             valueSet={selectedBorderSize}
//             >
//             {utils["borderSize"]?.map((item, index) => (
//                 <MenuItem key={index} value={item}>{item}</MenuItem>
//             ))}
//             </CustomSelectInput>

//         {/* Border Type */}
//             <CustomSelectInput
//             name="borderType"
//             className={customSelectStyle}
//             onChange={(e) => handleBorderTypeChange(e.target.value)}
//             valueSet={selectedBorderType}
//             >
//             {utils["borderType"]?.map((item, index) => (
//                 <MenuItem key={index} value={item}>{item}</MenuItem>
//             ))}
//             </CustomSelectInput>
    
//         {/* Border Color */}
//         <Typography sx= {{marginBottom :'10px' , fontWeight:'bold'}}>Color</Typography>
//             <SketchPicker
//                 color={selectedBorderColor}
//                 onChange={handleBorderColorChange}
//                 onChangeComplete={(color) => handleBorderColorChange(color.hex)}
//                 />

//         {/* Update Border Button */}
//             <AdminMainButton
//                 title="Set Border"
//                 type='custom'
//                 onClick={updateBorderReady}
//                 icon = {<DoneOutlineIcon></DoneOutlineIcon>}
//                 sx={{
//                     marginTop: '10px',
//                     width: '220px',
//                     display: 'flex',
//                     flexWrap:'wrap',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     color: '#eee',
//                     backgroundColor: '#092635',
//                     fontWeight:'bold',
//                     boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            
//             }}
//             >
//             </AdminMainButton>

//             <Box sx={{marginBottom:'50px'}}>
    
//     </Box>
//     </StyledBordersDrawer>
//     )

// };

// export default BordersDrawer;

