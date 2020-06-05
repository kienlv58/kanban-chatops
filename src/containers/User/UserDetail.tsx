import React from 'react';
import { useRouteMatch, useParams, useLocation, useHistory } from 'react-router-dom';

const UserDetail = () => {
  const match = useRouteMatch();
  const params = useParams<{ userId?: string }>();
  const location = useLocation();
  const history = useHistory();
  console.log('match', match);
  console.log('params', params);
  console.log('location', location);
  console.log('history', history);
  return (
    <div>
      this is UserDetail page
      <h4>User ID: </h4>
      {params.userId}
    </div>
  );
};
export default UserDetail;
