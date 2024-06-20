import CelebrationContainer from '@container/home/CelebrationContainer';

import NoNavigationLayout from '@components/base/NoNavigationLayout';

import React from 'react';

const celebration = () => {
  return (
    <NoNavigationLayout>
      <CelebrationContainer />
    </NoNavigationLayout>
  );
};

export default celebration;
