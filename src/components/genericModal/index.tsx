import CloseIcon from '@mui/icons-material/Close';
import { Button, Typography } from "@mui/material";
import { MutableRefObject, ReactElement } from "react";
import { ModalStyled, StyledButton, StyledContainer } from "./styles";

type ModalProps = {
  component: JSX.Element;
  title?: string;
  useRef: MutableRefObject<null>
  open: boolean;
  changeOpen: (open: boolean) => void;
}

function GenericModal(props: ModalProps) {
  const Component: ReactElement<any, any> = props.component;
  const {changeOpen, open} = props;

  return (
    <StyledContainer>
      <Button className="button-modal" variant="contained" onClick={() => changeOpen(true)} >Adicionar Item</Button>
      <ModalStyled className="modal" style={{ display: open ? 'flex' : 'none' }}>
        <Typography id="modal-title" variant="h6" component="h2">{props.title}</Typography>
        {Component ? Component : null}
        <StyledButton onClick={() => changeOpen(false)}>{<CloseIcon/>}</StyledButton>
      </ModalStyled>

    </StyledContainer>)
}

export default GenericModal;