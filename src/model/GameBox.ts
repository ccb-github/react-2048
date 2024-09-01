import type { dirSignList } from "#/component/gameBox"

export const gameBoardSize = 4

/* Game logic section */
export function moveTile(
  dirSign: (typeof dirSignList)[number],
  prevTileMatrix: number[][],
) {
  // eslint-disable-next-line one-var
  const rowSize = prevTileMatrix.length,
    colSize = rowSize
  console.log({ rowSize, colSize })
  const squareStack: number[][] = [[], [], [], []]
  const tileActionMatrix: string[][] = [[], [], [], []]

  /* If the first number is not equal to zero that means we are swiping vertically, so when we loop through the tileMatrix we 
  cannot use index in nature order( We need to iterate through the tile matrix vertically ) */
  const stackRowSize = dirSign[0] !== 0 ? rowSize : colSize
  const stackColSize = dirSign[0] !== 0 ? colSize : rowSize

  const indexTransverse = (
    indexTuple: readonly number[],
    dir: number[],
    colSizeLimit = stackColSize,
  ) => {
    const dirAbs = dir[0] + dir[1]
    if (dirAbs === 1) {
      indexTuple[1] = colSizeLimit - 1 - indexTuple[1]
    }
    return dirSign[0] !== 0 ? [indexTuple[1], indexTuple[0]] : indexTuple
  }

  for (let ri = 0; ri < stackRowSize; ri++) {
    squareStack[ri].push(-2) // A prefix to escape the size check
    for (let ci = 0; ci < stackColSize; ci++) {
      const [tileValueYIndex, tileValueXIndex] = indexTransverse(
        [ri, ci],
        dirSign,
        stackColSize,
      )
      if (
        prevTileMatrix[tileValueYIndex][tileValueXIndex] ===
        squareStack[ri].at(-1)
      ) {
        // The array is not empty by programmatic design
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        squareStack[ri].push(squareStack[ri].pop()! * 2)
        tileActionMatrix[tileValueYIndex][tileValueXIndex] = "newMerge"
      } else if (prevTileMatrix[tileValueYIndex][tileValueXIndex] > 0) {
        squareStack[ri].push(prevTileMatrix[tileValueYIndex][tileValueXIndex])
        tileActionMatrix[tileValueYIndex][tileValueXIndex] = "moveUp"
      }
    }
    squareStack[ri].shift()
  }

  // if (JSON.stringify(dirSign) === "[-1,0]") {
  //   // *Swipe up* branch
  //   for (let ri = 0; ri < stackRowSize; ri++) {
  //     for (let ci = 0; ci < stackColSize; ci++) {
  //       if (
  //         squareStack[ri].length > 0 &&
  //         prevTileMatrix[ci][ri] === squareStack[ri].at(-1)
  //       ) {
  //         squareStack[ri][colSize - 1] =
  //           squareStack[ri][squareStack[ri].length - 1] * 2
  //         tileActionMatrix[ri][squareStack[ri].length - 1] = "newMerge"
  //       } else if (prevTileMatrix[ci][ri] > 0) {
  //         squareStack[ri].push(prevTileMatrix[ci][ri])
  //         tileActionMatrix[ri][squareStack[ri].length - 1] = "moveUp"
  //       }
  //     }
  //   }
  // } else if (JSON.stringify(dirSign) === "[1,0]") {
  //   // *Swipe down* branch
  //   for (let ri = 0; ri < stackRowSize; ri++) {
  //     for (let ci = 0; ci < stackColSize; ci++) {
  //       if (
  //         squareStack[ri].length > 0 &&
  //         prevTileMatrix[3 - ci][ri] > 0 &&
  //         prevTileMatrix[3 - ci][ri] === squareStack[ri].slice(-1)[0]
  //       )
  //         squareStack[ri][squareStack[ri].length - 1] =
  //           squareStack[ri][squareStack[ri].length - 1] * 2
  //       else if (prevTileMatrix[3 - ci][ri] > 0)
  //         squareStack[ri].push(prevTileMatrix[3 - ci][ri])
  //     }
  //   }
  // } else if (JSON.stringify(dirSign) === "[0,-1]") {
  //   // User swipe left
  //   for (let ri = 0; ri < stackRowSize; ri++) {
  //     for (let ci = 0; ci < stackColSize; ci++) {
  //       if (
  //         squareStack[ri].length > 0 &&
  //         prevTileMatrix[ri][ci] > 0 &&
  //         prevTileMatrix[ri][ci] === squareStack[ri].slice(-1)[0]
  //       )
  //         squareStack[ri][squareStack[ri].length - 1] =
  //           squareStack[ri][squareStack[ri].length - 1] * 2
  //       else if (prevTileMatrix[ri][ci] > 0)
  //         squareStack[ri].push(prevTileMatrix[ri][ci])
  //     }
  //   }
  // } else {
  //   for (let ri = 0; ri < stackRowSize; ri++) {
  //     for (let ci = 0; ci < stackColSize; ci++) {
  //       if (
  //         squareStack[ri].length > 0 &&
  //         prevTileMatrix[ri][3 - ci] > 0 &&
  //         prevTileMatrix[ri][3 - ci] === squareStack[ri].slice(-1)[0]
  //       )
  //         squareStack[ri][squareStack[ri].length - 1] =
  //           squareStack[ri][squareStack[ri].length - 1] * 2
  //       else if (prevTileMatrix[ri][3 - ci] > 0)
  //         squareStack[ri].push(prevTileMatrix[ri][3 - ci])
  //     }
  //   }
  // }

  // TODO a check may need to removed
  // for (let ri = 0; ri < stackRowSize; ri++) {
  //   for (let ci = 0; ci < stackColSize; ci++) {
  //     if()
  //   }
  // }
  console.log(squareStack)
  return squareStack
}
