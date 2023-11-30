import LoginContainer from '@container/login/LoginContainer';

import NoNavigationLayout from '@components/base/NoNavigationLayout';

import React from 'react';

const index = () => {
  return (
    <NoNavigationLayout>
      <LoginContainer />
    </NoNavigationLayout>
  );
};

export default index;
