import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Users from './pages/Users';
import Create from './pages/Create';
import Header from './components/Header';
import UserDetail from './pages/UserDetail';


import { Container } from 'semantic-ui-react'; 
import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Container>
        <Header />
        <Route exact path='/' component={Home} />
        <Route exact path='/users' component={Users} />
        <Route exact path='/register' component={Create} />
        <Route exact path='/users/:uuid' component={UserDetail} />
      </Container>
    </Router>
  );
}

export default App;
