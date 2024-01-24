// NewLinkSection.js
import { Box, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CustomTextField from '../../../../../Components/CustomTextField/CustomTextField';
import AdminMainButton from '../../../../../Components/AdminMainButton/AdminMainButton';

const NewLinkSection = ({ newLink, handleNewLinkChange, handleAddNewLink }) => {
  return (
    <Box sx={{ borderTop: '1px solid black', marginTop: '50px', paddingTop: '50px' }}>
      <Typography sx={{
        display: 'block', width: '30%', textAlign: 'center',
        color: 'white.dark',
        backgroundColor: 'success.dark',
        padding: '10px',
        margin: 'auto',
        borderRadius: '10px'
      }} variant='h4'> New Link</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', paddingTop: '50px' }}>
        <CustomTextField
          id="new-link-name"
          label='New Link Name's
          variant='filled'
          value={newLink.name}
          onChange={(event) => handleNewLinkChange(event, 'name')}
        />
        <CustomTextField
          id="new-link-url"
          label='New Link URL'
          variant='filled'
          value={newLink.link}
          onChange={(event) => handleNewLinkChange(event, 'link')}
        />
        {/* Button to add a new link */}
        <AdminMainButton
          title='Add New Link'
          icon={<AddCircleOutlineIcon />}
          type='custom'
          putDrawerCloseButton
          appearance='secondary'
          onClick={handleAddNewLink}
          sx={{
            marginTop: '10px',
            width: '30%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white.main',
    
          }}
        />
      </Box>
    </Box>
  );
};

export default NewLinkSection;
