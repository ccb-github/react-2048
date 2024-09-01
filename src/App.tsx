import { Provider } from "react-native-paper"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import HomeScreen from "./screen/HomeScreen"
import GameScreen from "./screen/GameScreen"
import LoadGameScreen from "./screen/LoadGameScreen"
import { GameBoard as GameBoardContext } from "./context"
import {
  type MainStackParamList,
  MainStackRouteName,
} from "#/navigation"
import TestScreen from "./__temp__/TestScreen"

const Stack = createStackNavigator<MainStackParamList>()

const App = () => {
  return (
    <Provider>
      <GameBoardContext.Provider
        value={[
          [2, 4, -1, -1],
          [-1, -1, -1, -1],
          [-1, -1, -1, -1],
          [-1, -1, -1, -1],
        ]}
      >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={MainStackRouteName[2]}
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name={MainStackRouteName[0]} component={GameScreen} />
            <Stack.Screen
              name={MainStackRouteName[1]}
              component={LoadGameScreen}
            />
            <Stack.Screen name={MainStackRouteName[3]} component={TestScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GameBoardContext.Provider>
    </Provider>
  )
}

export default App
