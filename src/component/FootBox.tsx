import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  type ViewStyle,
  StyleSheet,
  Alert,
  useWindowDimensions,
} from "react-native"
import Dimensions from "../utils/dimension"
import { divStyles } from "../style/common.style"
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated"
import useScaledFontSize from "../utils/useScaledFontSize"

const { getFontSize } = Dimensions

type GameTimeBoxProps = {
  gameTimeText?: number
}

class GameTimeBox extends React.Component<GameTimeBoxProps> {
  // constructor(props: GameTimeBoxProps) {
  //   super(props)
  //   this.state = {
  //     gameTimeText: props.gameTimeText
  //   }
  // }

  // static getDerivedStateFromProps(props: GameTimeBoxProps, state: GameTimeBoxState) {
  //   return { ...props};
  // }

  // componentDidUpdate(
  //   prevProps: Readonly<GameTimeBoxProps>,
  //   prevState: Readonly<GameTimeBoxProps>,
  // ) {
  //   console.log({ propsInClass: this.props.gameTimeText })
  // }

  shouldComponentUpdate(
    nextProps: Readonly<GameTimeBoxProps>,
    nextState: Readonly<GameTimeBoxProps>,
    nextContext: unknown,
  ): boolean {
    // this.setState({
    //   gameTimeText: this.props.gameTimeText,
    // })
    console.log("Should update", {
      nextProps,
      currentProps: this.props,
    })
    return true
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            height: 250,
            width: "100%",
          }}
        >
          {"Move"}
          {this.props.gameTimeText}
          {/* <AnimatedCirle
            cx="50%"
            cy="50%"
            
            fill="blue"
          /> */}
        </Text>
      </View>
    )
  }
}

const AnimatedGameTimeBox = Animated.createAnimatedComponent(GameTimeBox)

const FootBox = (props: {
  gameTime: number
  moveTime: number
  style?: ViewStyle
}) => {
  const { moveTime: moveTimeProp, style, gameTime: gameTimeProp } = props
  const [gameTime, setGameTime] = useState(gameTimeProp)
  const [moveTime, setMoveTime] = useState(moveTimeProp)
  const [moveTimeSign, setMoveTimeSign] = useState("")
  const { fontScale } = useWindowDimensions()
  // Alert.alert(`${fontScale}`)
  const opacityAnimatationValue = useSharedValue(0)
  
  const getTimeInfo = ( duration: number ) => {
    var seconds = Math.floor(duration % 60), hours = Math.floor(duration / 3600), 
        minutes = Math.floor((duration - 3600 * hours)/60);
    return `${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`
  }
  const addMoveTextShiftY = useSharedValue(0)

  const gameTimeAnimatedValue = useSharedValue(gameTime)

  /* Old code
    const gameTimeProps = useAnimatedProps<
    AnimatedProps<{
      gameTimeText: number
    }>
  >(() => ({
    gameTimeText: withTiming(gameTimeAnimatedValue.value + 5),
  })) */

  const plusMoveAnimationStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(-addMoveTextShiftY.value * 20, {
          easing: Easing.sin,
        }),
      },
    ],
    opacity: opacityAnimatationValue.value,
  }))

  /**
   * @description Game time timeout cycle with {@link setInterval}
   */
  useEffect(() => {
    Alert.alert(`Fontscale: ${fontScale}`)
    const removeGameTimeCycle = setInterval(() => {
      // setGameTime((preGameTime) => {
      //   gameTimeAnimatedValue.value = gameTime
      //   return preGameTime + 1
      // })
      setGameTime((preGameTime) => preGameTime + 1)
      gameTimeAnimatedValue.value += 1
    }, 1000)
    return () => {
      clearInterval(removeGameTimeCycle)
    }
  }, [])

  useEffect(() => {
    if (moveTimeProp > moveTime) {
      setMoveTimeSign("+")
      setMoveTime(moveTimeProp)
    } else if (moveTimeProp < moveTime) {
      setMoveTimeSign("-")
      setMoveTime(moveTimeProp)
    }

    console.log({ opacityAnimatationValue: opacityAnimatationValue.value })

    addMoveTextShiftY.value = withSequence(
      withTiming(1, { duration: 100 }),
      withTiming(0, { duration: 1000 }),
    )
    opacityAnimatationValue.value = withSequence(
      withTiming(1, { duration: 100 }),
      withTiming(0, { duration: 1000 }),
    )
  }, [moveTimeProp])

  return (
    <View style={[divStyles.colDiv, style]}>
      {/* left box */}
      <View style={styles.leftBox}>
        <Text style={[styles.labelText, { fontSize: useScaledFontSize(25) }]}>
          Game Time
        </Text>
      
        <Text
          style={[
            styles.valueText, {
              fontSize: useScaledFontSize(35),
            },
          ]}
        >
          {getTimeInfo(gameTime)}
        </Text>
      </View>

      {/* right box */}
      <View style={styles.rightBox}>
        <Text style={[styles.labelText, { fontSize: useScaledFontSize(25) }]}>
          Move
        </Text>
        {/* <Animated.View
          style={[
            styles.moveTimeView,
            { justifyContent: "center", backgroundColor: "yellow" },
          ]}
        > */}
          <Text style={[styles.valueText, { fontSize: useScaledFontSize(35) }]}>
            {moveTime}
            <Animated.View style={plusMoveAnimationStyle}>
              <Animated.Text>{moveTimeSign}1</Animated.Text>
            </Animated.View>
          </Text>
        {/* </Animated.View> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  statusText: {
    textAlign: "center",
    textAlignVertical: "center",
  },
  gameTimeText: {
    fontWeight: "bold",
  },
  moveTimeText: {
    fontSize: getFontSize(20),
    fontWeight: "bold",
    textAlign: "center",
  },

  moveTimeView: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  addMoveText: {
    fontSize: getFontSize(20),
    fontWeight: "bold",
    // left: 0,
    // top: 0,
  },
  addMoveView: {
    textAlign: "center",
    position: "absolute",
    // top: 30 * scale,
    zIndex: 10,
  },
  /**
   * Below is template style for sharing
   */
  labelText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  valueText: {
    textAlign: "center",
  },

  leftBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rightBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
})

export default FootBox
