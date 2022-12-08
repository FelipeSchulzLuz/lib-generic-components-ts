import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { Pagination, Table } from "react-bootstrap";
import { StyledButtonBlue } from "../UI/buttons";
import { azulForte, azulFraco, cinza, laranjaFraco, vermelhoForte, vermelhoFraco } from "../UI/variaveis";
import PrintIcon from '@mui/icons-material/Print';
import { orange } from '@mui/material/colors';

export const StyledGenericTable = styled(Table)`
border-radius: 6px;
min-width: 70vw;
heigth: 100%;


& > div { border-radius: 6px; }
& * { white-space: nowrap; }

& td {
    font-size: 0.8rem;
    padding: 8px;
    max-width: max-content;
    text-align: center;
}

& tbody tr svg {
    padding-bottom: 6px;
}

& thead {
    text-align: center;
        th {
            color: #fff;
            background-color: ${azulFraco};
            padding: 8px 6px;
            font-size: 0.8rem;
        }

        th:first-of-type { 
            border-top-left-radius: 6px !important;
            display: flex;
            justify-content: center;
        }
        th:last-child { border-top-right-radius: 6px; !important }
    }
}

& tbody {
    tr:last-of-type {
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
    }
}
`;

export const StyledDivPagination = styled.div`
    width: 100%;
    padding: 20px 0 0 0;
    display: flex;
    justify-content: center;
    color: ${azulForte};
    
    & * {
        color: inherit;
    }

    .pagination {
        li.active > .page-link, .page-link.active {
            background-color: ${azulForte};
            border-color: ${azulForte};
            color: white;
        }
    }

`;

export const StyledTableWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const StyledPaginationItem = styled(Pagination.Item)`
.active .page-link {
  background-color: azulFraco;
  border-color: azulFraco;
}
`;

export const StyledTheadNoElement = styled('th')`
    width: max-content;
    display: flex;
    align-items: center;
`;

export const StyledTh = styled.th`
    // cursor: pointer;
    border-right: none;
`;

export const StyledGroupButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    & * {
        font-weight: 600;
    };
`;

export const StyledRedButton = styled(StyledButtonBlue)`
    background-color: ${vermelhoFraco};
    &:hover {
        background-color: ${vermelhoForte};
    }
`;

export const StyledControlTh = styled('th')`
    width: max-width;
    display: flex;
    border: none;
    justify-content: space-around;
    height: 36px;
    padding: 0;

    & > * {
        padding: 0 4px;
    }
`;



export const StyledTrashDeleteButton = styled(DeleteIcon)`
    cursor: pointer;
    color: ${cinza};
    font-size: 1.8rem;
    
    &:hover { 
        color: red;
        transition: 0.3s;
    }
` as typeof Button;

export const StyledEditButton = styled(EditIcon)`
    cursor: pointer;
    color: ${azulForte};
    font-size: 1.8rem;
    
    &:hover {
        color: ${azulForte};
        transition: 0.3s;
    }
` as typeof Button;

export const StyledPrintIcon = styled(PrintIcon)`
cursor: pointer;
color: ${azulFraco};
font-size: 1.8rem;

&:hover { 
    color: ${orange[500]};
    transition: 0.3s;
}
`;