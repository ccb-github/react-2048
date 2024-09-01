import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import {
  View,
  useWindowDimensions,
  Alert,
  ActivityIndicator,
  type ViewStyle,
  type TextStyle,
} from "react-native"
import HeaderBox from "../component/HeaderBox"
import Tile from "../component/Tile"
import { GameBoard } from "../context"
import styles from "../style/GameScreen.style"
import createPanResponder from "../utils/panRes"
import { saveData } from "../utils/storage"
import GameOver from "../component/GameOver"
import useScaledSize from "../utils/useScaledSize"
import FootBox from "../component/FootBox"
import { SafeAreaView } from "react-native-safe-area-context"
import { GameScreenProps } from "#/navigation"
import { gameBoardSize, moveTile } from "../model/GameBox"
import { dirSignList } from "#/component/gameBox"


/**
 * @description The direction of the game object, static for not moving
 */
type MoveDirection = "static" | "left" | "up" | "down" | "right"

type MotionSign = [0, 0] | [-1, 0] | [1, 0] | [0, -1] | [0, 1]

type SquareAction =
  | "moveLeft"
  | "moveRight"
  | "moveUp"
  | "moveDown"
  | "newMerge"

// TODO migrate to reducer pattern

// class StoredGameData {
//   gameTime: number
//   moveTime: number

//   constructor(gameTime, moveTime, squareMatrix)

// }

const GameScreen = (props: GameScreenProps) => {
  const context = useContext(GameBoard)
  const squareRef = useRef<Array<Array<SquareAction | null>>>([
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ])
  /**
   * @ 2D Matrix for the tile number
   */
  const tileValueMatrix = useRef<number[][]>(context)

  const SQUAREMATRIX = useRef<number[]>(
    Array<number>(gameBoardSize * gameBoardSize).fill(-1),
  )
  const [gameSound, setGameSound] = useState()

  const history = useRef<string[]>([])
  const point = useRef(0)
  const gameTime = useRef(0)
  const {
    width: screenWidth,
    height: screenHeight,
    scale,
  } = useWindowDimensions()

  const [orientation, setOrientation] = useState("portrait")
  const [gameOverVisible, setGameOverVisible] = useState(false)
  const [moveTime, setMoveTime] = useState(0)
  const [moveDir, setMoveDir] = useState<MoveDirection>("static")
  const [motionSign] = useState<MotionSign>([0, 0])
  const [gameDataLoading, setGameDataLoading] = useState(false)

  const MARGIN_WIDTH = 3
  const GAMEBOX_WIDTH =
    orientation === "portrait"
      ? screenWidth - useScaledSize(10)
      : screenHeight - useScaledSize(10)

  const GAMEBOX_BORDER_WIDTH = 2


  const TILE_WIDTH =
    (GAMEBOX_WIDTH - 8 * MARGIN_WIDTH * scale - GAMEBOX_BORDER_WIDTH * scale * 2) >> 2
  

  const orientationStyle = useMemo<
    Record<"gameBoard" | "gameBox" | "footBox", ViewStyle | TextStyle>
  >(
    () => ({
      gameBoard: {
        flexDirection: orientation === "portrait" ? "column" : "row",
        height: screenHeight - 80,
      },
      gameBox: {
        width: GAMEBOX_WIDTH,
        aspectRatio: 1,
      },
      footBox: {
        minHeight: scale * 60,
      },
    }),
    [orientation],
  )

  const GameBox = () => (
    <View
      style={[{
          /** Border style */
          borderColor: "#000",
          borderWidth: useScaledSize(2),
          borderRadius: useScaledSize(5),
          /** ************ */
        },
        orientationStyle.gameBox,
      ]}
      {...createPanResponder(_handleSwipe).panHandlers}
    >
      {gameDataLoading ? <ActivityIndicator size={"large"} /> : null}
      {tileValueMatrix.current.map((row, i) =>
        row.map((col, j) =>
          col > 0 ? (
            <Tile
              key={i * 4 + j}
              tileWidth={TILE_WIDTH}
              style={{
                width: TILE_WIDTH,
              }}
              value={col}
              moveMent={moveDir}
              motionSign={motionSign}
              tileOpacity={"newAppear"}
              position={[j, i]}
            />
          ) : null
        )
      )}
    </View>
  )

  useEffect(() => {
    if (screenWidth > screenHeight) {
      setOrientation("landscape")
    } else {
      setOrientation("portrait")
    }
  }, [screenWidth, screenHeight])

  useEffect(() => {
    Alert.alert("loadGameData useEffect")

    if (props.route.params?.loadedGameData !== undefined) {
      setGameDataLoading(true)
      const parsedRouteData = JSON.parse(props.route.params?.loadedGameData)

      tileValueMatrix.current = parsedRouteData.squareMatrix
      gameTime.current = parsedRouteData.gameTime
      history.current = parsedRouteData.history

      setGameDataLoading(false)
    }
    //   throw Error(`Invalid loadedGameData ${props.route.params.loadedGameData}`)
  }, [props.route.params])

  /**
   * @param target the array should be equal size in both dimension
   * @returns
   */
  function bfsGrid(target: number[][]) {
    const targetMainLength = target.length
    if (targetMainLength !== gameBoardSize) {
      throw new Error("Given incorrect sized array in main axis")
    }
    for (let i = 0; i < targetMainLength; i++) {
      if (target[i].length !== targetMainLength)
        throw new Error(`Checked 2D array has incorrect size in index ${i}`)
    }

    for (let i = 0; i < gameBoardSize; i++) {
      for (let j = 0; j <= target[0].length - 1; j++) {
        if (target[i][j] === target[i][j + 1]) {
          return true
        }
        if (target[j][i] === target[j + 1][i]) {
          return true
        }
      }
    }
    return false
  }

  const addRandomTile = () => {
    const value = Math.random() < 0.9 ? 2 : 4
    // eslint-disable-next-line one-var
    let ri = Math.floor(Math.random() * 4),
      ci = Math.floor(Math.random() * 4)
    while (tileValueMatrix.current[ri][ci] > 0) {
      ri = Math.floor(Math.random() * 4)
      ci = Math.floor(Math.random() * 4)
    }
    // Assign the new tile
    tileValueMatrix.current[ri][ci] = value
  }
  const restartGame = useCallback(() => {
    Alert.alert("Restart game function")

    tileValueMatrix.current = context
    point.current = 0

    // TODO dealing with not moving at all
    setMoveTime(0)
    return true
  }, [setMoveTime])

  /**
   * @description Return boolean value determine if the gameBox has space left
   * @returns
   */
  const haveEmptySpace = () => {
    for (const row of tileValueMatrix.current) {
      for (const col of row) {
        if (col === -1) return true
      }
    }
    return false
  }

  const saveGame = () => {
    saveData(
      new Date().getTime().toString(),
      JSON.stringify({
        squareMatrix: tileValueMatrix.current,
        gameTime: gameTime.current,
        history: history.current,
      }),
    ).catch((error) => {
      console.error(error)
    })
  }

  const undo = () => {
    const lastHistory = history.current.pop()
    if (lastHistory !== undefined) {
      tileValueMatrix.current = JSON.parse(lastHistory) as number[][]
      setMoveTime(moveTime - 1)
    }
  }

  const _handleSwipe = (dirSign: (typeof dirSignList)[number]) => {
    const squareStack = moveTile(dirSign, tileValueMatrix.current)

    tileValueMatrix.current = [
      [-1, -1, -1, -1],
      [-1, -1, -1, -1],
      [-1, -1, -1, -1],
      [-1, -1, -1, -1],
    ]

    squareStack.forEach((row, i) => {
      row.forEach((col, j) => {
        if (dirSign[0] !== 0) {
          tileValueMatrix.current[dirSign[0] < 0 ? j : 3 - j][i] = col
        } else {
          tileValueMatrix.current[i][dirSign[1] < 0 ? j : 3 - j] = col
        }
      })
    })

    setMoveTime(moveTime + 1)
    history.current.push(JSON.stringify(tileValueMatrix.current))

    if (haveEmptySpace()) {
      addRandomTile()
    } else if (!bfsGrid(tileValueMatrix.current)) {
      // The game is over
      setGameOverVisible(true)
    }
  }

  return (
    <SafeAreaView
      style={[
        styles.gameBoard,
        {
          width: screenWidth,
        },
        orientationStyle.gameBoard,
      ]}
    >
      <GameOver
        isVisible={gameOverVisible}
        restartGame={restartGame}
        setIsVisible={setGameOverVisible}
      />

      <HeaderBox
        restartGame={restartGame}
        undo={undo}
        saveGame={saveGame}
        style={{
          flexShrink: 1,
          width: "100%",
          flexGrow: 1,
          minHeight: useScaledSize(60),
        }}
      />
      <GameBox />
      <FootBox
        moveTime={moveTime}
        gameTime={gameTime.current}
        style={{ ...styles.footBox, ...orientationStyle.footBox }}
      />
    </SafeAreaView>
  )
}

/**
 * @deprecated
 * @description Old code 
 * 
 * 
 *  <View
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

export default GameScreen