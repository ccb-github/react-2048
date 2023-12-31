import React from 'react'
import { Button } from 'react-native-paper'
import { View, StyleSheet } from 'react-native'



const HomeScreen = ({ navigation }) => {
    return (
      <View>
      
        <Button mode='outlined'
          onPress={ () => {navigation.navigate('main')} }>
          START NEW GAME 
        </Button>
        <Button mode='outlined'
          onLongPress={()=>{}}
          onPress={ () => {navigation.navigate('loadGame')} }>
          LOAD SAVED
        </Button>
        
      </View>
    )
  } 

  export default HomeScreen
  //export default Vara = <function definition> !not work
  

  //style={ {width:'100%',
  //height:'100%'}}