import {
  ViewStyle,
  TextProps,
  TextStyle,
  Text,
  ViewProps,
  ViewProperties,
  View,
  Alert,
  Button,
} from "react-native";
import React, {
  ClassicComponent,
  Component,
  createRef,
  useEffect,
  useRef,
} from "react";
import styles, { innerTileStyle } from "../style/Tile.style";
import Animatable from "../animation/register";
import Dimensions from "../utils/dimension";

import { TileProps, TileState } from "../types/component/Tile";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
const { width: vw, height: vh, scale } = Dimensions;

const MARGIN_WIDTH = 3;

function Tile(props: TileProps) {
  const motionValue = useSharedValue(0);
  const visibilityValue = useSharedValue(0.5);
  const motionStyle = useAnimatedStyle(() => ({
    left:
      props.position[0] * (props.tileWidth + MARGIN_WIDTH * 2) +
      MARGIN_WIDTH * 1 +
      props.motionSign[1] * props.tileWidth,
    top:
      props.position[1] * (props.tileWidth + MARGIN_WIDTH * 2) +
      MARGIN_WIDTH * 1 +
      props.motionSign[0] * props.tileWidth,
    width: props.tileWidth,
    height: props.tileWidth,
  }));

  const visabilityAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withSpring(visibilityValue.value),
  }))

  useEffect(() => {
    // console.log("Visiable effect runned")
   
  },[props.tileOpacity])

  const tileSetting = {};
  const tilePositionStyle = {
    left:
      props.position[0] * (props.tileWidth + MARGIN_WIDTH * 2) +
      MARGIN_WIDTH * 1,
    top:
      props.position[1] * (props.tileWidth + MARGIN_WIDTH * 2) +
      MARGIN_WIDTH * 1,
    width: props.tileWidth,
    height: props.tileWidth,
  };

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
  }, [props.value]);

  if (props.value > 0) {
    return (
      <Animated.View
        style={[
          styles.squareFrame,
          props.style,
          tilePositionStyle,
          //Animate style
          
          motionStyle,
          visabilityAnimatedStyle,
          {
            backgroundColor: innerTileStyle(props.value)["backgroundColor"],
            
          }
        ]}
        
      >
        <Text
          adjustsFontSizeToFit={true}
          style={[
            styles.tileTextBase, 
            innerTileStyle(props.value)
          ]}
        >
          {props.value}
        </Text>
      </Animated.View>
    );
  } else {
    return null;
  }
}
// const AnimatedTile = Animated.createAnimatedComponent(Tile)
export default Tile;
