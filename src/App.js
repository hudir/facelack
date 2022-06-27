import { useContext } from 'react';
import Home from './components/layout/Home';
import Login from './components/loginAndSignUp/Login';

import { Context } from './store/Context';

function App() {
  const {state} = useContext(Context)
  return (
    <div className="App">
      {state.currentUser ? <Home /> :  <Login />}
     
    </div>
  );
}

export default App;
