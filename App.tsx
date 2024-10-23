// App.tsx

import React, {RefObject, useEffect} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {StyleSheet, View} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import theme from './src/styles/theme/theme';


const App = () => {
  return (
    <View style={{flex: 1}}>
      <AppNavigator />
      <FlashMessage 
        position="center" 
        style={styles.flashMessageStyle}
        textStyle={{ fontSize: 16, fontWeight: 'bold' }}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  flashMessageStyle: {
    width: '80%',
    height: 80, 
    justifyContent:'center',//垂直居中
    borderRadius: 10,
    // borderWidth: 1, // 边框宽度
    // borderColor: theme.colors.primary, // 边框颜色
    paddingHorizontal: 15,
    paddingVertical: 10,
    opacity: 0.8,
  },
});
export default App;
