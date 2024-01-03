import { ParamListBase } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"

export const MainStackRouteName = ["Main", "LoadGame", "Home"] as const
export type MainStackParamList = {
  Home: undefined
  LoadGame?: undefined
  Main?: number[][] 
} & ParamListBase & Record<typeof MainStackRouteName[number], unknown>
export type LoadGameScreenProps =
  StackScreenProps<MainStackParamList, "LoadGame">
export type HomeScreenProps = 
  StackScreenProps<MainStackParamList, "Home">
export type GameScreenProps = 
  StackScreenProps<MainStackParamList, "Main">