import { Route, Switch } from 'react-router';
import './App.css';
import HomePage from './pages/homepage/homepage.component';

function App() {
  return (
    <div>
      <Switch>
        {/* switch will stop after one route is matched and not check after that */}
        <Route exact path='/' component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
