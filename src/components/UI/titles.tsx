import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const StyledTypography = styled(Typography)`
    font-family: 'Roboto', sans-serif;
    color: #333333e7;
` as typeof Typography;

export const StyledTitleCharcoal = styled(StyledTypography)`
    color: #333333e7;
    letter-spacing: 0.03em;
` as typeof Typography;