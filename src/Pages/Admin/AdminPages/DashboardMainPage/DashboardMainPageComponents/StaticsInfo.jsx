//React
import {
    
} from 'react'

import {
    
} from 'react-redux'


//images
import graph from "./../../../../../Assets/Images/graph.png"
import customService from "./../../../../../Assets/Images/customer-service.png"
import box from "./../../../../../Assets/Images/box.png"
import revenue from "./../../../../../Assets/Images/revenue.png"

//Components
import StaticBox from './StaticBox'

//MUI
import {
    Box
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledStaticsInfo = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        justifyContent: "space-between"
    })
)


const StaticsInfo = () => {
    return (
        <StyledStaticsInfo>
            <StaticBox
            image={graph}
            title={"Seller"}
            number={"220K"}
            />
            <StaticBox
            image={customService}
            title={"Customers"}
            number={"8.549K"}
            />
            <StaticBox
            image={box}
            title={"Products"}
            number={"1.423K"}
            />
            <StaticBox
            image={revenue}
            title={"Revenue"}
            number={"9745$"}
            />

        </StyledStaticsInfo>
    );
};

export default StaticsInfo;