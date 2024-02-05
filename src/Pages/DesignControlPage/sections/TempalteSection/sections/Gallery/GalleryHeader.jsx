import  { useState, useEffect } from 'react';
import galleryData from './GalleryData.json';
import { Box   } from '@mui/material';

const GalleryHeader = () => {
  const [jsonData, setJsonData] = useState(galleryData);

  useEffect(() => {
    // JSON dosyasından veri alma
    setJsonData(galleryData); // JSON dosyasını zaten import ettiğimiz için tekrar fetch etmeye gerek yok
  }, []);

  return (
    <Box >
        {jsonData.GalleryHeader.Parent.map((parentItem, parentIndex) => (
        <parentItem.componentType key={parentIndex} style={parentItem.style}>
            {jsonData.GalleryHeader.items.map((Item, Index) => (
            Item.componentType === "Typography" ?  
                <Item.componentType component="div" variant={Item.variant} key={Index} style={Item.style}>
                    {Item.text}
                </Item.componentType>
                : null
            ))}

        </parentItem.componentType>
    ))}
    </Box>
  );
};

export default GalleryHeader;
