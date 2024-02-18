//React
import {} from "react";

import {} from "react-redux";

//Components
import StaticsTitle from "./StaticsTitle";
import StaticsInfo from "./StaticsInfo";

//MUI
import { Card } from "@mui/material";
import { styled } from "@mui/system";

//Styled Components
const StyledStatics = styled(Card)(({ theme }) => ({
    padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
}));


const Statics = () => {
    return (
        <StyledStatics >
            <StaticsTitle />
            <StaticsInfo />
        </StyledStatics>
    );
};

export default Statics;
