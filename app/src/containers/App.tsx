import * as React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Public } from '../components/Public';
import { Welcome } from '../components/Welcome';
import { AuthProvider } from '../auth/providers/authProvider';
import { SilentRenew } from '../auth/components/SilentRenew';
import { Dashboard } from '../tracker/components/Dashboard';
import { Chapter } from '../tracker/components/Chapter';
import { Go } from '../tracker/components/Go';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <AuthProvider>
          <BrowserRouter basename="/">
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route path="/bible/:book/:chapter" component={Chapter} />
              <Route path="/go" component={Go} />
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
