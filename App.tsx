import React from 'react';
import NavigationController from '@navigation/NavigationController';
import RootNavigator from '@navigation/RootNavigator';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

const App = () => {

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <IconRegistry icons={EvaIconsPack} />
      <NavigationController>
        <RootNavigator />
      </NavigationController>
    </ApplicationProvider>
  );
};

export default App;
