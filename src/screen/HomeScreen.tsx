import { Button } from "react-native-paper"
import type { HomeScreenProps } from "#/navigation"
import useScaledSize from "../utils/useScaledSize"
import { SafeAreaView } from "react-native-safe-area-context"

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <SafeAreaView>
      <Button
        mode="outlined"
        style={{ margin: useScaledSize(5) }}
        onPress={() => {
          navigation.navigate("Main")
        }}
      >
        Start new game
      </Button>
      <Button
        mode="outlined"
        style={{ margin: useScaledSize(5) }}
        onLongPress={() => {}}
        onPress={() => {
          navigation.navigate("LoadGame")
        }}
      >
        Load Saved
      </Button>
      <Button
        mode="outlined"
        style={{ margin: useScaledSize(5) }}
        onLongPress={() => {}}
        onPress={() => {
          navigation.navigate("Test")
        }}
      >
        Test
      </Button>
    </SafeAreaView>
  )
}

export default HomeScreen
