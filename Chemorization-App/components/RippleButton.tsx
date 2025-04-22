import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  SharedValue,
} from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';

interface RippleButtonProps {
  onPress: () => void;
  onLongPress?: () => void;
  animate?: boolean;
  color?: string;
}

const RippleButton: React.FC<RippleButtonProps> = ({
  onPress,
  onLongPress,
  animate = false,
  color = 'green',
}) => {
  const scale1: SharedValue<number> = useSharedValue(1);
  const opacity1: SharedValue<number> = useSharedValue(1);
  const scale2: SharedValue<number> = useSharedValue(1);
  const opacity2: SharedValue<number> = useSharedValue(1);
  const scale3: SharedValue<number> = useSharedValue(1);
  const opacity3: SharedValue<number> = useSharedValue(1);

  useEffect(() => {
    if (!animate) return;

    const startRipple = (
      scale: SharedValue<number>,
      opacity: SharedValue<number>
    ) => {
      scale.value = withRepeat(
        withTiming(2, { duration: 1500, easing: Easing.linear }),
        -1,
        false
      );
      opacity.value = withRepeat(
        withTiming(0, { duration: 1500, easing: Easing.linear }),
        -1,
        false
      );
    };

    startRipple(scale1, opacity1);
    startRipple(scale2, opacity2);
    startRipple(scale3, opacity3);
  }, [animate]);

  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [{ scale: scale1.value }],
    opacity: opacity1.value,
  }));
  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ scale: scale2.value }],
    opacity: opacity2.value,
  }));
  const animatedStyle3 = useAnimatedStyle(() => ({
    transform: [{ scale: scale3.value }],
    opacity: opacity3.value,
  }));

  return (
    <View style={styles.container}>
      {animate && (
        <>
          <Animated.View style={[styles.ripple, animatedStyle1]} />
          <Animated.View style={[styles.ripple, animatedStyle2]} />
          <Animated.View style={[styles.ripple, animatedStyle3]} />
        </>
      )}

      <TouchableOpacity
        style={[styles.micButton, { backgroundColor: color || 'green' }]}
        onPress={onPress}
        onLongPress={onLongPress}
        delayLongPress={500} // Optional: adjust if needed
      >
        <FontAwesome name="microphone" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ripple: {
    position: 'absolute',
    width: 125,
    height: 125,
    borderRadius: 75,
    backgroundColor: 'rgba(34, 139, 34, 0.4)', // Transparent green
  },
  micButton: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
  },
});

export default RippleButton;