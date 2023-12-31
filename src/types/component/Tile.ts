import type { ViewStyle } from "react-native";
export type TileData = {
  position: number[],
  value: number
}
export type TileProps = {
  value: number;
  style?: ViewStyle;
  position: number[];
  animation?:
    {
      [key: number]: {
        opacity: number;
        scale: number;
      };
    }
    | string;
  moveMent: "static" | "left" | "right" | "up" | "down"
};
export type TileState = {
  value: number;
  animation: {
    [key: number]: {
      opacity: number;
      scale: number;
    };
  } | string
}