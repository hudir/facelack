import { useContext } from 'react';
import styled from 'styled-components';
import Home from './components/layout/Home';
import Login from './components/loginAndSignUp/Login';
import { Context } from './store/Context';



function App() {
  const {state} = useContext(Context)
  return (
    <AppContainer className="App">
      {state.currentUser ? <Home /> :  <Login />}
     
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
height: 100vh;
`
