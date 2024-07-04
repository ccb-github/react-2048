
import React from 'react';
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "./screen/HomeScreen";
import GameScreen from './screen/GameScreen';
import LoadGameScreen from './screen/LoadGameScreen'
import { GameBoard as GameBoardContext } from './context';
import { StackRouteName } from './model/navigation';
const Stack = createStackNavigator();



const App = () => {
  return (
    <Provider>
      <GameBoardContext.Provider
        value={[
          [-1, 1024, -1, 2],
          [-1, -1, -1, -1],
          [-1, -1, -1, -1],
          [-1, -1, -1, -1],
        ]}
      >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name={StackRouteName["home"]} component={HomeScreen} />
            <Stack.Screen name={StackRouteName["main"]} component={GameScreen} />
            <Stack.Screen name={StackRouteName["load"]} component={LoadGameScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </GameBoardContext.Provider>
    </Provider>
  );
} 

export default App




















 /*<Animatable.View  
                          style={styles.tileContainer}
                          ref={ref => this.squareRef[i][j] = ref}> </Animatable.View>*/