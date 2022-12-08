import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { azulForte, azulFraco } from "./variaveis";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const StyledButtonBlue = styled(Button)`
background-color: ${azulFraco};
color: white;
font-weight: bold;
width: max-content;

&:hover {
    background-color: ${azulForte};
    pointer: pointer;
}

& * {
    margin: 5px 0 2px 0;
    padding: 0;
}
`;

export const StyledArrowBackIcon = styled(ArrowBackIcon)`
    color: ${azulForte};
    margin: 0 4px 6px 0;
    font-size: 2.5rem;
    cursor: pointer;
`;

export const StyledButton = styled(Button)`
    max-width: max-content;
    padding: 0;
    margin-bottom: 18px;
    & h2 {
        display: flex;
        padding: 6px 0 0 0;
        align-items: center;
    }
`;
