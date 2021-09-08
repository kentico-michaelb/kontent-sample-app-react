import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import LocalizedApp from './SmartLinkApp';
import Configuration from './Pages/Admin/Configuration';
import { CookiesProvider } from 'react-cookie';
import { projectConfigurationPath } from './Utilities/SelectedProject';

import './index.css';

const application = (
  <CookiesProvider>
    <Router>
      <Switch>
        <Route
          path={projectConfigurationPath}
          render={matchProps => <Configuration {...matchProps} />}
        />
        <Route path="/:lang" render={matchProps => <LocalizedApp {...matchProps} />} />
        <Route path="/" render={matchProps => <LocalizedApp {...matchProps} />} />
      </Switch>
    </Router>
  </CookiesProvider>
);

ReactDOM.render(application, document.getElementById('root'));
