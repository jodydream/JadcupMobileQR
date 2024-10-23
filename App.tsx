// App.tsx

import React, {RefObject, useEffect} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {View} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import globalStyles from './src/styles/globalStyles';


const App = () => {
  return (
    <View style={{flex: 1}}>
      <AppNavigator />

      {/* 统一设置Toast */}
      <FlashMessage 
        position="center" 
        style={globalStyles.flashMessageStyle}
        textStyle={{ fontSize: 16, fontWeight: 'bold' }}
      />
    </View>
  );
};

