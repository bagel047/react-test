import './index.css';
import Employee from './components/Employee';
import { useState } from 'react';

function App() {
  const [role, setRole] = useState('dev');
  const showEmployees = true;
  return (
    <div className="App">

      {showEmployees ?
        (<>
          <label className="bg-blue-200">Role: </label>
          <input className="bg-blue-200" type='text' onChange={(e) => {
            console.log(e.target.value);
            setRole(e.target.value);
          }}></input>
          <Employee name="John" role="Intern" />
          <Employee name="Abby" role={role} />
          <Employee name="Bot" />
        </>) : (<p>Show employees is off</p>)}
    </div>
  );
}

export default App;
