import { Button } from '@mui/material';
import styled from 'styled-components';

export const ModalStyled = styled.div({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "max-content",
    background: '#fff',
    border: '1px solid #3e3e3e',
    borderRadius: '5px',
    boxShadow: '24px 24px 48px #d9d9d9, -24px -24px 48px #ffe',
    padding: '20px 20px',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
});

export const StyledContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    padding: '10px 0'
});

export const StyledButton = styled(Button)`
    position: absolute;
    top: 5px;
    right: 5px;
`;