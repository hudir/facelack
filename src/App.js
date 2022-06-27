import { useContext } from 'react';

import { Context } from './store/Context';

function App() {
  const {state} = useContext(Context)
  return (
    <div className="App">
      {state.appName}

      
    </div>
  );
}

export default App;
