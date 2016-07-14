import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Components
import Layout from './containers/Layout';
import Home from './containers/Home';
import Test from './containers/Test';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
    <Route path="test" component={Test} />
  </Route>
);
