import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const ListUser = () => {
  const match = useRouteMatch();
  return (
    <div>
      this is ListUser page
      <ul>
        {[1, 2, 3, 4].map(id => {
          return (
            <li key={id}>
              <Link key={id} to={`${match.url}/${id}?abc=2`}>
                user id {id}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default ListUser;
