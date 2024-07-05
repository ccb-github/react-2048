import { TextStyle, ViewStyle } from "react-native"
import Dimensions from '../utils/dimension'
const { scale, getFontSize} = Dimensions

const styles:{
  [key: string]: ViewStyle | TextStyle
} = {
  
  squareFrame: {
    overflow: "hidden",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: 'black',
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    borderRadius: 2,
    backgroundColor: 'rgba(238, 228, 218, 0.35)'
  },
  tileTextBase: {
    fontWeight: "700",
    maxWidth: "100%",
    textAlign: "center",
  },
  
  innerTile2: {
    fontSize: getFontSize(48),
    backgroundColor: '#eee4da'
  },
  innerTile4: {
    fontSize: 48,
    backgroundColor: '#ede0c8'
  },
  innerTile8: {
    fontSize: 48,
    color: '#f9f6f2',
    backgroundColor: '#f2b179'
  },
  innerTile16: {
    fontSize: 48,
    color: '#f9f6f2',
    backgroundColor: '#f59563'
  },
  innerTile32: {
    fontSize: 48,
    color: '#f9f6f2',
    backgroundColor: '#f67c5f'
  },
  innerTile64: {
    fontSize: 48,
    color: '#f9f6f2',
    backgroundColor: '#f65e3b'
  },
  innerTile128: {
    fontSize: 48,
    color: '#f9f6f2',
    backgroundColor: '#edcf72'
  },
  innerTile256: {
    fontSize: 48,
    color: '#f9f6f2',
    backgroundColor: '#edcc61'
  },
  innerTile512: {
    fontSize: 48,
    color: '#f9f6f2',
    backgroundColor: '#edc850'
  },
  innerTile1024: {
    fontSize: 24 * scale,
    color: '#f9f6f2',
    backgroundColor: '#edc53f'
  },
  innerTile2048: {
    fontSize: 24 * scale,
    color: '#f9f6f2',
    backgroundColor: '#edc22e'
  },
  
}

export function innerTileStyle(num: number): TextStyle{
  return styles[`innerTile${num}`]
}


export default styles
