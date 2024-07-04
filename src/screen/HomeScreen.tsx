import React from 'react'
import { Button } from 'react-native-paper'
import { View, StyleSheet } from 'react-native'
import { HomeScreenProps } from '../navigation'



const HomeScreen = ({ navigation }: HomeScreenProps) => {
    return (
      <View>
        <Button mode='outlined'
          onPress={ () => {navigation.navigate('Main')} }>
          Start new game
        </Button>
        <Button mode='outlined'
          onLongPress={()=>{}}
          onPress={ () => {navigation.navigate("LoadGame")} }>
          LOAD SAVED
        </Button>
        
      </View>
    )
  } 

  export default HomeScreen
  //export default Vara = <function definition> !not work
  

  //style={ {width:'100%',
  //height:'100%'}}