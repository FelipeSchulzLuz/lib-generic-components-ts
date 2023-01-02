import styled from '@emotion/styled';
import Form from './components/forms';
import { RecoilRoot } from 'recoil';
import AppBar from './components/appBar';
import "react-datepicker/dist/react-datepicker.css";

const Wrapper = styled.div`
    margin: 0;
    padding: 0;
    min-height: 100vh;

    grid-template-areas:
    "header header header"
    "sideContent content content"
    "footer footer footer";
    
    grid-template-rows: 60px 1fr 60px;
    grid-template-columns: auto;
  `;

const StyledContainer = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 1fr;

    padding: 0 80px;
`;

function App() {
  return (
    <RecoilRoot>
      <Wrapper>
        <AppBar />
        <StyledContainer>
        <Form />
        </StyledContainer>
      </Wrapper>
    </RecoilRoot>
  )
}

export default App
