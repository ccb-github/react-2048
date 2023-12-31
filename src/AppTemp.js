import { registerRootComponent, Camera } from 'expo'; 
import React, { useEffect, useRef, useState } from 'react';
import {
  View, PanResponder, 
  Animated, Button,
  ActivityIndicator,
  FlatList
} from 'react-native';

import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Square from './types/component/gridCell'
import { HeaderBox } from './component/HeaderBox'

import styles from './types/style/App.style'

import uuid from 'react-uuid'
 






const Stack = createStackNavigator();

const dirMap = {
  left: [0, -1],
  right: [0, 1],
  up:   [-1, 0],
  down: [1,0]
}


const moveAnimation =  (direction)=> {
  if(typeof direction !== 'string')
    throw new Error('The direction must be a string!')
  dirSign = dirMap(direction)
  return {
    
      0: {
        opacity: 1,
        scale: 1,
      },
      
      1: {
        opacity: 0.5,
        scale: 0,
      }
    
  }
}







class GameBoard extends React.Component{

  state = {
    history: [],
    point: 0,
  }

  squareMatrix = [
    [2   , 2   , null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
  ]
    
   squareRef = [
     [null, null, null, null],
     [null, null, null, null],
     [null, null, null, null],
     [null, null, null, null]
   ]

   testRef = React.createRef()
     
   panResponder= PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: () => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}

      },
      onPanResponderTerminationRequest: () =>
        true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while  view is the
        // responder.  typically means a gesture has succeeded
        console.log(this.squareRef)
        let { dx, dy } = gestureState
        if ((dx * dx + dy * dy) >= 500) {
          if (dx + dy > 0) {
            if ( dx > dy)
              this.moveFrame([0, 1])//Slide right
            else
              this.moveFrame([1, 0])//Slide down
          }
          else {
            if (Math.abs(dx) > Math.abs(dy))
              this.moveFrame([0, -1])
            else
              this.moveFrame([-1, 0])
          }
        }
        console.log('Gesture succeed', dx, dy)
      },
      onPanResponderTerminate: () => {
        // Another component has become the responder, so  gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: () => {
        // Returns whether  component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
   })
  

  
 
  /*
  mergeAnimation() {
      
  }

  
  addRandomTile() {
    
     if (cellsAvailable) {
      var value = Math.random() < 0.9 ? 2 : 4;
      this.setState( (state)=>{
        let x
        this.squareMatrix=
        [[2,null,null,null],[null,null,null,null],
         [null,null,null,null],[null,null,null,null]]
        }
      

      
     
    
    } 
  directionMap (){
    
    return {
       
    }
  }

  reStart(){

  }
  
  moveTile(){
    
  }*/

  moveFrame(dirSign) {
    
    console.log(dirSign)
    
    if( dirSign===[-1,0] || dirSign === [0,-1]){
      for (let ri = 0; ri < this.squareMatrix.length + dirSign[0]; ri++) {
        for (let ci = 0; ci < this.squareMatrix.length + dirSign[1]; ci++) {
          if (this.squareMatrix[ri - dirSign[0]][ci - dirSign[1]] && this.squareMatrix[ri][ci] &&
              this.squareMatrix[ri][ci]===this.squareMatrix[ri - dirSign[0]][ci - dirSign[1]]  
          ){
            this.squareMatrix[ri][ci] = this.squareMatrix[ri][ci]*2 
            this.squareRef[ri][ci].setState({value:this.squareMatrix[ri][ci]})
            this.squareRef[ri - dirSign[0]][ci - dirSign[1]]
            console.log(this.squareMatrix)
            //this.squareRef[ri - dirSign[0]][ci - dirSign[1]][`fadeOut${dirSign[0]?'Up':'left'}`]
          }
        }
      }
    }
    else{
      for (let ri = this.squareMatrix.length - 1; 
               ri >=dirSign[0]; ri--) {
        for (let ci = this.squareMatrix.length - 1; 
                 ci >=dirSign[1]; ci--) {
          if (
              this.squareMatrix[ri - dirSign[0]][ci - dirSign[1]] && this.squareMatrix[ri][ci] &&
              this.squareMatrix[ri][ci]===this.squareMatrix[ri - dirSign[0]][ci - dirSign[1]]) {
            this.squareMatrix[ri][ci] = this.squareMatrix[ri][ci]*2 
            this.squareRef[ri][ci].setState({value:this.squareMatrix[ri][ci]})
            console.log(this.squareMatrix)
            //this.squareRef[ri + dirSign[0]][ci + dirSign[1]][`fadeOut${dirSign[0]?'Down':'Right'}`]
          }
        }
      }
    }; 
  
  }
    
  
        

  
  
  moveAvailable(){
    //First check the empty cell
    for(let row of this.squareMatrix){
      for(let col of row){
        if(col===null)
          return true
      }
    }
     

    
    
    
    return false
  }
  

  //What is the className stand for
  render() {
    console.log(this)
    const MainScreen = () => {
      return (
        <Animated.View 
          style={styles.gameBoard}
          {...this.panResponder.panHandlers}>
       
          <HeaderBox/>
         
          <View style={styles.gameBox}>
          {
            this.squareMatrix.map(
              (row, i) => (
                <View 
                  style={styles.gameBoxRow} 
                  key={uuid()}>
                  {
                    row.map((col, j) =>(
                      <View 
                        key={uuid()}
                        style={styles.gameBoxCell}>
                      {  
                        col!== null &&  
                       
                          <Square value={col.toString()} 
                            className='just-random'
                            attribute = 'newGenerate'
                            style = {styles.tileContainer}
                            ref={ref => this.squareRef[i][j] = ref}
                            key={uuid()}
                          />
                       
                      }
                      </View>
                    )
                    )
                  }
                </View>
              )
            )
          }
          </View>
           
        </Animated.View>
      )
    }

    const StartScreen = ({ navigation }) => {
      console.log(navigation)
      return (
        <View>
          <Button title='Start Game'
            onPress={ () => {navigation.navigate('main')} }
          />
          <Button title='Test Screen'
            onPress={ () => {navigation.navigate('second')} }
          />
        </View>
      )
    } 
    
    const SecondScreen = ( {navigation})=>{
      const [isLoading, setLoading] = useState(false)
      const [data, setData] = useState(
     
        [
          { "id": "1", "title": "Star Wars", "releaseYear": "1977" },
          { "id": "2", "title": "Back to the Future", "releaseYear": "1985" },
          { "id": "3", "title": "The Matrix", "releaseYear": "1999" },
          { "id": "4", "title": "Inception", "releaseYear": "2010" },
          { "id": "5", "title": "Interstellar", "releaseYear": "2014" }
        ]
      )
    
      console.log(data)
      return (
        <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? 
        <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <Button title={item.title} onPress={()=>{}}></Button>
            )}
          />
        )}
      </View>

      )

    }
     
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='home' component={StartScreen} />
          <Stack.Screen name='main' component={MainScreen} />
          <Stack.Screen name='second' component={SecondScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
} 

















// export default GameBoard
registerRootComponent(GameBoard)





 /*<Animatable.View  
                          style={styles.tileContainer}
                          ref={ref => this.squareRef[i][j] = ref}> </Animatable.View>*/