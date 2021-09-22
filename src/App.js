import React from 'react';
import Login from './components/Login';
import Chats from './components/Chats';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <div className="app">
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/chats' component={Chats} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
