import styled from 'styled-components';
import { GlobalStyle } from './styles/global';

const Title = styled.h1`
  color: red;
`

export const App = () => {
  return (
    <div className="App">
      <Title>Hello World</Title>
      <GlobalStyle/>
    </div>
  );
}

