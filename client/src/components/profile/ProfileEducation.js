import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, to, from, description }
}) => {
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        <Moment format="MMM D, YYYY" date={from} utc={true} /> -{' '}
        {!to ? 'Present' : <Moment format="MMM D, YYYY" date={to} utc={true} />}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field fo Study: </strong>
        {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired
};

export default ProfileEducation;
