import { useState } from 'react';
import {
  Box,
  List,
} from '@mui/material';
import { styled } from '@mui/system';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import StreetviewIcon from '@mui/icons-material/Streetview';
import AdminMainButton from '../../../../Components/AdminMainButton/AdminMainButton';
import MediaDrawerList from './MediaDrawerList';
import StylesDrawerList from './StylesDrawerList';
import TemplatesDrawerModel from '../DrawerModals/TemplatesDrawerModel';
import DialogCom from '../../components/DialogCom';

const StyledMainDrawerList = styled(Box)(({ theme }) => ({
  color: theme.palette.success.main,
}));

const MainDrawerList = () => {
  const [style, setStyle] = useState(false);
  const [media, setMedia] = useState(false);
  const [openDialog , setOpenDialog] = useState(false)

  const drawerItems = [
    {
      name: 'Styles',
      icon: <FormatColorFillIcon />,
      Component: StylesDrawerList,
      onClick: () => setStyle(true),
    },
    {
      name: 'Media',
      icon: <PermMediaIcon />,
      Component: MediaDrawerList,
      onClick: () => setMedia(true),
    },
  ];

  return (
    <StyledMainDrawerList>
      <List>
        {drawerItems.map((item) => (
          <AdminMainButton
            key={item.name}
            title={item.name}
            type="drawer"
            appearance="secondary"
            putTooltip
            willShow={
              <item.Component></item.Component>
            }
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
              '&:hover': { backgroundColor: 'action.hover' },
            }}
            icon={item.icon}
          />
        ))}
      </List>


      <AdminMainButton
        title="Look at templates"
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

      <DialogCom title={"Look at templates" || ''} dialogOpenState={[openDialog, setOpenDialog]}>
            <TemplatesDrawerModel />
          </DialogCom>
    </StyledMainDrawerList>
  );
};

export default MainDrawerList;
