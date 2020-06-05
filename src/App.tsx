import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routerMap from 'src/utils/routerMap';
import Loading from 'src/components/Loading';

const HomePage = React.lazy(() => import('src/containers/Home'));
const UserPage = React.lazy(() => import('src/containers/User'));
const AboutPage = React.lazy(() => import('src/containers/About'));
// import Footer from 'src/components/Footer';
// import logo from './logo.svg';
// import './App.css';

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
        </Switch>
      </React.Suspense>
    </Router>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
//           Learn React
//         </a>
//         <Footer name={'xin chao'} />
//       </header>
//     </div>
//   );
// }

export default App;
