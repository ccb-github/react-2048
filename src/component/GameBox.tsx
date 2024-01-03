import { useEffect, useRef, useState, useContext } from 'react'
import {View, Text, useWindowDimensions} from 'react-native'
import uuid from 'react-uuid'
import { gameBoardSize } from '../model/GameBox'
import styles from '../style/GameBox.style'
import createResponder from '../utils/panRes'
import ConfirmDialog from './ConfirmDialog'
import { TileData } from '../types/component/Tile'
import Tile from './Tile'
import { GameStatus } from '../context'
import { saveData } from '../utils/storage'
import { Dimensions } from 'react-native'

//const {scale} = Dimensions.get("window")
// const GameCell = (props: { data: number, colIndex: number }) => {
//   return(
//     <View>
//       {props.data > 0? <Tile value={props.data}/> : null}
//     </View>
//   )
// }

// const GameRow = (props: { data: number[], rowIndex: number}) => {
//   return(
//     <View style={styles.gameBoxRow}>
//       {props.data.map(
//         (item, seq) => <GameCell data={item} colIndex={seq} key={uuid()}/>
//       )}
//     </View>
//   )
// }
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

const GameBox = (props: {tiles?: TileData[], addMoveTime: () => void}) => {
  
  const {addMoveTime} = props
  const squareMatrix = useRef<number[][]>([
    [2, 4, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]
  ])
  const [refreshTime, setRefreshTime] = useState(0)
  let moveHistory = useRef<string[]>([])
  let tileArray = props.tiles || ((gameBoardSize: number) => {
    let counter = -1;
    return Array(gameBoardSize * gameBoardSize).fill(0)
      .map((item) => {
        counter++;
        return {
          value: squareMatrix.current[counter % 4][Math.floor(counter >> 2)],
          position: [counter % 4, Math.floor(counter >> 2)],
        };
      });
  })(gameBoardSize);
  const {scale} = useWindowDimensions()
  // useEffect(() => {
  //   addRandomTile()
  //   addMoveTime()
  //   console.log(tileArray.map( item => item.value))
  // }, [tileArray])
  
  useEffect( () => {
    console.log(`GameBox scale`,scale)
  },[])

  const haveEmptySpace = () => {
    for (let row of squareMatrix.current) {
      for (let col of row) {
        if (col === 0) return true;
      }
    }
    return false;
  }

  const addRandomTile = () => {
    const value = Math.random() < 0.9 ? 2 : 4;
  
    
    let newTileIndex = Math.floor(Math.random() * 16)
    
    while (tileArray[newTileIndex].value > 0) {
      newTileIndex = Math.floor(Math.random() * 16)
    }
    tileArray[newTileIndex].value = value
    squareMatrix.current[Math.floor(newTileIndex / gameBoardSize)][newTileIndex % gameBoardSize] = value
  }
  
  const rotateSquare = (dirSign: number[], prevTileMatrix: number[][]) => {
    const size = gameBoardSize;
    let squareStack: number[][] = [[], [], [], []];

    if (JSON.stringify(dirSign) === "[-1,0]") {
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
    } else if (Object.is(dirSign, [0,-1])) {
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
    //Let's rotate the matrix
    return squareStack;
  };
  
  const moveFrame = (dirSign: number[]) => {
    const theGameBoxSize = gameBoardSize;
    
    let squareStack = rotateSquare(dirSign, squareMatrix.current)
   
    //Rotate the matrix back
    //The logic is not right
    squareMatrix.current.forEach(
      (row, i) => row.forEach(
        (item, j) => squareMatrix.current[i][j] = item
      )
    )
    console.log(`The reinit squareMatrix ${JSON.stringify(squareMatrix)}`)
    // Please rotate back
    squareStack.map((row, i) => {
      row.map((col, j) => {
        if (dirSign[0] != 0) {
          squareMatrix.current[dirSign[0] < 0 ? j : 3 - j][i] = col;
        } else {
          squareMatrix.current[i][dirSign[1] < 0 ? j : 3 - j] = col;
        }
      });
    });
    
    for (let i = 0; i < gameBoardSize; i++) {
      for (let j = 0; j < squareMatrix.current[0].length; j++) {
        tileArray[i * 4 + j].value = squareMatrix.current[i][j]
      }
    }
    
    moveHistory.current.push(JSON.stringify(squareMatrix.current))
    setRefreshTime( prevFreshTime => prevFreshTime + 1)
    if (haveEmptySpace()) {
      addRandomTile();
    }
  }
  
  return (
    <View style={styles.gameBoxContainer} {...createResponder(moveFrame).panHandlers}>
     
      {tileArray.map((item) => (
        <Tile
          key={`${item.position[0]}, ${item.position[1]}`}
          // style={styles.tileContainer}
          position={item.position}
          value={item.value}
          
        />
      ))}
    </View>
  );
}

export default GameBox


 



