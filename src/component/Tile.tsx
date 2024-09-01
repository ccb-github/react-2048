import {
  Text,
} from "react-native";
import React, {
  useEffect,
  useRef,
} from "react";
import styles, { innerTileStyle } from "../style/Tile.style";
import Dimensions from "../utils/dimension";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { TileProps } from "#/component/tile";
import useScaledSize from "../utils/useScaledSize";



const MARGIN_WIDTH = 3

function Tile(props: TileProps) {
  const visibilityValue = useSharedValue(1)
  const preValue = useRef(props.value)

  

  const visabilityAnimatedStyle = useAnimatedStyle(() => ({
    opacity: visibilityValue.value,
    // width: props.tileWidth * visibilityValue.value,
    transform: [{ scale: visibilityValue.value }],
  }))

  const tilePositionStyle = {
    left:
      props.position[0] * (props.tileWidth + useScaledSize(MARGIN_WIDTH * 2) ) +
      useScaledSize(MARGIN_WIDTH),
    top:
      props.position[1] * (props.tileWidth + useScaledSize(MARGIN_WIDTH * 2) ) +
      useScaledSize(MARGIN_WIDTH),
    // width: props.tileWidth,
    height: props.tileWidth,
  }

  useEffect(() => {
    // switch(props.moveMent) {
    //   case 'left':
    //     break
    //   case 'right':
    //     break
    //   case 'up':
    //     break
    //   case 'down':
    //     break
    // }
    console.log(
      `Value change effect runned ${preValue.current}, ${props.value}`,
    )
    if (props.value > preValue.current) {
      visibilityValue.value = withSequence(
        withTiming(0.2, { duration: 30 }),
        withTiming(1, { duration: 400 }),
      )
    }
  }, [props.value])

  return (
    <Animated.View
      style={[
        styles.squareFrame,
        tilePositionStyle,
        props.style,
        {
          backgroundColor: innerTileStyle(props.value).backgroundColor,
        },
        visabilityAnimatedStyle,
      ]}
    >
      <Text
        adjustsFontSizeToFit={true}
        style={[
          styles.tileTextBase,
          {
            overflow: "hidden",
            fontSize: innerTileStyle(props.value).fontSize,
            color: innerTileStyle(props.value).color,
          },
        ]}
      >
        {props.value}
      </Text>
    </Animated.View>
  )
}

export default Tile
