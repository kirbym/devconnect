import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({
  experience: { company, title, to, from, description }
}) => {
  return (
    <div>
      <h3 className="text-dark">{company}</h3>
      <p>
        <Moment format="MMM D, YYYY" date={from} utc={true} /> -{' '}
        {!to ? 'Present' : <Moment format="MMM D, YYYY" date={to} utc={true} />}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired
};

export default ProfileExperience;
