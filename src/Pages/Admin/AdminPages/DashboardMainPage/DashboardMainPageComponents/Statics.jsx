//React
import {} from "react";

import {} from "react-redux";

//Components
import StaticsTitle from "./StaticsTitle";
import StaticsInfo from "./StaticsInfo";

//MUI
import { Paper } from "@mui/material";
import { styled } from "@mui/system";

//Styled Components
const StyledStatics = styled(Paper)(({ theme }) => ({
    padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
}));


const Statics = () => {
    return (
        <StyledStatics elevation={4}>
            <StaticsTitle />
            <StaticsInfo />
        </StyledStatics>
    );
};

export default Statics;
