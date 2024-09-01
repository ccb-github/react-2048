import { useEffect, useState } from "react"
import {
  View,
  Text,
  useWindowDimensions,
  type ViewStyle,
  StyleSheet,
  Pressable,
} from "react-native"
import { Button } from "react-native-paper"
import { divStyles } from "../style/common.style"
import ConfirmDialog from "./ConfirmDialog"
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import useScaledSize from "../utils/useScaledSize"

type HeaderBoxProps = {
  restartGame: () => void
  saveGame: () => unknown
  undo: () => void
  style?: ViewStyle
}

const dialogTitle = {
  restartGame: "Are you sure you want to restart the game",
  saveGame: "Save the game to local storage( with)",
  undo: "Undo",
}

const tempFunction = (size: number) => size

const HeaderBox = (props: HeaderBoxProps) => {
  const { restartGame, undo, saveGame, style } = props

  const [dialogState, setDialogState] = useState<
    null | "undo" | "restartGame" | "saveGame"
  >(null)

  const {
    scale: winDimScale,
    height: winDimHeight,
    width: winDImWidth,
    fontScale,
  } = useWindowDimensions()
  const randomWidth = useSharedValue(300)
  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  }
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    }
  })

  useEffect(() => {
    console.log({
      winDimScale,
      winDimHeight,
      winDImWidth,
      fontScale,
    })
  })

  const dialogActionWrapper = () => {
    switch (dialogState) {
      case "restartGame":
        return () => {
          console.log("Restart game dialogActionWrapper")
          restartGame()
          setDialogState(null)
        }
      case "undo":
        return () => {
          undo()
          setDialogState(null)
        }
      case "saveGame":
        return () => {
          saveGame()
          setDialogState(null)
        }
      default:
        throw new Error("You should pass right dialogState to the wrapper")
    }
  }

  return (
    <Animated.View style={[divStyles.rowDiv, style, animatedStyle]}>
      {dialogState !== null ? (
        <ConfirmDialog
          content={dialogTitle[dialogState]}
          dialogAction={dialogActionWrapper()}
        />
      ) : null}
      <View
        style={[
          divStyles.colDiv, {
            minHeight: useScaledSize(30),
          },
        ]}
      >
        <View
          style={{
            ...styles.buttonBox,
            padding: useScaledSize(2),
          }}
        >
          <Text
            style={[
              styles.gameTitleText,
              {
                padding: tempFunction(5),
                fontSize: tempFunction(20),
              },
            ]}
          >
            2048
          </Text>
        </View>
        {/* <View
          style={[
            styles.gameTitleText,
            {
              padding: tempFunction(5),
              backgroundColor: "blue",
              height: 30,
              // fontSize: tempFunction(20),
            },
          ]}
        >
        </View> */}
        <View
          style={{
            ...styles.buttonBox,
            padding: useScaledSize(2),
          }}
        >
          {/* TODO should we scale the small size */}
          <Button
            style={{
              ...styles.gameActionButton,
              height: "100%",
              width: "100%",
              minHeight: useScaledSize(20),
            }}
            onPress={() => {
              setDialogState("saveGame")
            }}
          >
            Save Game
          </Button>
        </View>
      </View>
      {/* Row two */}
      <View style={[divStyles.colDiv, { minHeight: tempFunction(40) }]}>
        <View style={styles.buttonBox}>
          <Button
            style={{
              ...styles.gameActionButton,
              minHeight: useScaledSize(20),
            }}
            onPress={() => {
              setDialogState("undo")
            }}
          >
            <Text
              style={{
                textShadowColor: "red",
                textShadowOffset: {
                  width: 10,
                  height: 10,
                },
              }}
            >
              Undo
            </Text>
          </Button>
        </View>
        <View style={styles.buttonBox}>
          <Button
            style={[
              styles.gameActionButton,
              {
                minHeight: useScaledSize(20),
              },
            ]}
            onPress={() => {
              setDialogState("restartGame")
            }}
          >
            Restart
          </Button>
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  gameTitleText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    // textAlignVertical: "center",
  },
  buttonBox: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    padding: tempFunction(5),
    justifyContent: "center",
  },
  gameActionButton: {
    backgroundColor: "#faffff",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#000",
    aspectRatio: 1.4,

    /* For text centering */
    flex: 1,
    flexGrow: 0,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default HeaderBox
