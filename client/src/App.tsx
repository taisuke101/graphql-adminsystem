import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Users from './pages/Users';
import Create from './pages/create/Create';
import UserDetail from './pages/UserDetail';
import SuccessUser from './pages/SuccessUser';
import UpdateEmployee from './pages/UpdateEmployee';
import UpdateSection from './pages/UpdateSection';
import CreateEmployee from './pages/create/CreateEmployee';
import CreateSection from './pages/create/CreateSection';
import Layout from './pages/Layout';
import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';
import Login from './pages/Login';


import { Container } from 'semantic-ui-react'; 
import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
            <Container>
              <Layout>
                <Route exact path='/' component={Login} />
                <AuthRoute  path='/home' component={Home} />
                <AuthRoute  path='/users' component={Users} />
                <AuthRoute  path='/register' component={Create} />
                <AuthRoute  path='/detail/:uuid' component={UserDetail} />
                <AuthRoute  path='/success/user' component={SuccessUser} />
                <AuthRoute  path='/update/employees/:uuid' component={UpdateEmployee} />
                <AuthRoute  path='/update/sections/:uuid' component={UpdateSection} />
                <AuthRoute  path='/create/employees/:uuid' component={CreateEmployee} />
                <AuthRoute  path='/create/sections/:uuid' component={CreateSection} />
              </Layout>
            </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
