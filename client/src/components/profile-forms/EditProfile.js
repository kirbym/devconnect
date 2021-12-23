import React, { useState, Fragment, useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

// Small reducer to handle updating the state when
// input fields are changed
const formUpdateReducer = (state, action) => {
  return {
    ...state,
    [action.type]: action.payload
  };
};

// Logic to initialize starting state
// Shape of state is set below when returning the object
const initializeState = (profileStateSlice) => {
  const { loading, profile } = profileStateSlice;

  return {
    company: loading || !profile.company ? '' : profile.company,
    website: loading || !profile.website ? '' : profile.website,
    location: loading || !profile.location ? '' : profile.location,
    status: loading || !profile.status ? '' : profile.status,
    skills: loading || !profile.skills ? '' : profile.skills.join(','),
    githubusername:
      loading || !profile.githubusername ? '' : profile.githubusername,
    bio: loading || !profile.bio ? '' : profile.bio,
    twitter: loading || !profile.social.twitter ? '' : profile.social.twitter,
    facebook:
      loading || !profile.social.facebook ? '' : profile.social.facebook,
    linkedin:
      loading || !profile.social.linkedin ? '' : profile.social.linkedin,
    youtube: loading || !profile.social.youtube ? '' : profile.social.youtube,
    instagram:
      loading || !profile.social.instagram ? '' : profile.social.instagram
  };
};

const EditProfile = ({ profileSlice, createProfile, getCurrentProfile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const navigate = useNavigate();

  // 'useReducer' instead of 'useState' so that the profile (and all of its fields) is
  // not a dependency of the 'useEffect' (where the profile fields were
  // being updated before)
  const [profileInfo, dispatch] = useReducer(
    formUpdateReducer,
    profileSlice,
    initializeState
  );

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = profileInfo;

  // dispatch (from useReducer above) action with
  // type: event.target.name and
  // payload: event.target.value
  // to trigger state update
  const onChange = (e) =>
    dispatch({ type: e.target.name, payload: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(profileInfo, navigate, true);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            City &amp; state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profileSlice: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profileSlice: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  EditProfile
);
