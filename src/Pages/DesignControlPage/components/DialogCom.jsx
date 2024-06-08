// import React from 'react';
// import { Box } from '@mui/material';
// import { styled } from '@mui/system';
// import Dialog from '@mui/material/Dialog';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import CloseIcon from '@mui/icons-material/Close';

// const StyledDialogCom = styled(Box)(({ theme }) => ({
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     boxShadow: 24,
//     zIndex: 1500,
// }));

// const StyledCustomDialog = styled(Box)(() => ({}));

// const DialogCom = ({ title, dialogOpenState, children }) => {
//   const [open, setOpen] = dialogOpenState;

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <StyledCustomDialog>
//       <StyledDialogCom>
//         <React.Fragment>
//           <Dialog
//             fullScreen
//             open={open}
//             onClose={handleClose}
//             maxWidth="md"
//             sx={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               zIndex: 1500, // Adjusted z-index here
//             }}
//           >
//             <AppBar sx={{ position: 'relative' }}>
//               <Toolbar>
//                 <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
//                   {title}
//                 </Typography>
//                 <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
//                   <CloseIcon />
//                 </IconButton>
//               </Toolbar>
//             </AppBar>
//             {children}
//           </Dialog>
//         </React.Fragment>
//       </StyledDialogCom>
//     </StyledCustomDialog>
//   );
// };

// export default DialogCom;
