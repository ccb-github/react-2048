import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import { divStyles, textStyles } from '../src/style/common.style'

class HeaderBox extends React.Component{
  constructor(props: {} | Readonly<{}>){
    super(props)
  }
  
  render(){
 
    return (
      <View style={[divStyles.headerBox, divStyles.rowDiv]}>
      
        <View style={[divStyles.buttonBox, divStyles.colDiv]}>
          <Text style={{flex: 1, margin: 'auto'}}>2048</Text>
          <Button  
            style={{
              margin:3, 
              shadowOffset: {width:5,height:-5}, shadowOpacity: 0.2,
              shadowColor:'black'
            }}
            onPress={
              ()=>{this.props.callDialog('saveGame')
            }}  
            mode="contained" >
            Save Game 
          </Button>
        </View>
        <View style={[divStyles.colDiv]}>
          <Button 
            style={{margin:3, 
                    shadowOffset: {width:5,height:-5}, 
                    shadowOpacity: 0.2,
                    shadowColor:'black',
                    flex: 1
                  }}
            mode="contained" 
            onPress={()=>{this.props.callDialog('restartGame')}}>
            Undo
          </Button>
          <Button
            style={{
              margin: 3,
              shadowOffset: { width: 5, height: -5 },
              shadowOpacity: 0.2,
              shadowColor: 'black',
              flex: 1
            }}
            mode="contained"
            onPress={() => { }}
          >
            Restart Game
          </Button>
        </View>
      </View>
    )
  }
}

export default HeaderBox


/*
<Button title='Restart' onPress={()=>{}}/>
        <Button title='Save' onPress={()=>{}} />
class HeaderBox = ({
  let [point, setPoint] = useState(0)
 
  return (
    <View style={divStyles.headerBox}>
      <View style={divStyles.scoreBox}>
        <Text style={[divStyles.scoreLabel, divStyles.bold,{color:'black'}]}>Point</Text>
        <Text style={[divStyles.scoreContent, divStyles.bold,{color:'black'}]}>{point}</Text>
      </View>
      <View style={divStyles.gameButton}>
        <Button  onPress={props.saveGame}  mode="contained" >
          Save Game
        </Button>
        <Button   mode="contained" onPress={props.testFunc}>
          Restart Game 
        </Button>
      </View>
    </View>
  )
}
*/ 