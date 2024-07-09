import './App.css';
import Employee from './components/Employee';

function App() {
  const showEmployees = true;
  return (
    <div className="App">

      {showEmployees ?
        (<>
          <Employee name="John" role="Intern" />
          <Employee name="Abby" />
          <Employee name="Bot" />
        </>) : (<p>Show employees is off</p>)}
    </div>
  );
}

export default App;
