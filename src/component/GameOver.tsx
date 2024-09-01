import { Button, Modal, Text } from "react-native"
import { useCallback, useEffect } from "react"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated"

type GameOverProps = {
  isVisible: boolean
  setIsVisible: (newVisibleState: boolean) => unknown
  restartGame: () => boolean
}

/**
 * @description pop-up text when the game is over
 * @param {GameOverProps} props
 * @returns
 */
const GameOver = ({ isVisible, restartGame, setIsVisible }: GameOverProps) => {
  const popInAniProgress = useSharedValue(0)

  useEffect(() => {
    popInAniProgress.value = withRepeat(withTiming(1), 5)
  }, [])

  const popInStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(popInAniProgress.value * 20) }],
  }))

  const modalConfirmAction = useCallback(() => {
    console.log("Game action")
    restartGame()
    setIsVisible(false)
  }, [setIsVisible])

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <Animated.View
        style={[
          popInStyle,
          {
            display: "flex",
            alignSelf: "center",
            maxHeight: 200,
            backgroundColor: "yellow",
          },
        ]}
      >
        <Text style={{ textAlign: "center", margin: 50 }}>
          Game Over <Text>{isVisible}</Text>
        </Text>
        <Button title="Restart" onPress={modalConfirmAction} />
      </Animated.View>
    </Modal>
  )
}

export default GameOver
