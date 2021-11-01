import * as React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Tasks } from '../components/tasks/Tasks';
import { Public } from '../components/Public';
import { Welcome } from '../components/auth/Welcome';
import { AuthProvider } from '../providers/authProvider';
import { SilentRenew } from '../components/auth/SilentRenew';
import { Dashboard } from '../tracker/components/Dashboard';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <AuthProvider>
          <BrowserRouter basename="/">
            <Switch>
              <Route exact path="/tasks" component={Tasks} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/signin-callback.html" component={Welcome} />
              <Route exact path="/silent-renew.html" component={SilentRenew} />
              <Route exact path="/" component={Public} />
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
