import { useContext } from 'react';
import Login from './components/Login';

import { Context } from './store/Context';

function App() {
  const {state} = useContext(Context)
  return (
    <div className="App">
      <Login />
      
    </div>
  );
}

export default App;
