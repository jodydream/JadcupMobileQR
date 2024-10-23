// App.tsx

import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {StyleSheet, View} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import globalStyles from './src/styles/globalStyles';


const App = () => {
  return (
    <View style={{flex: 1}}>
      <AppNavigator />
      <FlashMessage 
        position="center" 
        style={globalStyles.flashMessageStyle}
        textStyle={{ fontSize: 16, fontWeight: 'bold' }}
      />
    </View>
  );
};

export default App;
