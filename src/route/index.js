// =========================
// Base router
// =========================

// ===================
// Libs
// ===================

import React from 'react';
import { Route, Redirect, IndexRedirect } from 'react-router';

// ===================
// Containers
// ===================

import RootContainer from '../a_container/root';
import TestContainer from '../a_container/home/index';
import TestContainer2 from '../a_container/home2/index';
import TestContainer3 from '../a_container/nav/index';

// ===================
// Async get routes
// ===================

// TODO

// ===================
// Exports
// ===================

// 可以在这里写一些在路由即将被改变时触发的函数
// 可以用参数replace改变接下来的路由地址
const requireAuth = (nextState, replace) => {
    // replace({ pathname: '/login' });
};

export default (
  <Route path="/" component={RootContainer}>
    <IndexRedirect to="/home" />
    <Route onEnter={requireAuth} path="/home" component={TestContainer} />
    <Route onEnter={requireAuth} path="/home2" component={TestContainer2} />
    <Route onEnter={requireAuth} path="/nav" component={TestContainer3} />
    <Redirect from='*' to='/'  />
  </Route>
);
