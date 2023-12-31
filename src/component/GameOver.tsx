import {

    Button,
    Text,
}  from 'react-native';
  import React from 'react'
import * as Animatable from 'react-native-animatable'  
  
function saveGame(){
    
}



const GameOver=(props: {restartGame: () => boolean})=>{
    return(
      <Animatable.View animation='zoomIn'>
        <Text>Game Over</Text>
        <Button title='Restart' onPress={props.restartGame}/>
      </Animatable.View>
    )
  
}


  export default GameOver