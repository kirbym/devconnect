import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "../routing/PrivateRoute";
import CreateProfile from "../profile-forms/CreateProfile";
import EditProfile from "../profile-forms/EditProfile";
import AddExperience from "../profile-forms/AddExperience";
import AddEducation from "../profile-forms/AddEducation";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import Posts from "../posts/Posts";
import Post from "../post/Post";
import NotFound from "../layout/NotFound";

const AppRoutes = () => {
  return (
    <section className="container">
      <Alert />
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/profiles" element={<Profiles />} />
        <Route exact path="/profile/:id" element={<Profile />} />
        <PrivateRoute exact path="/dashboard" element={<Dashboard />} />
        <PrivateRoute
          exact
          path="/create-profile"
          element={<CreateProfile />}
        />
        <PrivateRoute exact path="/edit-profile" element={<EditProfile />} />
        <PrivateRoute
          exact
          path="/add-experience"
          element={<AddExperience />}
        />
        <PrivateRoute exact path="/add-education" element={<AddEducation />} />
        <PrivateRoute exact path="/posts" element={<Posts />} />
        <PrivateRoute exact path="/post/:postId" element={<Post />} />
        <Route element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default AppRoutes;
