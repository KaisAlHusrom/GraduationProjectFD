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
import useEffectFetchData from '../../../../../Helpers/customHooks/useEffectFetchData'
import { fetchSpecificUserPages } from '../../../../../Services/UserServices/Services/pagesUsersService'
import PreviewSection from './PreviewSection'

//Styled Components
const StyledMainRouter = styled(Box)(
    ({ theme }) => ({
    
    })
)


const MainRouter = ({
    pageId , 

}) => {
    const params = useMemo(() => [pageId], [pageId]);

    const { data  , setData} = useEffectFetchData(fetchSpecificUserPages, params, true, true);



    return (
        <StyledMainRouter>
              {
            
            data?.designs?.sort((a, b) => a.sequence_number - b.sequence_number)
            .map((section, index) => (
                <div key={index} >
                     <PreviewSection
                            key={`design-${index}`}
                            designData={section}
                        />
                </div>
            ))

        }
        </StyledMainRouter>
    );
};

MainRouter.propTypes = {
    children: propTypes.array
}

export default MainRouter;