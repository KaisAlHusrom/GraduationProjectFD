//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import useEffectFetchData from '../../../Helpers/customHooks/useEffectFetchData'
import { fetchSpecificUserPages } from '../../../Services/UserServices/Services/pagesUsersService'
import EmptySection from '../sections/EmptyDesign/Sections/EmptySection/EmptySection'
import { updateUserSorting } from '../../../Services/UserServices/Services/designUsersService'

//Styled Components
const StyledPageRouter = styled(Box)(
    ({ theme }) => ({

    })
)


const PageRouter = ({
    pageId , 
    isMobileWidth,
    isTabletWidth ,
    isLaptopWidth,
}) => {

    console.log(pageId)
    const params = useMemo(() => [pageId], [pageId]);

    const { data  , setData} = useEffectFetchData(fetchSpecificUserPages, params, true, true);

    console.log(data)

    const moveSectionUp = async (designId) => {
        if (!data) return;
    
        try {
            const index = data.designs.findIndex((design) => design.id === designId);
    
            // Check if the design is not already at the top or the first in sequence
            if (index > 0 && data.designs[index].sequence_number !== 1) {
                const newDesigns = [...data.designs];
                const currentDesign = newDesigns[index];
                const aboveDesign = newDesigns[index - 1];
    
                // Swap positions based on sequence_number
                newDesigns[index - 1] = currentDesign;
                newDesigns[index] = aboveDesign;
    
                // Update sequence numbers in the new designs array
                newDesigns.forEach((design, i) => {
                    design.sequence_number = i + 1; // Assuming sequence_number starts from 1   
                });
    
                // Set the state with updated designs
                setData((prevMainPage) => ({
                    ...prevMainPage,
                    designs: newDesigns,
                }));
    
                // Update backend with new designs array
                const UpdatedDesigns = [
                    {
                        id: aboveDesign.id,
                        sequence_number: aboveDesign.sequence_number,
                    },
                    {
                        id: currentDesign.id,
                        sequence_number: currentDesign.sequence_number,
                    },
                ];
                await updateUserSorting(UpdatedDesigns);
            } else {
                console.log("Cannot move the section up: already at the top or first in sequence");
            }
        } catch (error) {
            console.error('Error moving section up:', error);
        }
    };
    
    
    
    const moveSectionDown = async (designId) => {
        if (!data) return;
    
        try {
            const index = data.designs.findIndex((design) => design.id === designId);
    
            // Check if the design is not already at the bottom and not the last in sequence
            if (index < data.designs.length - 1 && data.designs[index].sequence_number > 1) {
                const newDesigns = [...data.designs];
                const currentDesign = newDesigns[index];
                const belowDesign = newDesigns[index + 1];
    
                // Swap positions based on sequence_number
                newDesigns[index] = belowDesign;
                newDesigns[index + 1] = currentDesign;
    
                // Update sequence numbers in the new designs array
                newDesigns.forEach((design, i) => {
                    design.sequence_number = i + 1; // Assuming sequence_number starts from 1
                });
    
                // Set the state with updated designs
                setData((prevMainPage) => ({
                    ...prevMainPage,
                    designs: newDesigns,
                }));
    
                // Update backend with new designs array
                const UpdatedDesigns = [
                    {
                        id: currentDesign.id,
                        sequence_number: currentDesign.sequence_number,
                    },
                    {
                        id: belowDesign.id,
                        sequence_number: belowDesign.sequence_number,
                    },
                ];
                await updateUserSorting(UpdatedDesigns);
            } else {
                console.log("Cannot move the section down: already at the bottom or last in sequence");
            }
        } catch (error) {
            console.error('Error moving section down:', error);
        }
    };

    

    return (
        <StyledPageRouter >
            {
            
            data?.designs?.sort((a, b) => a.sequence_number - b.sequence_number)
            .map((section, index) => (
                <div key={index} >
                    <EmptySection
                        designData={section}
                        updateMainPage={setData}
                        moveSectionUp={moveSectionUp}
                        moveSectionDown={moveSectionDown}
                    />
                </div>
            ))

        }
        </StyledPageRouter>
    );
};

PageRouter.propTypes = {
    children: propTypes.array
}

export default PageRouter;