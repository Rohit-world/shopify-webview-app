// components/AnimatedTabIcon.tsx
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  name: string;
  color: string;
  size: number;
  isFocused: boolean;
};

const AnimatedTabIcon = ({ name, color, size, isFocused }: Props) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isFocused ? 1.3 : 1,
      useNativeDriver: true,
    }).start();
  }, [isFocused]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Ionicons name={name} size={size} color={color} />
    </Animated.View>
  );
};

export default AnimatedTabIcon;
