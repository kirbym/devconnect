// This file has been deprecated. All routes have moved to App.js.
// See issue #17.

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from '../routing/PrivateRoute';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';

const AppRoutes = () => {
  return (
    <section className="container">
      <Alert />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/profile/:id" element={<Profile />} />
        <PrivateRoute path="/dashboard" element={<Dashboard />} />
        <PrivateRoute path="/create-profile" element={<CreateProfile />} />
        <PrivateRoute path="/edit-profile" element={<EditProfile />} />
        <PrivateRoute path="/add-experience" element={<AddExperience />} />
        <PrivateRoute path="/add-education" element={<AddEducation />} />
        <PrivateRoute path="/posts" element={<Posts />} />
        <PrivateRoute path="/post/:postId" element={<Post />} />
        <Route element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default AppRoutes;
