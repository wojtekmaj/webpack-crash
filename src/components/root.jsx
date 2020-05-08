import { hot } from 'react-hot-loader/root';
import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';

import Header from './header';

// Here to split bundle into two, otherwise the main bundle would cause the crash
const CrashMe = lazy(() => import('./pages/crash_me'));

function Root() {
  const content = (
    <Suspense fallback={<p>Loading</p>}>
      <Switch>
        <Route path="/" exact>
          <p>Click this link: <Link to="/crash">Crash me</Link>. Nothing unusual would happen, because we're on 5.0.0-beta.13.</p>
          <p>Run <code>yarn add webpack@5.0.0-beta.14 --dev</code>, run the app again and repeat. Now clicking this link will crash the page.</p>
        </Route>
        <Route path="/crash" exact><CrashMe /></Route>
      </Switch>
    </Suspense>
  );

  return (
    <div>
      <Header />
      {content}
    </div>
  );
}

const isProduction = process.env.NODE_ENV === 'production';
// This line, when changed to "const defaultExport = Root" will unbreak the app
const defaultExport = isProduction ? Root : hot(Root);

export default defaultExport;
