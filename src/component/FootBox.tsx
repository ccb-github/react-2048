import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, ViewStyle, StyleSheet} from 'react-native'
import Dimensions from '../utils/dimension'
import { divStyles } from '../style/common.style';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

const {scale, getFontSize} = Dimensions

const FootBox = (props: {
  gameTime: number;
  moveTime: number;
  style?: ViewStyle;
}) => {
  let [gameTime, setGameTime] = useState(props.gameTime);
  const { moveTime: moveTimeProp } = props

  const [moveTime, setMoveTime] = useState(moveTimeProp)
  const [moveTimeSign, setMoveTimeSign ] = useState("")
  /* useMemo<"+" | "-">(
    () => (moveTimeSign > moveTime ? "+" : "-"),
    [moveTimeProp]
  ); */
  const  opacity = useSharedValue(0)
  let isMoveTimeUpdate: boolean | null = null
  const { style } = props;

  const getTimeInfo = ( duration: number ) => {
    var seconds = Math.floor(duration % 60), hours = Math.floor(duration / 3600), 
        minutes = Math.floor((duration - 3600 * hours)/60);
    return `${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`
  }
  useEffect(() => {
    const removeGameTimeCycle = setInterval(() => {
      setGameTime((preGameTime) => preGameTime + 1)} , 1000)
    return () => {
      clearInterval(removeGameTimeCycle)
    }
  }, [])
  useEffect(() => {
    
    if(moveTimeProp > moveTime) {
      setMoveTimeSign("+")
      setMoveTime(moveTimeProp)
    }
    else if(moveTimeProp < moveTime) {
      setMoveTimeSign("-")
      setMoveTime(moveTimeProp)
    }
    
    opacity.value = withSequence( withTiming(1), withTiming(0))
    //opacity.value = 0
  }, [moveTimeProp])
  const plusMoveAnimationStyle = useAnimatedStyle( () => ({
    opacity: opacity.value
  }))
  useEffect(() => {
    console.log("Foot box update effect")
  })
  console.log("Foot box body statement")
  return (
    <Animated.View style={[divStyles.colDiv, style]}>
      {/* left box */}
      <View style={styles.leftBox}>
        <Text style={{ fontSize: getFontSize(25), fontWeight: "bold" }}>
          Game Time
        </Text>
        <View style={{ justifyContent: "center", width: "100%" }}>
          <Text style={{ fontSize: 30, textAlign: "center" }}>
            {getTimeInfo(gameTime)}
          </Text>
        </View>
      </View>
      {/* right box */}
      <View style={styles.rightBox}>
        <Text
          style={[
            styles.labelText,
            { fontSize: getFontSize(25), fontWeight: "bold" },
          ]}
        >
          Move 
        </Text>

        <View style={styles.moveTimeView}>
          <Text style={{ fontSize: getFontSize(35), ...styles.valueText }}>
            {moveTime}
            <Animated.Text style={[styles.addMoveText, plusMoveAnimationStyle]}>
              {moveTimeSign}1
            </Animated.Text>
          </Text>
          
        </View>
        {/* <View style={styles.addMoveView}>
          
          <Animated.Text style={[styles.addMoveText, plusMoveAnimationStyle]}>
            {moveTimeSign}1
          </Animated.Text>
        
        </View> */}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  statusText: {
    // flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
  },
  //Template style
  labelText: {
    fontWeight: "bold",
    textAlign: "center",
   
  },
  valueText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  
  
  leftBox:{
    flex: 1,
  },
  rightBox:{
    flex: 1,
  },

  gameTimeText: {
    fontSize: getFontSize(20), 
    fontWeight: 'bold',
  },
  moveTimeText: {
    fontSize: getFontSize(20), 
    fontWeight: 'bold',
    textAlign: "center",
  },
  
  moveTimeView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  addMoveText: {
    fontSize: getFontSize(20), 
    fontWeight: 'bold',
  },
  addMoveView: {
    textAlign: "center",
    position: "absolute",
    top: 35 * scale,
    zIndex: 10,
  },
});


export default FootBox