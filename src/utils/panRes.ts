import {
  PanResponder,
  type GestureResponderEvent,
  type PanResponderGestureState,
} from "react-native"
type ReleaseCallback = (dirSign: number[]) => void

/**
 * @description
 * Ues create gesture responder with call back function {@link releaseCallback} invoke
 * the function with argument like [-1, 0](**swipe up**) for singal swipe action
 * @param {(dirSign) => unknown} releaseCallback the callback function after the Release
 */
export default function createPanResponder(releaseCallback: ReleaseCallback) {
  const placeHolderFunction = () => true
  const panReleaseCallback = (
    evt: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    const { dx, dy } = gestureState
    console.log(dx, dy)
    if (dx * dx + dy * dy >= 500) {
      if (dx + dy > 0) {
        if (dx > dy) {
          releaseCallback([0, 1]) // Slide right
        } else {
          releaseCallback([1, 0]) // Slide down
        }
      } else {
        if (dy > dx) {
          releaseCallback([0, -1])
        } else {
          releaseCallback([-1, 0])
        }
      }
    }
  }
  return PanResponder.create({
    onStartShouldSetPanResponder: placeHolderFunction,
    onStartShouldSetPanResponderCapture: placeHolderFunction,
    onMoveShouldSetPanResponder: placeHolderFunction,
    onMoveShouldSetPanResponderCapture: placeHolderFunction,
    onPanResponderGrant: () => {},
    onPanResponderMove: () => {},
    onPanResponderTerminationRequest: placeHolderFunction,
    onPanResponderRelease: panReleaseCallback,
    onPanResponderTerminate: () => {},
    onShouldBlockNativeResponder: placeHolderFunction,
  })
}
