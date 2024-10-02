import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';


const ProtectedRoutes = ({ children }) => {
    const token = useSelector((state) => state.token.token.accessToken)

  if (!token) {
    return <Navigate to="/" />;
  } else if (token) return children;
};

ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoutes;
