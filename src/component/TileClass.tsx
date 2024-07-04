import {
  ViewStyle, TextProps, TextStyle, Text, ViewProps, ViewProperties, View
} from 'react-native';
import React, { ClassicComponent, Component, createRef } from 'react'
import styles, { innerTileStyle} from '../style/Tile.style'
import Animatable from '../animation/register'
import Dimensions from '../utils/dimension'
import type { AnimatableProperties, View as AnimatedView } from 'react-native-animatable';
import { TileProps, TileState } from '../types/component/Tile';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
const {width: vw, height:vh, scale} = Dimensions






/* const Square = React.forwardRef( (props, ref) => { 
  let [valueState ,setValueState] = useState(props.value)
  
  return (
    <Animatable.View
      newFunction = {()=>{}}
      ref={ref}
      style={[tileStyle.squareFrame, tileStyle.innerTileStyle(valueState)]}
      animation="zoomIn">
        
      <Text>{valueState>0? valueState : ''}</Text>
    </Animatable.View>
  );
}) */

const MARGIN_WIDTH = 0
class Tile extends React.PureComponent<TileProps, TileState> {
  //ITEM_WIDTH: number;
  tileSetting: {};
  
  refObj = createRef();
  tilePositionStyle: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  testMember = {
    "Make sense": () => {
      return "Did this get execute";
    },
  };
  viewRef: React.RefObject<Animatable.View>
  motionValue = useSharedValue(0)
  motionStyle = useAnimatedStyle(() => ({
    left: this.props.motionSign[1] * this.props.tileWidth,
    top: this.props.motionSign[0] * this.props.tileWidth
  }))

  constructor(props: TileProps) {
    super(props);
  
    console.log(props);
    this.viewRef = createRef<AnimatedView>();
    //this.ITEM_WIDTH = (vw - MARGIN_WIDTH * 8) >> 2;
    this.tileSetting = {};
    this.tilePositionStyle = {
      left:
        props.position[0] * (this.props.tileWidth + MARGIN_WIDTH * 2) +
        MARGIN_WIDTH * 2,
      top:
        props.position[1] * (this.props.tileWidth + MARGIN_WIDTH * 2) +
        MARGIN_WIDTH * 2,
      width: this.props.tileWidth,
      height: this.props.tileWidth
    };
  }

  componentDidUpdate(_prevProps: TileProps, _prevState: TileState) {
    console.log(`Tile.view ${this.props.position}`, this.viewRef);
    
    this.motionValue.value += 1
    // switch(this.props.moveMent) {
    //   case 'left':
    //     break
    //   case 'right':
        
    //     break
    //   case 'up':
    //     break
    //   case 'down':
    //     break
    // }
  }

  

  render() {
    if (this.props.value > 0) {
      return (
        <Animatable.View
          ref={this.viewRef}
          animation={this.props.animation}
          iterationCount={1}
          useNativeDriver={true}
          
          style={[
            styles.squareFrame,
            this.props.style,
            this.tilePositionStyle,
            this.motionStyle,
            { borderColor: "blue" ,
            },
          ]}
        >
          <Text
            adjustsFontSizeToFit={true}
            style={[styles.baseTileText, innerTileStyle(this.props.value)]}
          >
            {this.props.value}
          </Text>
        </Animatable.View>
      );
    } else {
      return null;
    }
  }
}
const AnimatedTile = Animated.createAnimatedComponent(Tile)
export default AnimatedTile

