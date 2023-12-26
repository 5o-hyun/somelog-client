import DecoContainer from '@container/home/DecoContainer';

import NoNavigationLayout from '@components/base/NoNavigationLayout';

import React from 'react';

const deco = () => {
  return (
    <NoNavigationLayout>
      <DecoContainer />
    </NoNavigationLayout>
  );
};

export default deco;
