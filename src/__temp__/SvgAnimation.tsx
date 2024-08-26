import { type FC } from "react";
import { View, StyleSheet, Button } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type CircularProgressProps = {
  strokeWidth: number;
  radius: number;
  backgroundColor: string;
  percentageComplete: number;
};

export const CircularProgress: FC<Partial<CircularProgressProps>> = ({
  radius = 30,
  strokeWidth = 10,
  backgroundColor = "#fff",
  percentageComplete = 85,
}) => {
  const innerRadius = radius - strokeWidth / 2;
  const circumfrence = 2 * Math.PI * innerRadius;
  const invertedCompletion = (100 - percentageComplete) / 100;

  const theta = useSharedValue(2 * Math.PI * 1.001);
  const animateTo = useDerivedValue(() => 2 * Math.PI * invertedCompletion);
  const textOpacity = useSharedValue(1);
  const circleRadius = useSharedValue(5);
  const FADE_DELAY = 1500;

  const animatedProps = useAnimatedProps(() => {
    return {
      r: withTiming(circleRadius.value, {
        duration: FADE_DELAY,
      }),
    };
  });

  const powerTextStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(textOpacity.value, {
        duration: FADE_DELAY,
      }),
    };
  });

  const powerPercentTextStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(textOpacity.value, {
        duration: FADE_DELAY,
      }),
    };
  });

  return (
    <View style={[styles.container]}>
      <Animated.Text style={[styles.powerText, powerTextStyle]}>
        Power %
      </Animated.Text>
      <Animated.Text style={[styles.powerPercentage, powerPercentTextStyle]}>
        {percentageComplete}
      </Animated.Text>
      <Button
        title="Animate!"
        onPress={() => {
          circleRadius.value += 1;
          console.log(circleRadius.value);

          if (textOpacity.value === 0) {
            theta.value = animateTo.value;
            textOpacity.value = 1;
          } else {
            theta.value = 2 * Math.PI * 1.001;
            textOpacity.value = 0;
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  powerText: {
    fontSize: 30,
    fontWeight: "300",
  },
  powerPercentage: {
    fontSize: 60,
    fontWeight: "200"
  }
})
