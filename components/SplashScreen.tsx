import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';

interface Props {
  onFinish: (param: boolean) => void;
}

const SplashScreen: React.FC<Props> = ({ onFinish }) => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <LottieView
        source={require('../assets/dsstore.json')}
        autoPlay
        loop={false}
        speed={1}
        resizeMode="cover"
        
        style={styles.animation}
        onAnimationFinish={() => {
          setTimeout(() => {
            onFinish(true);
          }, 300);
        }}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"fff"
  },
  animation: {
    flex: 1,
  },
});
