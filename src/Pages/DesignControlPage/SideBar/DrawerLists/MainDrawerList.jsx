import { useState } from 'react';
import {
  Box,
} from '@mui/material';
import { styled } from '@mui/system';
import StreetviewIcon from '@mui/icons-material/Streetview';
import AdminMainButton from '../../../../Components/AdminMainButton/AdminMainButton';
import SectionTemplate from '../DrawerModals/SectionTemplate';
import DialogCom from '../../components/DialogCom';

const StyledMainDrawerList = styled(Box)(({ theme }) => ({
  color: theme.palette.success.main,
  marginTop : '40px'
}));

const MainDrawerList = () => {
  const [openDialog , setOpenDialog] = useState(false)

  return (
    <StyledMainDrawerList>
      <AdminMainButton
        title="Look at Sections"
        type="custom"
        onClick={ () => setOpenDialog(true)}
        sx={{
          marginTop: '10px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px 15px',
          fontWeight: 'bold',
          color: 'white.main',
          backgroundColor: 'success.dark',
        }}
        icon={<StreetviewIcon />}
      />

      <DialogCom title={"Look at Sections" || ''} dialogOpenState={[openDialog, setOpenDialog]}>
            <SectionTemplate drawerState = {openDialog}/>
          </DialogCom>
    </StyledMainDrawerList>
  );
};

export default MainDrawerList;
