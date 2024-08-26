import { type StackScreenProps } from "@react-navigation/stack"
import { type MainStackParamList } from "../../types/navigation"
import { type FC } from "react"

import { CircularProgress } from "./SvgAnimation"
import { SafeAreaView } from "react-native"

type TestScreenProps = StackScreenProps<MainStackParamList, "Test">

const TestScreen: FC<TestScreenProps> = () => {
  return (
    <SafeAreaView style={{ padding: 40 }}>
      <CircularProgress />
    </SafeAreaView>
  )
}

export default TestScreen
