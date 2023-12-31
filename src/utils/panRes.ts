import { PanResponder } from 'react-native'
type ReleaseCallback = (dirSign: number[]) => void

export default function createResponder(releaseCallback: ReleaseCallback){

  return(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    
    onPanResponderGrant: () => {},
    onPanResponderMove: () => {},
    onPanResponderTerminationRequest: () => true,
    onPanResponderRelease: (evt, gestureState) => {
      const {dx, dy} = gestureState
      console.log(dx, dy)
      if ((dx * dx + dy * dy) >= 500) {
        if (dx + dy > 0) {
          if ( dx > dy)
            releaseCallback([0, 1])//Slide right
          else
            releaseCallback([1, 0])//Slide down
        }
        else {
          if (Math.abs(dx) > Math.abs(dy))
            releaseCallback([0, -1])
          else
            releaseCallback([-1, 0])
        }
      }
    },
    onPanResponderTerminate: () => {},
    onShouldBlockNativeResponder: () => true
    
  }))
}

