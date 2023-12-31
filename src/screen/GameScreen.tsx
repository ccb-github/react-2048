import React, { useContext, useEffect, useRef, useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { Button } from "react-native-paper";
import { AppOwnership,  } from "expo-constants"
import FootBox from "../component/FootBox";
import HeaderBox from "../component/HeaderBox";
import Tile from "../component/Tile";
import { GameBoard } from "../context";
import styles from '../style/GameScreen.style'
import createResponder from "../utils/panRes";
import { saveData } from '../utils/storage'
import { gameBoardSize } from "../model/GameBox";
import ConfirmDialog from "../component/ConfirmDialog";
import GameBox from "../component/GameBox";



type GameStatus = {
  
}
/**
 * @description The direction of the game object, static for not moving
 */
type MoveDirection = "static" | "left" | "up" | "down" | "right"


//TODO migrate to reducer pattern  

export default function GameScreen(props:
  { route: { params?: {loadedGameData: number[][]} } }
){
  let counter = -1
  let context = useContext(GameBoard)
  const squareRef = useRef<React.Ref<typeof Tile>[][]>([  
    [null,null,null,null],
    [null,null,null,null],
    [null,null,null,null],
    [null,null,null,null]
  ]);
  const squareMatrix = useRef<number[][]>(context);
 
  
  const history = useRef<string[]>([])
  const point = useRef(0)
  // const moveTime = useRef(0)
  const gameTime = useRef(0) 
  const { width, scale} = useWindowDimensions()

  const {loadedGameData} = props.route.params || {};
  const [moveTime, setMoveTime] = useState(0) 
  const [moveDir, setMoveDir] = useState<MoveDirection>("static")

  const useMoveTile = (dirSign: number[], prevTileMatrix: number[][]) => {
    const size = gameBoardSize;
    let squareStack: number[][] = [[],[],[],[]] 
    // Array(gameBoardSize).fill([]);

    if (JSON.stringify(dirSign) === "[-1,0]") {
      // Swipe up branch
      setMoveDir("up")
      for (let ri = 0; ri < size; ri++) {
        for (let ci = 0; ci < size; ci++) {
          if (
            squareStack[ri].length &&
            prevTileMatrix[ci][ri] > 0 &&
            prevTileMatrix[ci][ri] === squareStack[ri].slice(-1)[0]
          )
            squareStack[ri][squareStack[ri].length - 1] =
              squareStack[ri][squareStack[ri].length - 1] * 2;
          else if (prevTileMatrix[ci][ri] > 0)
            squareStack[ri].push(prevTileMatrix[ci][ri]);
        }
      }
    } else if (JSON.stringify(dirSign) === "[1,0]") {
      // Swipe down branch
      setMoveDir("down")
      for (let ri = 0; ri < size; ri++) {
        for (let ci = 0; ci < size; ci++) {
          if (
            squareStack[ri].length &&
            prevTileMatrix[3 - ci][ri] > 0 &&
            prevTileMatrix[3 - ci][ri] === squareStack[ri].slice(-1)[0]
          )
            squareStack[ri][squareStack[ri].length - 1] =
              squareStack[ri][squareStack[ri].length - 1] * 2;
          else if (prevTileMatrix[3 - ci][ri] > 0)
            squareStack[ri].push(prevTileMatrix[3 - ci][ri]);
        }
      }
    } else if (JSON.stringify(dirSign) === "[0,-1]") {
      // Swipe left
      setMoveDir("left")
      for (let ri = 0; ri < size; ri++) {
        for (let ci = 0; ci < size; ci++) {
          if (
            squareStack[ri].length &&
            prevTileMatrix[ri][ci] > 0 &&
            prevTileMatrix[ri][ci] === squareStack[ri].slice(-1)[0]
          )
            squareStack[ri][squareStack[ri].length - 1] =
              squareStack[ri][squareStack[ri].length - 1] * 2;
          else if (prevTileMatrix[ri][ci] > 0)
            squareStack[ri].push(prevTileMatrix[ri][ci]);
        }
      }
    } else {
      // Swipe right
      setMoveDir("right")
      for (let ri = 0; ri < size; ri++) {
        for (let ci = 0; ci < size; ci++) {
          if (
            squareStack[ri].length &&
            prevTileMatrix[ri][3 - ci] > 0 &&
            prevTileMatrix[ri][3 - ci] === squareStack[ri].slice(-1)[0]
          )
            squareStack[ri][squareStack[ri].length - 1] =
              squareStack[ri][squareStack[ri].length - 1] * 2;
          else if (prevTileMatrix[ri][3 - ci] > 0)
            squareStack[ri].push(prevTileMatrix[ri][3 - ci]);
        }
      }
    }

    return squareStack;
  };
 
  useEffect(() => {
    /**Load the transferred data to screen component */
    if(Array.isArray(loadedGameData)) {
      console.log(`Loaded data ${JSON.stringify(loadedGameData)}`)
      squareMatrix.current = loadedGameData
    }
    else if(loadedGameData === undefined) {
      return 
    }
    else {
      throw Error(`Invalid loadedGameData ${JSON.stringify(loadedGameData)}`)
    } 
   
  }, [])
    
  const bfsGrid = (target: number[][]) => {
    for(let i = 0; i<target.length-1; i++){
      for(let j = 0; j< target[0].length-1; j++){
      if (target[i][j] && target[i + 1][j] &&
        target[i][j] == target[i + 1][j] ||
        target[i][j] && target[i][j + 1] &&
        target[i][j] == target[i][j + 1]) {
        return true
      } 
      }
    }
    return false 
  } 

  const addRandomTile = () => {
    const value = Math.random() < 0.9 ? 2 : 4;
    let ri = Math.floor(Math.random() * 4),
      ci = Math.floor(Math.random() * 4);
    while (squareMatrix.current[ri][ci] > 0) {
      ri = Math.floor(Math.random() * 4);
      ci = Math.floor(Math.random() * 4);
    }

    squareMatrix.current[ri][ci] = value
  }
  const restartGame = () => {
    
    // for (let row of squareMatrix.current) {
    //   for (let col of row) 
    //     col = -1;
    // }
    for (let i = 0; i < gameBoardSize; i++) {
      for (let j = 0; i < gameBoardSize; j++) {
        squareMatrix.current[i][j] = -1
      }
    }
   
    point.current = 0;
    console.log('restart func called')
    
    // TODO dealing with not moving at all
    setMoveTime(0)
  }

  const haveEmptySpace = () => {
    for (let row of squareMatrix.current) {
      for (let col of row) {
        if (col === -1) return true;
      }
    }
    return false;
  }

  const saveGame = () => {
    saveData(new Date().getTime().toString(), JSON.stringify(squareMatrix.current));
  }

  const moveAvailable = () => {
    if (haveEmptySpace()) return true;
    return bfsGrid(squareMatrix.current);
  }

  
  
  const undo = () => {
    if(history.current.length !== 0){
      squareMatrix.current = JSON.parse(history.current.pop()!) as number[][]; 
      setMoveTime(moveTime + 1)     
    }
  }
  

  const moveFrame = (dirSign: number[]) => {
    const theGameBoxSize = gameBoardSize;
    let squareStack = useMoveTile(dirSign, squareMatrix.current)
   
    //Rotate the matrix back
    //The logic is not right
    squareMatrix.current = [
      [-1, -1, -1, -1],
      [-1, -1, -1, -1],
      [-1, -1, -1, -1],
      [-1, -1, -1, -1],
    ];
    
    // Please notice the object
    squareStack.map((row, i) => {
      row.map((col, j) => {
        if (dirSign[0] != 0) {
          squareMatrix.current[dirSign[0] < 0 ? j : 3 - j][i] = col;
        } else {

          squareMatrix.current[i][dirSign[1] < 0 ? j : 3 - j] = col;
        }
      });
    });
    
   

    console.log("Square matrix", JSON.stringify(squareMatrix.current))
    setMoveTime(moveTime + 1);
    history.current.push(JSON.stringify(squareMatrix.current))
    if (haveEmptySpace()) {
      addRandomTile();
    }
    setMoveTime(moveTime + 1)
  }
  
  console.log("Rerendering")
    
  return (
    <View style={styles.gameBoard}>
      {/* <HeaderBox
        restartGame={restartGame}
        undo={undo}
        saveGame={saveGame}
  />*/}
      <View
        style={{
          width: width,
          height: width,
          borderColor: "#000",
          borderWidth: 2,
        }}
        {...createResponder(moveFrame).panHandlers}
      >
        {squareMatrix.current.map((row, i) =>
          row.map((col, j) => (
            <Tile
              key={i * 4 + j}
              style={styles.tileContainer}
              value={col}
              moveMent={moveDir}
              animation={{
                0: {
                  opacity: 0.6,
                  scale: 0.8,
                },
                1: {
                  opacity: 1,
                  scale: 1,
                },
              }}
              position={[j, i]}
            />
          ))
        )}
      </View>
      {/*
      <FootBox
        moveTime={moveTime}
        gameTime={gameTime.current}
        style={{
          width: "100%",
          flexGrow: 0,
          flexShrink: 1,
          flexBasis: "auto",
        }}
      /> */}
    </View>
  );
}
 



/**
 *   <View
                key={j}
                style={[
                  styles.gameBoxCell,
                  j == 0 ? styles.gameBoxCellFirst : null,
                  j == squareMatrix.current[0].length - 1
                    ? styles.gameBoxCellLast
                    : null,
                ]}
              >
 */