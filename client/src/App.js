import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/layout/NotFound';
// import Dashboard from './components/dashboard/Dashboard';
// import PrivateRoute from './components/routing/PrivateRoute';
// import CreateProfile from './components/profile-forms/CreateProfile';
// import EditProfile from './components/profile-forms/EditProfile';
// import AddExperience from './components/profile-forms/AddExperience';
// import AddEducation from './components/profile-forms/AddEducation';
// import Posts from './components/posts/Posts';
// import Post from './components/post/Post';

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
          <Alert />
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/profile/:id" element={<Profile />} />
            {/* <PrivateRoute path="/dashboard" element={<Dashboard />} />
            <PrivateRoute path="/create-profile" element={<CreateProfile />} />
            <PrivateRoute path="/edit-profile" element={<EditProfile />} />
            <PrivateRoute path="/add-experience" element={<AddExperience />} />
            <PrivateRoute path="/add-education" element={<AddEducation />} />
            <PrivateRoute path="/posts" element={<Posts />} />
            <PrivateRoute path="/post/:postId" element={<Post />} /> */}
            <Route element={<NotFound />} />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
