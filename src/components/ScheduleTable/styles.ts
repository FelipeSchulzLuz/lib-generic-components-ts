import styled from "@emotion/styled";
import { azulForte } from "../../UI/variaveis";

export const StyledTableItems = styled.div`
    display: flex;
    padding: 15px 10px;
    flex-direction: column;
    height: 100%;
    margin: 50px 0 0 60px;
`;

export const StyledIconButtonTHead = styled('th')`
    border: 0;
    heigth: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover { background-color: ${azulForte}; transition: 0.3s; }
`;

export const StyledDivHeader = styled.div`
    display: flex;
    align-items: center;
    margin: 6px 0;
    justify-content: space-between;
`;

