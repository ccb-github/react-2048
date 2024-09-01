import type { ViewStyle } from "react-native"
export type TileData = {
  position: number[]
  value: number
}
export type TileProps = {
  value: number
  tileWidth: number
  style?: ViewStyle
  position: number[]
  motionSign: [-1, 0] | [1, 0] | [0, -1] | [0, 1] | [0, 0]
  moveMent: "static" | "left" | "right" | "up" | "down"
  tileOpacity: "vanish" | "newAppear" | "normal"
}
export type TileState = {
  value: number
  animation:
    | Record<
        number,
        {
          opacity: number
          scale: number
        }
      >
    | string
}
