import styled from '@emotion/styled';
import Form from './components/forms';
import { RecoilRoot } from 'recoil';
import AppBar from './components/appBar';
import "react-datepicker/dist/react-datepicker.css";

const Wrapper = styled.div`
    margin: 0;
    padding: 0;
    min-height: 100vh;
  `;

function App() {
  return (
    <Wrapper>
      <RecoilRoot>
        <AppBar />
        <Form />
      </RecoilRoot>
    </Wrapper>
  )
}

export default App
