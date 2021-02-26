import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Users from './pages/Users';
import Create from './pages/create/Create';
import UserDetail from './pages/UserDetail';
import SuccessCreateUser from './pages/SuccessCreateUser';
import UpdateEmployee from './pages/update/UpdateEmployee';
import UpdateSection from './pages/update/UpdateSection';
import CreateEmployee from './pages/create/CreateEmployee';
import CreateSection from './pages/create/CreateSection';
import Layout from './pages/Layout';
import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';
import Login from './pages/Login';

//TODO エラーハンドラの実装
// TODO Successページの実装

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
                <AuthRoute  path='/detail/:userId' component={UserDetail} />
                <AuthRoute  path='/detail/:userId/employee/update' component={UpdateEmployee} />
                <AuthRoute  path='/detail/:userId/section/update' component={UpdateSection} />
                <AuthRoute  path='/detail/:userId/employee/create' component={CreateEmployee} />
                <AuthRoute  path='/detail/:userId/section/create' component={CreateSection} />
                <AuthRoute  path='/register/success' component={SuccessCreateUser} />
              </Layout>
            </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
