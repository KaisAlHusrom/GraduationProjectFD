import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { ModalTitleStyle } from '../sections/EmptyDesign/StylesFunctions/SetStylesFunctions';

const StyledFontFamily = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        flexDirection: 'row',
        flexWrap :'wrap',
        gap: theme.spacing(2),
        textAlign: 'center'
    })
);

const FontFamily = ({  handleFontFamilyClick }) => {
    const [selectedFontFamily, setSelectedFontFamily] = useState('');

    const fontFamilies = [
        { label: 'Arial', example: 'The quick brown fox jumps over the lazy dog' },
        { label: 'Helvetica', example: 'The quick brown fox jumps over the lazy dog' },
        { label: 'Times New Roman', example: 'The quick brown fox jumps over the lazy dog' },
        { label: 'Georgia', example: 'The quick brown fox jumps over the lazy dog' },
        { label: 'Verdana', example: 'The quick brown fox jumps over the lazy dog' },
        { label: 'Courier New', example: 'The quick brown fox jumps over the lazy dog' },
        { label: 'Impact', example: 'The quick brown fox jumps over the lazy dog' },
        { label: 'Comic Sans MS', example: 'The quick brown fox jumps over the lazy dog' },
        { label: 'Tahoma', example: 'The quick brown fox jumps over the lazy dog' },
        { label: 'Trebuchet MS', example: 'The quick brown fox jumps over the lazy dog' },
        { label: 'Palatino', example: 'The quick brown fox jumps over the lazy dog' },
        { label: 'Lucida Sans Unicode', example: 'The quick brown fox jumps over the lazy dog' },
        { label: 'Arial Black', example: 'The quick brown fox jumps over the lazy dog' },
        { label: 'Garamond', example: 'The quick brown fox jumps over the lazy dog' },
        { label: 'Book Antiqua', example: 'The quick brown fox jumps over the lazy dog' },
        { label: 'Copperplate', example: 'The quick brown fox jumps over the lazy dog' },
        { label: 'Futura', example: 'The quick brown fox jumps over the lazy dog' },
        { label: 'Century Gothic', example: 'The quick brown fox jumps over the lazy dog' },
        { label: 'Franklin Gothic Medium', example: 'The quick brown fox jumps over the lazy dog' },
        // Add more font families as needed
    ];
 
    
    const handleFontClick = (fontFamily) => {
        setSelectedFontFamily(fontFamily);
        handleFontFamilyClick(fontFamily); // Tıklanan font ailesini iletiyoruz
    };

    useEffect(() => {
    }, [selectedFontFamily]);

    return (
        <StyledFontFamily>
              <Typography color = "text.default" sx = {ModalTitleStyle}>
                    Select Font
            </Typography>
            {fontFamilies.map((font, index) => (
                <Box
                    key={index}
                    sx={{
                        boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                        borderRadius: '4px',
                        padding: '8px',
                        cursor: 'pointer',
                        width: '200px',
                        transition :'all ease .3s',
                        color : selectedFontFamily === font.label ? '#eee' : 'black',
                        backgroundColor: selectedFontFamily === font.label ? '#750E21' : '#FEFAF6',
                    }}
                    onClick={() => handleFontClick(font.label)}
                >
                    <Typography variant="body1" style={{ fontFamily: font.label }}>
                        {font.label}
                    </Typography>
                    <Typography variant="body2" sx = {{fontFamily: font.label}}>
                            {font.example}
                    </Typography>
                
                </Box>
            ))}
        </StyledFontFamily>
    );
};

export default FontFamily;
