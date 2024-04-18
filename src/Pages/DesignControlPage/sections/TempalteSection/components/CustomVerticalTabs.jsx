// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// // TabPanel component
// function TabPanel({ children, value, index, ...other }) {
//   const isVisible = value === index;

//   return (
//     <div
//       role="tabpanel"
//       hidden={!isVisible}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {isVisible && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// // Utility function for accessibility props
// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     'aria-controls': `vertical-tabpanel-${index}`,
//   };
// }

// // CustomVerticalTabs component
// export default function CustomVerticalTabs({ tabLabels, tabContents}) {
//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     console.log("New value:", newValue);
//     setValue(newValue);
//   };


//   return (
//     <Box sx={{ width: '100%' }}>
//           <Tabs
//         value={value}
//         onChange={handleChange}
//         aria-label="vertical tabs example"
//         sx={{ fontSize: '16px' }}
//       >
//         {tabLabels.map((label, index) => (
//           <Tab key={index} label={label} {...a11yProps(index)} />
//         ))}
//       </Tabs>
//       {tabContents.map((Content, index) => (
//         <TabPanel key={index} value={value} index={index}>
//           <Content />
  
//         </TabPanel>
//       ))}
//     </Box>
//   );
// }

// CustomVerticalTabs.propTypes = {
//   tabLabels: PropTypes.array.isRequired,
//   tabContents: PropTypes.array.isRequired,
// };
