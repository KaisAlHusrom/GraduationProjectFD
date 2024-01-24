// LinksList.js
import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import AdminMainButton from '../../../../../Components/AdminMainButton/AdminMainButton';
import CustomTextField from '../../../../../Components/CustomTextField/CustomTextField';


const LinksList = ({ links, handleTempTextFieldChange, handleDeleteLink, tempLinkList = [] }) => {
    return (
      <Box>
        {links.map((item) => (
          <Box key={item.id} sx={{ display: 'flex', width: '100%', flexDirection: 'row', flexWrap: 'wrap', padding: '16px', justifyContent: 'space-around' }}>
            {/* Name text field */}
            <CustomTextField
              id={`name-${item.id}`}
              label='Name'
              variant='filled'
              value={tempLinkList.find((tempItem) => tempItem.id === item.id)?.name || ''}
              onChange={(event) => handleTempTextFieldChange(event.target.value, item.id, 'name')}
            />
  
            {/* Link text field */}
            <CustomTextField
              id={`link-${item.id}`}
              label='Link'
              variant='filled'
              value={tempLinkList.find((tempItem) => tempItem.id === item.id)?.link || ''}
              onChange={(event) => handleTempTextFieldChange(event.target.value, item.id, 'link')}
            />
            <AdminMainButton
              title='Delete'
              icon={<DeleteIcon />}
              type='custom'
              appearance='secondary'
              onClick={() => handleDeleteLink(item.id)}
              sx={{
                marginTop: '10px',
                width: '30%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white.main',
                backgroundColor: 'warning.dark',
              }}
            />
          </Box>
        ))}
      </Box>
    );
  };
  
  export default LinksList;
  