import type { ParamListBase } from "@react-navigation/native"
import type { StackScreenProps } from "@react-navigation/stack"

export const MainStackRouteName = ["Main", "LoadGame", "Home", "Test"] as const

export const MainStackRouteNameEnum = {
  Main: "Main",
  LoadGame: "LoadGame",
  Home: "Home",
  Test: "Test",
} as const

export type MainStackParamList = {
  Home: undefined
  LoadGame?: undefined
  Main?: {
    loadedGameData: string
  }
  Test: undefined
} & ParamListBase &
  Record<(typeof MainStackRouteName)[number], unknown>

export type LoadGameScreenProps = StackScreenProps<
  MainStackParamList,
  "LoadGame"
>

export type HomeScreenProps = StackScreenProps<MainStackParamList, "Home">

export type GameScreenProps = StackScreenProps<MainStackParamList, "Main">
