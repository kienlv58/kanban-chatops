import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routerMap from 'src/utils/routerMap';
import Loading from 'src/components/Loading';
import './App.less';

const HomePage = React.lazy(() => import('src/containers/Home'));
const UserPage = React.lazy(() => import('src/containers/User'));
const AboutPage = React.lazy(() => import('src/containers/About'));
const NotFound = React.lazy(() => import('src/containers/NotFound'));

function App() {
  return (
    <Router>
      <React.Suspense fallback={<Loading />}>
        <Switch>
          <Route path={routerMap.ABOUT}>
            <AboutPage />
          </Route>
          <Route path={routerMap.USER}>
            <UserPage />
          </Route>
          <Route exact path={routerMap.HOME}>
            <HomePage />
          </Route>
          <Route exact path={routerMap.NOT_FOUND}>
            <NotFound />
          </Route>
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default App;
