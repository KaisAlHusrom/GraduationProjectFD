//React
import {
  useState, useEffect
} from 'react'

import {
  
} from 'react-redux'

//Components


//MUI
import {
  Box,
} from '@mui/material'
import { styled } from '@mui/system'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


//Styled Components
const StyledCustomGrid = styled(Box)(
    () => ({
  
    })
)


const CustomGrid = ({ items, textColor, backgroundColor, choses }) => {

  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (!choses) {
      // Eğer seçme kapalıysa, önceki seçili öğeleri temizle
      setSelectedItems([]);
    }
  }, [choses]);

  const handleItemClick = (index) => {
    if (choses) {
      // Eğer seçme modu açıksa, öğe üzerine tıklandığında işlem yap
      const updatedSelectedItems = [...selectedItems];
      const selectedIndex = updatedSelectedItems.indexOf(index);

      if (selectedIndex === -1) {
        updatedSelectedItems.push(index);
      } else {
        updatedSelectedItems.splice(selectedIndex, 1);
      }

      setSelectedItems(updatedSelectedItems);
    }
  };

  return (
    <StyledCustomGrid>
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          {items.map((item, index) => (
            <Grid key={index} item>
                <Paper
                    onClick={() => handleItemClick(index)}
                    sx={{
                    height: item.height || 140,
                    width: item.width || 100,
                    backgroundColor:
                        selectedItems.includes(index)
                        ? 'text.disabled'
                        : backgroundColor || ((theme) =>
                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: item.textColor,

                    }}
                    >

                {item.text && (
                  
                    <Typography variant="body1" color={textColor}>
                        {item.text}
                    </Typography>
                    
                    )}

                </Paper>
                </Grid>
                
            ))}

        </Grid>
        </Grid>
    </Grid>

    </StyledCustomGrid>

    );
};

export default CustomGrid;

















// export default CustomGrid;
