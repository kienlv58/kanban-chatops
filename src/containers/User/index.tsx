import React from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import Loading from 'src/components/Loading';
import routerMap from 'src/utils/routerMap';

const UserDetail = React.lazy(() => import('./UserDetail'));
const ListUser = React.lazy(() => import('./ListUser'));

const User = () => {
  const match = useRouteMatch();
  return (
    <div>
      <Link to={{ pathname: routerMap.HOME }}>Home</Link>
      {'   \t'}
      <Link to={{ pathname: routerMap.ABOUT }}>About</Link>
      <h1>Header User page</h1>
      <React.Suspense fallback={<Loading />}>
        <Switch>
          {/*<Route exact path={routerMap.USER} component={ListUser} /> //instead below*/}
          <Route exact path={match.url} component={ListUser} />
          {/*<Route path={`${match.url}/:userId`} component={UserDetail} /> //instead below*/}
          <Route path={routerMap.USER_DETAIL} component={UserDetail} />
        </Switch>
      </React.Suspense>
    </div>
  );
};
export default User;
