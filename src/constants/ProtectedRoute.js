import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import PropTypes from 'prop-types';

const ProtectedRoute = ({ store }) => {
  const user = store.userInfo.isUser;
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
};

ProtectedRoute.propTypes = {
  store: PropTypes.any
};

export default observer(ProtectedRoute);
