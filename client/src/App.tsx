import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Employee from './pages/Employee';
import Create from './pages/Create';
import Header from './components/Header';


import { Container } from 'semantic-ui-react'; 
import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Container>
        <Header />
        <Route exact path='/' component={Home} />
        <Route exact path='/employees' component={Employee} />
        <Route exact path='/register' component={Create} />
      </Container>
    </Router>
  );
}

export default App;
