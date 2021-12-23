import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import AppRoutes from './components/routing/Routes';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route element={<AppRoutes />} />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
