import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ViewStyle, StyleSheet} from 'react-native'
import Dimensions from '../utils/dimension'

import * as Animatable from 'react-native-animatable'
import { divStyles } from '../style/common.style';

const {scale, getFontSize} = Dimensions

const FootBox = (props: {
  gameTime: number;
  moveTime: number;
  style?: ViewStyle;
}) => {
  let [gameTime, setGameTime] = useState(props.gameTime);
  const { moveTime } = props
  let isMoveTimeUpdate: boolean | null = null
  const { style } = props;
  const getTimeInfo = ( duration: number ) => {
    var seconds = Math.floor(duration % 60), hours = Math.floor(duration / 3600), 
        minutes = Math.floor((duration - 3600 * hours)/60);
    return `${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`
  }
  useEffect(() => {
    isMoveTimeUpdate = true
  }, [moveTime])
  useEffect(() => {
    console.log("Foot box update effect")
  })
  console.log("Foot box body statement")
  return (
    <View style={[divStyles.colDiv, style]}>
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
          </Text>
        </View>
        <View style={styles.addMoveView}>
          {isMoveTimeUpdate ? 
          <Animatable.Text animation={"zoomOut"} style={styles.addMoveText}>
            +1
          </Animatable.Text>
         : null}
        </View>
      </View>
    </View>
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
    zIndex: 1,
  },
});


export default FootBox